const mongoose = require("../config/mongoose");

const Question = require("../models/Question");

const Option = require("../models/Option");

//Create Question handle
module.exports.createQuest = async (req, res) => {
  console.log(req.url);
  console.log(req.body);

  //create question in db
  //   await Question.create(req.body, (err, newQuestion) => {
  //     if (err) {
  //       console.log("Error in creating the question", err);
  //       return;
  //     }

  //     console.log("******", newQuestion);
  //     res.send(newQuestion);
  //   });

  await Question.create(req.body)
    .then((newQuestion) => {
      console.log("******", newQuestion);
      res.send(newQuestion);
    })
    .catch((err) => {
      console.log("Error in creating the question", err);
      return;
    });
};

//View Question Handle
module.exports.showQuestion = async (req, res) => {
  const question = await Question.findById(req.params.id).populate("options");

  if (question) {
    res.send(question);
  } else {
    res.send("question does not exists");
  }
};

//Delete question handle
module.exports.deleteQuestion = async (req, res) => {
  const question = await Question.findById(req.params.id);

  if (question) {
    //delete question from db
    await Question.deleteOne(req.params.id)
      .clone()
      .catch((err) => console.log("Error in deleting the question", err));

    //delete all options associated with questions from db
    await Option.deleteMany({ question: req.params.id })
      .clone()
      .catch((err) => console.log("Error in deleting the options", err));

    res.send("question deleted successfully");
  } else {
    res.send("question does not exist");
  }
};
