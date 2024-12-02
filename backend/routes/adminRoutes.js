import express from 'express'
const router= express.Router()
import { authAdmin, logoutAdmin,getCategories,addCategories,addItems } from '../controllers/adminController.js'
import {protect} from '../middleware/adminAuthMiddleware.js'

  router.post('/auth',authAdmin)
  router.post('/logout',logoutAdmin)
  router.get('/categories',getCategories)
  router.post('/categories',addCategories)
  router.post('/add-items',addItems)

  
  





export default router