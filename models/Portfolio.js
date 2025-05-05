const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
  type: {
    type: String, // e.g. 'about', 'projects', 'experience', 'education', 'skills', etc.
    required: true,
  },
  title: {
    type: String, // Section title (can be customized by user)
    required: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed, // Flexible data structure for each section
    required: true,
  },
  visible: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number, // To control the display order of sections
    default: 0,
  },
});

const PortfolioSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Template',
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    sections: [SectionSchema],

    theme: {
      type: String, // e.g. 'light', 'dark', or custom theme name
      default: 'default',
    },

    isPublished: {
      type: Boolean,
      default: false,
    },

    customDomain: {
      type: String,
    },

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
