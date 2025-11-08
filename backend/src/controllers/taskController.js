const taskService = require('../services/taskService');

class TaskController {
  async getTasks(req, res) {
    try {
      const { page, limit, status } = req.query;
      const result = await taskService.getTasks(req.userId, { page, limit, status });
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createTask(req, res) {
    try {
      const task = await taskService.createTask(req.userId, req.body);
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateTask(req, res) {
    try {
      const task = await taskService.updateTask(req.params.id, req.userId, req.body);
      res.json(task);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async deleteTask(req, res) {
    try {
      const result = await taskService.deleteTask(req.params.id, req.userId);
      res.json(result);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new TaskController();