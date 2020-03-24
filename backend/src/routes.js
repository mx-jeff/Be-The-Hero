const express = require('express')

const routes = express.Router()

routes.post('/', (request, response) => {
    const params = request.body

    console.log(params)

    return response.json({
        status:"Funciona",
        nome:"Jeferson"
    })
})

module.exports = routes