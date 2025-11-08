import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  IconButton,
  Box,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
  return (
    <Card sx={{ mb: 2, opacity: task.completed ? 0.7 : 1 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
          <Checkbox
            checked={task.completed}
            onChange={() => onToggle(task)}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              sx={{
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
            >
              {task.title}
            </Typography>
            {task.description && (
              <Typography variant="body2" color="text.secondary">
                {task.description}
              </Typography>
            )}
          </Box>
          <Box>
            <IconButton onClick={() => onEdit(task)} size="small">
              <Edit />
            </IconButton>
            <IconButton onClick={() => onDelete(task.id)} size="small" color="error">
              <Delete />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskItem;