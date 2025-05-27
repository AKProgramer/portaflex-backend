const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer'); // Assuming you have a multer setup for file uploads
const {
 createPortfolio,
 addSectionToPortfolio,
 getPortfolioById
} = require('../controllers/portfolioController');

// Define the POST route to create a portfolio with resume upload
router.post('/portfolio/create',  createPortfolio);

// Route to add a new section to an existing portfolio
router.post('/portfolio/add-section', upload.single('image'),  addSectionToPortfolio);

// Route to get a portfolio by its ID
router.get('/portfolio/:title',  getPortfolioById);

module.exports = router;


 
