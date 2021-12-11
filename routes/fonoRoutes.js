const express = require("express");
const router = express.Router();

const {
  getAllFono,
  getSomeFono,
  getOneFono,
  createFono,
  updateFono,
  deleteFono,
  deleteAll,
} = require("../controllers/fonoControllers");

router.get("/", getAllFono);
router.get("/single/:id", getOneFono);
router.get("/artistas/:artista", getSomeFono);
router.post("/", createFono);
router.patch("/:id", updateFono);
router.delete("/single/:id", deleteFono);
router.delete("/", deleteAll);

module.exports = router;
