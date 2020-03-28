const { celebrate, Segments, Joi } = require('celebrate')

const Authorize = celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required()
    })
})

const OngCreate = celebrate({ 
    [Segments.BODY] : Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(12),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    }) 
})

const profileList = celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
})

const incidentList = celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
})

const incidentDelete = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
})

const createIncident = celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required()
    })
}) 

module.exports = { OngCreate, profileList, createIncident ,incidentList, incidentDelete, Authorize }