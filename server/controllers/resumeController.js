// controllers/resumeController.js
const Resume = require("../models/Resume");

// Get all resumes
const getAllResumes = async (req, res, next) => {
  try {
    const resumes = await Resume.find().select(
      "personalInfo.name personalInfo.email createdAt"
    );
    res.json({
      success: true,
      data: resumes,
      count: resumes.length,
    });
  } catch (error) {
    next(error);
  }
};

// Get single resume by ID
const getResumeById = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        error: "Resume not found",
      });
    }

    res.json({
      success: true,
      data: resume,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid resume ID",
      });
    }
    next(error);
  }
};

// Create new resume
const createResume = async (req, res, next) => {
  try {
    const resume = new Resume(req.body);
    await resume.save();

    res.status(201).json({
      success: true,
      data: resume,
      message: "Resume created successfully",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
    next(error);
  }
};

// Update resume
const updateResume = async (req, res, next) => {
  try {
    const resume = await Resume.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        error: "Resume not found",
      });
    }

    res.json({
      success: true,
      data: resume,
      message: "Resume updated successfully",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid resume ID",
      });
    }
    next(error);
  }
};

// Delete resume
const deleteResume = async (req, res, next) => {
  try {
    const resume = await Resume.findByIdAndDelete(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        error: "Resume not found",
      });
    }

    res.json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid resume ID",
      });
    }
    next(error);
  }
};

module.exports = {
  getAllResumes,
  getResumeById,
  createResume,
  updateResume,
  deleteResume,
};
