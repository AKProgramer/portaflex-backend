const express = require('express');
const router = express.Router();

const {
  createPortfolio,
  getPortfolioById,
  getUserPortfolios,
  updatePortfolio,
  deletePortfolio,
  publishPortfolio,
  requestDeployment,
} = require('../controllers/portfolioController');

const { protect } = require('../middlewares/authMiddleware');

// @route   POST /api/portfolios
// @desc    Create a new portfolio
// @access  Private
router.post('/', protect, createPortfolio);

// @route   GET /api/portfolios/:id
// @desc    Get a specific portfolio by ID
// @access  Public or Private (based on portfolio visibility)
router.get('/:id', getPortfolioById);

// @route   GET /api/portfolios/user/all
// @desc    Get all portfolios of the logged-in user
// @access  Private
router.get('/user/all', protect, getUserPortfolios);

// @route   PUT /api/portfolios/:id
// @desc    Update a portfolio by ID
// @access  Private
router.put('/:id', protect, updatePortfolio);

// @route   DELETE /api/portfolios/:id
// @desc    Delete a portfolio by ID
// @access  Private
router.delete('/:id', protect, deletePortfolio);

// @route   POST /api/portfolios/:id/publish
// @desc    Publish (make live) a portfolio
// @access  Private
router.post('/:id/publish', protect, publishPortfolio);

// @route   POST /api/portfolios/:id/deploy
// @desc    Request deployment for a paid user
// @access  Private
router.post('/:id/deploy', protect, requestDeployment);

module.exports = router;
