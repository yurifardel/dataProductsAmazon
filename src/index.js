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

app.get('/products/:productId', async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query
  try {
    const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`)

    return res.json(JSON.parse(response))
  } catch (error) {
    return res.json(error)
  }
})

app.get('/products/:productId/reviews', async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query

  try {
    const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`)

    return res.json(JSON.parse(response))
  } catch (error) {
    return res.json(error)
  }
})

app.get('/products/:productId/offers', async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query

  try {
    const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`)

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