import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('tasks')
@Controller('tasks')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Listar tarefas do usuário' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, enum: ['completed', 'pending'] })
  @ApiResponse({ status: 200, description: 'Lista de tarefas' })
  async findAll(
    @Request() req,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('status') status?: string,
  ) {
    return this.tasksService.findAll(req.user.userId, page, limit, status);
  }

  @Post()
  @ApiOperation({ summary: 'Criar nova tarefa' })
  @ApiResponse({ status: 201, description: 'Tarefa criada com sucesso' })
  async create(@Request() req, @Body(ValidationPipe) createTaskDto: CreateTaskDto) {
    return this.tasksService.create(req.user.userId, createTaskDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar tarefa' })
  @ApiResponse({ status: 200, description: 'Tarefa atualizada com sucesso' })
  async update(
    @Param('id') id: number,
    @Request() req,
    @Body(ValidationPipe) updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, req.user.userId, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir tarefa' })
  @ApiResponse({ status: 200, description: 'Tarefa excluída com sucesso' })
  async remove(@Param('id') id: number, @Request() req) {
    return this.tasksService.remove(id, req.user.userId);
  }
}