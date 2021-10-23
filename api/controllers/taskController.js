let mongoose = require('mongoose')
let Task = mongoose.model('Tasks')

exports.hello_world = (req, res) => {
  res.json({
    stats: "API works!!!",
    message: "Welcome to FirstRest API"
  })
}

exports.all_tasks = (req, res) => {
  Task.find({}, (err, task) => {
    if(err) res.send(err)
    res.json(task)
  })
}

exports.create_task = (req, res) => {
  let new_task = new Task(req.body)
  new_task.save((err, task) => {
    if (err) res.send(err)
    res.json(task)
  })
}

// 特定のタスクを取得する。
exports.load_task = function(req, res) {
  Task.findById(req.params.taskId,(err, task) => {
    if (err) res.send(err);
    res.json(task);
  });
};

// 特定のタスクを更新する。
exports.update_task = function(req, res) {
  Task.findOneAndUpdate(
    { _id: req.params.taskId },
    req.body,
    { new: true },
    (err, task) => {
      if (err) res.send(err);
      res.json(task);
    }
  );
};

// 特定のタスクを削除する。
exports.delete_task = function(req, res) {
  Task.remove(
    {
      _id: req.params.taskId
    },
    function(err, task) {
      if (err) res.send(err);
      res.json({ message: "Task successfully deleted" });
    }
  );
};