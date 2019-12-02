const express = require('express')
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const { Favorite } = require('./sequelize');

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

app.post('/v1/new/favorite', async (req, res, next) => {

  const { poster_path, title, release_date, original_language, vote_count, vote_average, overview, movieID } = req.body

  try {
    const newFav = await Favorite.sync({ forse: true }).then(() => {
      Favorite.create({
        poster_path,
        title,
        release_date,
        original_language,
        vote_count,
        vote_average,
        overview,
        movieID
      })
    })
    res.status(200).send(newFav)
  } catch (err) {
    next(err)
  }

})



Favorite.sync({ forse: true }).then(() => {
  app.listen(port, () => console.log(`Listening on port${port}`))
});



