import express from 'express'
const router= express.Router()
import { authAdmin, logoutAdmin,getCategories,addCategories,addItems,downloadSelectionPDF,getSelectionById,getAllSelections } from '../controllers/adminController.js'
import {protect} from '../middleware/adminAuthMiddleware.js'

  router.post('/auth',authAdmin)
  router.post('/logout',logoutAdmin)
  router.get('/categories',getCategories)
  router.post('/categories',addCategories)
  router.post('/add-items',addItems)
  router.get("/selections", getAllSelections); 
  router.get("/selections/:id", getSelectionById); 
  router.get("/selections/:id/download", downloadSelectionPDF);

  
  





export default router