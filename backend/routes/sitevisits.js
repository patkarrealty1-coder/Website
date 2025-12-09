const express = require('express')
const {
  getSiteVisits,
  createSiteVisit,
  updateSiteVisit,
  deleteSiteVisit
} = require('../controllers/siteVisitController')
const { authenticate } = require('../middleware/auth')

const router = express.Router()

// All routes require authentication
router.use(authenticate)

// Site visit routes
router.get('/', getSiteVisits)
router.post('/', createSiteVisit)
router.put('/:id', updateSiteVisit)
router.delete('/:id', deleteSiteVisit)

module.exports = router