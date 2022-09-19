const { Router }= require('express')
const router=Router()


const { searchUrl , Geturl }=require('../controllers/index.controller')
router.post('/url/search/',searchUrl)

module.exports=router;