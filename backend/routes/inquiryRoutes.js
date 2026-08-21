const express = require("express");
const protect = require("../middleware/protect");
const router = express.Router();

const {
  createInquiry,
  getAllInquiries,
  getInquiryById,
  updateInquiry,
  deleteInquiry,
} = require("../controllers/inquiryController");

router.post("/", createInquiry);

router.get("/", protect, getAllInquiries);

router.get("/:id", protect, getInquiryById);

router.put("/:id", protect, updateInquiry);

router.delete("/:id", protect, deleteInquiry);

module.exports = router;