import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './dbConfig.js';
import mysql from 'mysql2/promise';
import { DB_USERNAME, DB_PASSWORD } from './Consts.js';
import VirtualShelf from './Entitati/VirtualShelf.js';
import Book from './Entitati/Book.js';
import LikeOp from './Operators.js';



let app = express();
let router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);


let conn;
mysql.createConnection({
    user: DB_USERNAME,
    password: DB_PASSWORD
})
.then((connection)=>{
    conn = connection
    return connection.query('CREATE DATABASE IF NOT EXISTS VirtualShelf')
})
.then(()=>{
    return conn.end();
})
.catch((err)=>{
    console.warn(err.stack);
})


// VirtualShelf are mai mulți Book ------ Relatia 1:many

VirtualShelf.hasMany(Book, {as : "Books", foreignKey: "VirtualShelfId"});
Book.belongsTo(VirtualShelf, { foreignKey: "VirtualShelfId"})

db.sync();

//-------------------------- Functii logice --------------------------\\


async function createVirtualShelf(virtualshelf) {
    return await VirtualShelf.create(virtualshelf, {include: [{model: Book, as: "Books"}]});
}

async function createBook(book){
    return await Book.create(book);
}


async function getVirtualShelf() {
    return await VirtualShelf.findAll({include: ["Books"]});
}

async function getBook(){
    return await Book.findAll();
}


async function getBookbyPK(id){
    return await Book.findByPk(id);
}

async function getVirtualShelfbyId(id) {
    return await VirtualShelf.findByPk(id, {include: ["Books"]});
}

async function getVirtualShelfbyDescription(description) {
    return await VirtualShelf.findAll({
       where: description ? {VirtualShelfDescription: description} : undefined
    });
    
}


async function updateVirtualShelf(id, virtualshelf){
    if(parseInt(id) !== virtualshelf.VirtualShelfId){
        console.log("Entity id different")
        return;
    }

    let updateEntity = await getVirtualShelfbyId(id);

    if(!updateEntity){
        console.log("There isn't a virtual shelf with this id");
        return;
    }

    return updateEntity.update(virtualshelf);

}

async function updateBook(id, book){
    if(parseInt(id) !== book.BookId){
        console.log("Entity id different")
        return;
    }

    let updateEntity = await getBookbyPK(id);

    if(!updateEntity){
        console.log("There isn't a book with this id");
        return;
    }

    return updateEntity.update(book);

}

async function deleteVirtualShelf(id){

    let deleteEntity = await getVirtualShelfbyId(id);

    if(!deleteEntity){
        console.log("There isn't a virtual shelf with this id");
        return;
    }

    return await deleteEntity.destroy();

}

async function deleteBook(id){

    let deleteEntity = await getBookbyPK(id);

    if(!deleteEntity){
        console.log("There isn't a book with this id");
        return;
    }

    return await deleteEntity.destroy();

}



async function filterVirtualShelf(filter) {
    let whereClause = {};

    if(filter.virtualshelfDate)
        whereClause.VirtualShelfDate = {[LikeOp] : `%${filter.virtualshelfDate}%`};

    if(filter.virtualshelfDescription)
        whereClause.VirtualShelfDescription = {[LikeOp] : `%${filter.virtualshelfDescription}%`};

    return await VirtualShelf.findAll({
        where: whereClause
    });

}

//----------------------------------------------------------------------\\





//-------------------------- Rute --------------------------\\

//O sa creeze tabelul nostru
router.route('/create').get(async (req, res)=>{
    try {
        await db.sync({force : true}) 
        res.status(201).json({message: 'created'});
    
    } catch (error) {
        console.warn(error.stack);
        res.status(500).json({message: 'server error'});
    }
})


router.route('/virtualshelf').post(async (req, res) =>{
    return res.json(await createVirtualShelf(req.body));
})

router.route('/book').post(async (req, res) =>{
    return res.json(await createBook(req.body));
})




router.route('/virtualshelf').get(async (req, res) =>{
    return res.json(await getVirtualShelf());
})

router.route('/book').get(async (req, res) =>{
    return res.json(await getBook());
})




router.route('/virtualshelf/:id').get(async (req, res) =>{
    return res.json(await getVirtualShelfbyId(req.params.id));
})

router.route('/book/:id').get(async (req, res) =>{
    return res.json(await getBookbyPK(req.params.id));
})





router.route ('/virtualshelf/:id').put(async (req, res)=>{

    res.json(await updateVirtualShelf(req.params.id, req.body));

})

router.route ('/book/:id').put(async (req, res)=>{

    res.json(await updateBook(req.params.id, req.body));

})


router.route ('/virtualshelf/:id').delete(async (req, res)=>{

    res.json(await deleteVirtualShelf(req.params.id));

})

router.route ('/book/:id').delete(async (req, res)=>{

    res.json(await deleteBook(req.params.id));

})


router.route('/virtualshelfFilter').get(async (req, res) =>{
    return res.json(await filterVirtualShelf(req.query));
})

router.route('/virtualshelfSort').get(async (req, res) =>{
    return res.json(await getVirtualShelfbyDescription(req.query.des));
})







let port = process.env.PORT || 8000;
app.listen(port);
console.log(`API is running at ${port}`);