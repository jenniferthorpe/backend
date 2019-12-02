const Sequelize = require('sequelize')
const FavoriteModel = require('./models/favorites')

const sequelize = new Sequelize('codementor', 'root', 'root', {
    dialect: 'sqlite',
    storage: './favorite.sqlite',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
})

const Favorite = FavoriteModel(sequelize, Sequelize)

// Favorite.sync({ force: true }).then(() => {
//     return Favorite.create({
//         title: 'John',
//         originalLanguage: 'en'
//     });
// });


// sequelize.sync({ force: true });


module.exports = {
    Favorite
}