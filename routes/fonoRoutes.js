const express = require("express");
const router = express.Router();

const {
  getAllFono,
  getOneFono,
  createFono,
  updateFono,
  deleteFono,
} = require("../controllers/fonoControllers");

router.get("/", getAllFono);
router.get("/:id", getOneFono);
router.post("/", createFono);
router.patch("/:id", updateFono);
router.delete("/:id", deleteFono);

module.exports = router;
