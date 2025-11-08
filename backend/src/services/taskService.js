const { Task } = require('../models');

class TaskService {
  async getTasks(userId, { page = 1, limit = 10, status } = {}) {
    const offset = (page - 1) * limit;
    const where = { userId };
    
    if (status === 'completed') {
      where.completed = true;
    } else if (status === 'pending') {
      where.completed = false;
    }

    const { count, rows } = await Task.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
    });

    return {
      tasks: rows,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      total: count,
    };
  }

  async createTask(userId, taskData) {
    return await Task.create({ ...taskData, userId });
  }

  async updateTask(taskId, userId, taskData) {
    const task = await Task.findOne({ where: { id: taskId, userId } });
    if (!task) {
      throw new Error('Tarefa não encontrada');
    }
    
    return await task.update(taskData);
  }

  async deleteTask(taskId, userId) {
    const task = await Task.findOne({ where: { id: taskId, userId } });
    if (!task) {
      throw new Error('Tarefa não encontrada');
    }
    
    await task.destroy();
    return { message: 'Tarefa excluída com sucesso' };
  }
}

module.exports = new TaskService();