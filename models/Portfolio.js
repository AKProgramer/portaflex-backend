const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
  type: {
    type: String, // e.g. 'about', 'projects', 'experience', 'education', 'skills', etc.
    required: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed, // Flexible data structure for each section
    required: true,
  },
  visible: {
    type: Boolean,
    default: true,
  }
});

const PortfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true, // Ensure each portfolio has a unique title
    },
    imageUrl: String,
    category: String,
    // this will remove when each portfolio is connected with user model
    username: String,
    description: {
      type: String,
    },

    sections: [SectionSchema],

    isPublished: {
      type: Boolean,
      default: false,
    },

    customDomain: {
      type: String,
    },
    vercelDeploymentLink: String,
    deploymentStatus: {
      type: String,
      enum: ['draft', 'pending', 'deployed'],
      default: 'draft',
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Portfolio', PortfolioSchema);
