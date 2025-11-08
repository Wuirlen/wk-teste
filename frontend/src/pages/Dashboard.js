import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
  AppBar,
  Toolbar,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Add, Logout } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useTasks, useCreateTask, useUpdateTask, useDeleteTask } from '../hooks/useTasks';
import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';

const Dashboard = () => {
  const [filter, setFilter] = useState('all');
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  const { user, logout } = useAuth();
  const { data: tasksData, isLoading, error } = useTasks({ status: filter === 'all' ? undefined : filter });
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const handleCreateTask = (taskData) => {
    createTask.mutate(taskData);
  };

  const handleUpdateTask = (taskData) => {
    updateTask.mutate({ id: editingTask.id, ...taskData });
    setEditingTask(null);
  };

  const handleToggleTask = (task) => {
    updateTask.mutate({ id: task.id, completed: !task.completed });
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      deleteTask.mutate(taskId);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setFormOpen(true);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Minhas Tarefas - {user?.name}
          </Typography>
          <Button color="inherit" onClick={logout} startIcon={<Logout />}>
            Sair
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4">Tarefas</Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setFormOpen(true)}
          >
            Nova Tarefa
          </Button>
        </Box>

        <Tabs value={filter} onChange={(e, value) => setFilter(value)} sx={{ mb: 3 }}>
          <Tab label="Todas" value="all" />
          <Tab label="Pendentes" value="pending" />
          <Tab label="Concluídas" value="completed" />
        </Tabs>

        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Erro ao carregar tarefas
          </Alert>
        )}

        {tasksData?.tasks?.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={handleToggleTask}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        ))}

        {tasksData?.tasks?.length === 0 && (
          <Typography variant="body1" align="center" sx={{ mt: 4 }}>
            Nenhuma tarefa encontrada
          </Typography>
        )}

        <TaskForm
          open={formOpen}
          onClose={() => {
            setFormOpen(false);
            setEditingTask(null);
          }}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          task={editingTask}
        />
      </Container>
    </>
  );
};

export default Dashboard;