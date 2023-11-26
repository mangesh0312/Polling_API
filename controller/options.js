const mongoose = require("../config/mongoose");

const Question = require("../models/Question");

const Option = require("../models/Option");

module.exports.createOption = async (req, res) => {
  console.log(req.body);
  console.log(req.params.id);
  const new_opt = await Option.create({
    option: req.body.content,
    question: req.params.id,
  });

  const Opt_update = await Option.findByIdAndUpdate(new_opt._id, {
    add_vote: `http://localhost:7000/api/v1/options/${new_opt._id}/add_vote`,
  });

  const question = await Question.findById(req.params.id);
  if (question) {
    question.options.push(Opt_update);
    question.save();
    console.log("Option", question);
    res.send(question);
  } else {
    res.send("question does not exist");
  }
};

module.exports.addvote = async (req, res) => {
  console.log(req.params.id);

  const option = await Option.findByIdAndUpdate(req.params.id, {
    $inc: { vote: 1 },
  });

  if (option) {
    option.save();
    console.log(option);
    res.send(option);
  } else {
    res.send("option does not exist");
  }
};

module.exports.deleteOption = async (req, res) => {
  console.log("delete", req.params.id);

  const option = await Option.findById(req.params.id);

  if (option) {
    const questionId = option.question;

    const question = await Question.findByIdAndUpdate(questionId, {
      $pull: { options: req.params.id },
    });

    await Option.findByIdAndDelete(req.params.id);
    console.log(question);
    res.send("option deleted successfully");
  } else {
    res.send("option does not exists");
  }
};
