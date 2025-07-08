// models/Resume.js
const mongoose = require("mongoose");

// SUPER SIMPLE - No validation, just store everything
const resumeSchema = new mongoose.Schema(
  {
    personalInfo: {
      name: String,
      email: String,
      phone: String,
      location: String,
      linkedin: String,
      github: String,
      title: String,
      firstName: String,
      lastName: String,
      website: String,
    },
    workExperience: [
      {
        company: String,
        position: String,
        jobTitle: String,
        startDate: String,
        endDate: String,
        description: String,
        current: Boolean,
        location: String,
        responsibilities: [String],
      },
    ],
    education: [
      {
        institution: String,
        degree: String,
        startYear: String,
        endYear: String,
        description: String,
        field: String,
        gpa: String,
        startDate: String,
        endDate: String,
      },
    ],
    skills: [String],
    summary: String,
    experience: [
      {
        company: String,
        position: String,
        startDate: String,
        endDate: String,
        description: String,
        current: Boolean,
        location: String,
        responsibilities: [String],
      },
    ],
  },
  {
    timestamps: true,
    strict: false, // Allow any fields
  }
);

module.exports = mongoose.model("Resume", resumeSchema);
