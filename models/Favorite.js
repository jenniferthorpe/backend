module.exports = (sequelize, DataTypes) => {
    const Favorite = sequelize.define('Favorite', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        poster_path: DataTypes.STRING,
        title: DataTypes.STRING,
        release_date: DataTypes.DATE,
        original_language: DataTypes.STRING,
        vote_count: DataTypes.INTEGER,
        vote_average: DataTypes.FLOAT,
        overview: DataTypes.TEXT,
        movieID: DataTypes.INTEGER,
        sessionID: DataTypes.STRING
    },
        // {
        //   classMethods: {
        //     associate: function(models) {
        //       User.hasMany(models.Task)
        //     }
        //   }
        // }
    );

    return Favorite;
};