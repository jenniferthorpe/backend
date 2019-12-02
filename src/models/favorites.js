module.exports = (sequelize, type) => {
  return sequelize.define('favorite', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    poster_path: type.STRING,
    title: type.STRING,
    release_date: type.DATE,
    original_language: type.STRING,
    adult: type.BOOLEAN,
    vote_count: type.INTEGER,
    vote_average: type.FLOAT,
    overview: type.TEXT,
    movieID: type.INTEGER
  })
}
