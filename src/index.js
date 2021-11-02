const express = require('express')
const request = require('request-promise')

const app = express()
const PORT = process.env.PORT || 8080

// const apiKey = '16e8a0391d250b1bb02b79751c286816'
// const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

const generateScraperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

app.use(express.json())
app.get('/', (req, res) => {
  res.send('Bem vindo')
})

app.get('/products/:productsId', async (req, res) => {
  const { productsId } = req.params;
  const { api_key } = req.query
  try {
    const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/dp/${productsId}`)

    return res.json(JSON.parse(response))
  } catch (error) {
    return res.json(error)
  }
})

app.get('/products/:productsId/reviews', async (req, res) => {
  const { productsId } = req.params;
  const { api_key } = req.query

  try {
    const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productsId}`)

    return res.json(JSON.parse(response))
  } catch (error) {
    return res.json(error)
  }
})

app.get('/products/:productsId/offers', async (req, res) => {
  const { productsId } = req.params;
  const { api_key } = req.query

  try {
    const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productsId}`)

    return res.json(JSON.parse(response))
  } catch (error) {
    return res.json(error)
  }
})

app.get('/search/:searchQuery', async (req, res) => {
  const { searchQuery } = req.params;
  const { api_key } = req.query

  try {
    const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`)

    return res.json(JSON.parse(response))
  } catch (error) {
    return res.json(error)
  }
})

app.listen(PORT, () => console.log(`server is running on port ${PORT}`))