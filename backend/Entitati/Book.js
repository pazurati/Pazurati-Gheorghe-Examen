import db from '../dbConfig.js'
import Sequelize from 'sequelize';


const Book = db.define("Book", 
{
    BookId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    BookTitle: 
    {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            len: [5,200]
        }
    },

    BookGen: 
    {
        type: Sequelize.ENUM,
        allowNull: true,
        values: ['TRAGIC', 'ROMANTIC', 'COMEDY']
    },

    BookURL:
    {
        type: Sequelize.STRING,
        allowNull: true,
        isUrl: true
    },

    VirtualShelfId:
    {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

export default Book;
