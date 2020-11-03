const express = require('express')
const userController = require('./controllers/userController')
const publicController = require('./controllers/publicController')
const routes = express.Router();

// user routes--

routes.post('/user/signup', userController.signup)
routes.post('/user/signin', userController.signin)
routes.get('/user/showAll', userController.showAll)
routes.post('/user/delete', userController.delete)
routes.put('/user/update', userController.update)
routes.post('/user/showOne', userController.showOne)

// --user routes

// --public routes

routes.post('/public/store', publicController.store)
routes.post('/public/showMany', publicController.showMany)
routes.post('/public/searchPosts', publicController.searchPosts)

// --public routes

module.exports = routes