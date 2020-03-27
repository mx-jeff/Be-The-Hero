const express = require('express')

const OngController = require('./controllers/OngController')
const incidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const { OngCreate, profileList, incidentList, incidentDelete } = require('./validators/index')

const routes = express.Router()

routes.post('/sessions', SessionController.create)

routes.get('/ongs', OngController.index)
routes.post('/ongs', OngCreate, OngController.create)

routes.get('/profile', profileList, ProfileController.index)

routes.get('/incidents', incidentList, incidentController.index)

routes.post('/incidents', incidentController.create)
routes.delete('/incidents/:id', incidentDelete, incidentController.delete)

module.exports = routes