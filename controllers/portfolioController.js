const Portfolio = require('../models/portfolio');

// @desc    Create a new portfolio
// @route   POST /api/portfolios
// @access  Private
exports.createPortfolio = async (req, res) => {
  try {
    const { title, description, templateId, sections, theme } = req.body;

    const newPortfolio = new Portfolio({
      userId: req.user._id,
      title,
      description,
      templateId,
      sections: sections || [],
      theme: theme || 'default',
    });

    const saved = await newPortfolio.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Error creating portfolio', error: error.message });
  }
};

// @desc    Get a portfolio by ID
// @route   GET /api/portfolios/:id
// @access  Public (or Private based on user logic)
exports.getPortfolioById = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });

    // Optionally add access control if it's private
    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching portfolio', error: error.message });
  }
};

// @desc    Get all portfolios for the current user
// @route   GET /api/portfolios/user/all
// @access  Private
exports.getUserPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ userId: req.user._id }).sort({ updatedAt: -1 });
    res.status(200).json(portfolios);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user portfolios', error: error.message });
  }
};

// @desc    Update a portfolio by ID
// @route   PUT /api/portfolios/:id
// @access  Private
exports.updatePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });
    if (portfolio.userId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    const { title, description, sections, theme } = req.body;

    portfolio.title = title || portfolio.title;
    portfolio.description = description || portfolio.description;
    portfolio.sections = sections || portfolio.sections;
    portfolio.theme = theme || portfolio.theme;

    const updated = await portfolio.save();
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating portfolio', error: error.message });
  }
};

// @desc    Delete a portfolio by ID
// @route   DELETE /api/portfolios/:id
// @access  Private
exports.deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });
    if (portfolio.userId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    await portfolio.deleteOne();
    res.status(200).json({ message: 'Portfolio deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting portfolio', error: error.message });
  }
};

// @desc    Publish a portfolio (make it live)
// @route   POST /api/portfolios/:id/publish
// @access  Private
exports.publishPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });
    if (portfolio.userId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    portfolio.isPublished = true;
    await portfolio.save();

    res.status(200).json({ message: 'Portfolio published successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error publishing portfolio', error: error.message });
  }
};

// @desc    Request deployment of portfolio (for paid users)
// @route   POST /api/portfolios/:id/deploy
// @access  Private
exports.requestDeployment = async (req, res) => {
  try {
    const { customDomain } = req.body;
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });
    if (portfolio.userId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    portfolio.deploymentStatus = 'pending';
    if (customDomain) portfolio.customDomain = customDomain;

    await portfolio.save();
    res.status(200).json({ message: 'Deployment request submitted. We will process it within 1 business day.' });
  } catch (error) {
    res.status(500).json({ message: 'Error requesting deployment', error: error.message });
  }
};
