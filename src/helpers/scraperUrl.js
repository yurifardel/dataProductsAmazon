const generateScraperUrl = (apiKey) =>  `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

module.exports = { generateScraperUrl }
