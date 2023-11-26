const express = require("express");
const router = express.Router();
const questionController = require("../../../controller/questions");
const optionController = require("../../../controller/options");

router.post("/:id/create", optionController.createOption);
router.post("/:id/add_vote", optionController.addvote);
router.post("/:id/delete", optionController.deleteOption);

module.exports = router;
