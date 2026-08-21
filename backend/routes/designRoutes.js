const express = require("express");
const upload = require("../middleware/upload");
const protect = require("../middleware/protect");
const router = express.Router();

const {
  createDesign,getAllDesigns,getDesignById,updateDesign,deleteDesign,addPhotos,deletePhoto,setCoverImage
} = require("../controllers/designController");

router.post("/",upload.array("images", 10),protect, createDesign);
router.get("/",  getAllDesigns);
router.get("/:id",  getDesignById);
router.put("/:id", protect, updateDesign);
router.delete("/:id", protect, deleteDesign);
router.put("/:id/photos", protect, upload.array("images", 10), addPhotos);
router.delete("/:id/photo", protect, deletePhoto);
router.put("/:id/cover", protect, setCoverImage);
module.exports = router;