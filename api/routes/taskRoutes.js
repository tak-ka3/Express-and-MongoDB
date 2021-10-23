module.exports = (app) => {
  let taskList = require('../controllers/taskController')

  app.route('/')
    .get(taskList.hello_world)

  app.route('/tasks')
    .get(taskList.all_tasks)
    .post(taskList.create_task)

  app.route('/tasks/:taskId')
    .get(taskList.load_task)
    .put(taskList.update_task)
    .delete(taskList.delete_task)
}
