// routes/resumeRoutes.js
const express = require("express");
const { body } = require("express-validator");
const handleValidationErrors = require("../middleware/validation");
const {
  getAllResumes,
  getResumeById,
  createResume,
  updateResume,
  deleteResume,
} = require("../controllers/resumeController");

const router = express.Router();

// Validation middleware
const validatePersonalInfo = [
  body("personalInfo.name")
    .notEmpty()
    .withMessage("Name is required")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("personalInfo.email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  body("personalInfo.phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .trim(),

  body("personalInfo.location")
    .notEmpty()
    .withMessage("Location is required")
    .trim(),

  body("personalInfo.linkedin")
    .optional()
    .isURL()
    .withMessage("Please enter a valid LinkedIn URL"),

  body("personalInfo.github")
    .optional()
    .isURL()
    .withMessage("Please enter a valid GitHub URL"),
];

const validateWorkExperience = [
  body("workExperience.*.company")
    .optional()
    .notEmpty()
    .withMessage("Company name is required")
    .trim(),

  body("workExperience.*.jobTitle")
    .optional()
    .notEmpty()
    .withMessage("Job title is required")
    .trim(),

  body("workExperience.*.startDate")
    .optional()
    .notEmpty()
    .withMessage("Start date is required")
    .matches(/^\d{4}-\d{2}$/)
    .withMessage("Date must be in YYYY-MM format"),
];

const validateEducation = [
  body("education.*.institution")
    .optional()
    .notEmpty()
    .withMessage("Institution name is required")
    .trim(),

  body("education.*.degree")
    .optional()
    .notEmpty()
    .withMessage("Degree is required")
    .trim(),

  body("education.*.startYear")
    .optional()
    .notEmpty()
    .withMessage("Start year is required")
    .isInt({ min: 1900, max: new Date().getFullYear() + 10 })
    .withMessage("Please enter a valid start year"),
];

// Routes
router.get("/", getAllResumes);
router.get("/:id", getResumeById);
router.post(
  "/",
  [...validatePersonalInfo, ...validateWorkExperience, ...validateEducation],
  handleValidationErrors,
  createResume
);
router.put(
  "/:id",
  [...validatePersonalInfo, ...validateWorkExperience, ...validateEducation],
  handleValidationErrors,
  updateResume
);
router.delete("/:id", deleteResume);

module.exports = router;
