const express = require('express')
const request = require('request-promise')
const { generateScraperUrl } = require('../../helpers/scraperUrl')

const route = express.Router()

route.get('/products/:productId', async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query
  try { 
   const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`)

    return res.json(JSON.parse(response))
  } catch (error) {
    console.log(error)
    return res.json(error)
  }
})

route.get('/products/:productId/reviews', async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query

  try {
    const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`)

    return res.json(JSON.parse(response))
  } catch (error) {
    return res.json(error)
  }
})

route.get('/products/:productId/offers', async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query

  try {
    const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`)

    return res.json(JSON.parse(response))
  } catch (error) {
    return res.json(error)
  }
})

route.get('/search/:searchQuery', async (req, res) => {
  const { searchQuery } = req.params;
  const { api_key } = req.query

  try {
    const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`)

    return res.json(JSON.parse(response))
  } catch (error) {
    return res.json(error)
  }
})

module.exports = route