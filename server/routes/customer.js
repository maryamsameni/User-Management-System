const express = require('express')
const router = express.Router()
const customerController = require('../controller/customerController')

router.get('/', customerController.homePage)
router.get('/add', customerController.addButton)
router.post('/add', customerController.addCustomer)
router.get('/view/:id', customerController.viewCustomer)
router.get('/edit/:id', customerController.editCustomer)
router.put('/edit/:id', customerController.editButtomCustomer)
router.delete('/delete/:id', customerController.deleteButtomCustomer)
router.post('/search', customerController.searchCustomer)

module.exports = router