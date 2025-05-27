const Portfolio = require('../models/Portfolio');
const mongoose = require('mongoose');

// Controller function to create a new portfolio
const createPortfolio = async (req, res) => {
  try {
    const {title, description } = req.body;

    // Create a new portfolio
    const newPortfolio = new Portfolio({
      title: title,
      description: description || '',
      sections: [],
      isPublished: false,
    });

    // Save the new portfolio to the database
    await newPortfolio.save();

    // Send a success response
    res.status(201).json({
      message: 'Portfolio created successfully!',
      portfolio: newPortfolio,
    });
  } catch (error) {
    console.error('Error creating portfolio:', error);
    res.status(500).json({ error: 'Something went wrong while creating the portfolio.' });
  }
};

// Controller function to update a portfolio by adding a new section
const addSectionToPortfolio = async (req, res) => {
    try {
      const { portfolioId, title, type, data } = req.body;
      let sectionData = { ...data };
  
      // If a file is uploaded, add it to the section data
      if (req.file) {
        // You can decide how to handle files for different sections dynamically
        sectionData.image = req.file.path;  // This assumes you're uploading a single file for simplicity
      }
  
      // Find the existing portfolio by ID
      const portfolio = await Portfolio.findById(portfolioId);
  
      if (!portfolio) {
        return res.status(404).json({ error: 'Portfolio not found.' });
      }
  
      // Create the new section to be added
      const newSection = {
        type: type || 'custom',  // Default to 'custom' if no type is provided
        title: title,  // Section title
        data: sectionData,  // Dynamically populated data
        visible: true,
        order: portfolio.sections.length, // Append new section at the end
      };
  
      // Push the new section to the portfolio's sections array
      portfolio.sections.push(newSection);
  
      // Save the updated portfolio
      await portfolio.save();
  
      // Send a success response
      res.status(200).json({
        message: 'Section added to the portfolio successfully!',
        portfolio,
      });
    } catch (error) {
      console.error('Error adding section to portfolio:', error);
      res.status(500).json({ error: 'Something went wrong while adding the section.' });
    }
  };
  
// Controller function to get a portfolio by ID
const getPortfolioById = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ title: req.params.title });

    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found.' });
    }

    res.status(200).json(portfolio);
  } catch (error) {
    console.error('Error getting portfolio by ID:', error);
    res.status(500).json({ error: 'Something went wrong while retrieving the portfolio.' });
  }
};

module.exports = {
  createPortfolio,
  addSectionToPortfolio,
  getPortfolioById,
};
