const express = require("express");
const {
  getduct,
  getductById,
  createduct,
  updateduct,
  deleteduct,
} = require("../controllers/ductController");

// route obj
const router = express.Router();

// routes

// Get all duct info
router.get("/getall", getduct);

// Get duct  by id
router.get("/get/:id", getductById);

// Create duct || Post
router.post("/create", createduct);

// Update duct || PUT
router.put("/update/:id", updateduct);

// Update duct || PUT
router.delete("/delete/:id", deleteduct);

module.exports = router;
