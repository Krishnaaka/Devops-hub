const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true } // index of the correct option
});

const resourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, enum: ['Doc', 'Repo', 'CheatSheet'], default: 'Doc' }
});

const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  duration: {
    type: Number, // duration in minutes
    required: true,
  },
  videoUrl: {
    type: String,
    default: ''
  },
  assignments: [{
    type: String
  }],
  quiz: [quizSchema],
  resources: [resourceSchema]
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner',
  },
  modules: [moduleSchema],
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/400x200?text=Course+Image'
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Course', courseSchema);
