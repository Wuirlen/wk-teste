import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async findAll(userId: number, page = 1, limit = 10, status?: string) {
    const offset = (page - 1) * limit;
    const where: any = { userId };

    if (status === 'completed') {
      where.completed = true;
    } else if (status === 'pending') {
      where.completed = false;
    }

    const [tasks, total] = await this.taskRepository.findAndCount({
      where,
      take: limit,
      skip: offset,
      order: { createdAt: 'DESC' },
    });

    return {
      tasks,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    };
  }

  async create(userId: number, createTaskDto: CreateTaskDto) {
    const task = this.taskRepository.create({
      ...createTaskDto,
      userId,
    });
    return this.taskRepository.save(task);
  }

  async update(id: number, userId: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.findOne({
      where: { id, userId },
    });

    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    Object.assign(task, updateTaskDto);
    return this.taskRepository.save(task);
  }

  async remove(id: number, userId: number) {
    const task = await this.taskRepository.findOne({
      where: { id, userId },
    });

    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    await this.taskRepository.remove(task);
    return { message: 'Tarefa excluída com sucesso' };
  }
}