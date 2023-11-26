const express = require("express");
const router = express.Router();
const questionController = require("../../../controller/questions");

router.post("/create", questionController.createQuest);
router.get("/view/:id", questionController.showQuestion);
router.post("/delete/:id", questionController.deleteQuestion);
router.use("/options", require("./option"));

module.exports = router;
