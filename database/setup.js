const { Sequelize, DataTypes } = require("sequelize");
require('dotenv').config();

const db = new Sequelize({ 
    dialect: 'sqlite', 
    storage: `database/${process.env.DB_NAME}` || 'database/music_library.db', 
    logging: console.log // show SQL queries in the console 
})

async function setupDatabase() { 
    try { 
        await db.authenticate(); // This attempts to establish a connection to the database.
        console.log('Connection to database established successfully.'); 

        await db.sync({ force: true }) //  This syncs all defined models with the database , The { force: true } parameter forces Sequelize to drop and recreate the tables, which is typically used in development
        console.log('Database file created at:',`database/${process.env.DB_NAME}`); 

        await db.close(); // This final command will close the database gracefully
    
    } catch (error) { 
         console.error('Unable to connect to the database:', error); 
    } 
}

const Track = db.define("Track", {
    trackId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    songTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    artistName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    albumName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    releaseYear: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});

// Export the model and the connection to use in other files 
module.exports = { db, Track };

// Run setup if this file is executed directly
if (require.main === module) {
    setupDatabase();
}