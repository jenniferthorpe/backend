/* eslint-disable camelcase */
const express = require('express')
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const db = require('./models');

const { Favorite } = db;

const app = express()

const port = 4500

const APItmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/'
})



app.options('*', cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/tmdb/v3/*', async (req, res, next) => {

  const url = req.path
  const urlTrim = url.replace('/tmdb/v3/', '/3/')

  try {
    const response = await APItmdb.get(urlTrim, {
      params: {
        api_key: 'd2530355598301431a821ae172ea0b6f',
        ...req.query
      }
    })
    res.status(200).send(response.data)

  } catch (err) {
    res.status(err.response ? err.response.status : 500).send(err.response ? err.response.data : 'Internal error')
    next()
  }
})


app.post('/tmdb/v3/*', async (req, res, next) => {

  const url = req.path
  const urlTrim = url.replace('/tmdb/v3/', '/3/')

  try {
    const response = await APItmdb.post(urlTrim,
      req.body,
      {
        params: {
          api_key: 'd2530355598301431a821ae172ea0b6f',
          ...req.query
        }
      }
    )

    res.status(200).send(response.data)

  } catch (err) {
    res.status(err.response ? err.response.status : 500).send(err.response ? err.response.data : 'Internal error')
    next()
  }
})


app.get('/v1/all', async (req, res, next) => {

  try {
    await Favorite.findAll()

  } catch (err) {
    next(err)
  }

})


app.post('/v1/new/favorite', (req, res, next) => {
  const { poster_path, title, release_date, original_language, vote_count, vote_average, overview, movieID, sessionID } = req.body
  Favorite.create({
    poster_path,
    title,
    release_date,
    original_language,
    vote_count,
    vote_average,
    overview,
    movieID,
    sessionID
  })
    .then((favorite) => {
      res.json(favorite);
    });
  next()
});


// app.post('/v1/new/favorite/list', (req, res, next) => {
//   console.log(req);

//   Favorite.bulkCreate(req.body.favoritesArr)
//     .then((favoriteList) => {
//       console.log(favoriteList);
//       res.json(favoriteList);
//     });
//   next()
// });


// app.delete('/v1/delete/favorite', (req, res, next) => {
//   const { movieID, sessionID } = req.body
//   Favorite.destroy({
//     where: {
//       movieID,
//       sessionID
//     }
//   })
//     .then((response) => {
//       res.json(response);
//     });
//   next()
// });



app.listen(port, () => {
  db.sequelize.sync();
});
