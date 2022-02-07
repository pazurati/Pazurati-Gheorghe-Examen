import db from '../dbConfig.js'
import Sequelize from 'sequelize';


const VirtualShelf = db.define("VirtualShelf", 
{
    VirtualShelfId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    
    VirtualShelfDescription: 
    {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [3,200]
        }
    },

    VirtualShelfDate: 
    {
        type: Sequelize.DATE,
        allowNull: false
    }
    
});

export default VirtualShelf;
