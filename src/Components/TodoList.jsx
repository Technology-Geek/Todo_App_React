import React, { Component } from 'react';
import { Paper, List, Typography, Box, Fab } from '@material-ui/core';
import TodoItem from './TodoItem';
import { Add as AddIcon } from '@material-ui/icons';
import { lightGreen } from '@material-ui/core/colors';
import AddTodoDialog from './AddTodoDialog';
import { Scrollbars } from 'react-custom-scrollbars';
class TodoList extends Component {
  state = {
    todoList: [
      { id: 0, body: 'First Todo', checked: false },
      { id: 1, body: 'Second Todo', checked: true },
      { id: 2, body: 'Third Todo', checked: false },
    ],
    addTodoDialogIsOpen: false,
  };
  // Id counter for unique ids
  idCounter = 3;

  // Add todo dialog open/close handler
  handleTodoDialogOpen = (isOpen) => {
    this.setState({ addTodoDialogIsOpen: !isOpen });
  };

  // Todo Action Handler [ Check , Add , Delete ]
  handleChange = (action, item) => {
    switch (action) {
      // Alter Todo Check value
      case 'Check':
        this.setState(({ todoList }) => {
          let todo = todoList.find((value) => value.id === item.id);
          todo.checked = !item.checked;
          return { todoList };
        });
        break;
      // Add Todo to List
      case 'Add':
        this.setState(
          ({ todoList }) => {
            return {
              todoList: [
                ...todoList,
                { id: this.idCounter++, body: item.body, checked: false },
              ],
            };
          },
          () => this.handleTodoDialogOpen(item.isOpen)
        );
        break;
      // Delete Todo From List by id
      case 'Delete':
        this.setState(({ todoList }) => {
          const newTodoList = todoList.filter((value) => value.id !== item.id);
          return { todoList: newTodoList };
        });
        break;
      default:
        break;
    }
  };
  render() {
    return (
      <React.Fragment>
        <Paper elevation={13}>
          <Scrollbars autoHeightMax="70vh" autoHeight>
            <List dense>
              {/* Empty List Render Condition */}
              {this.state.todoList.length === 0 ? (
                <Box ml={2}>
                  <Typography variant="h6">Noting To Do</Typography>
                </Box>
              ) : (
                // Todo List mapping => < TodoItem >
                this.state.todoList.map((value) => (
                  <TodoItem
                    key={value.id}
                    item={value}
                    changeHandler={this.handleChange}
                  />
                ))
              )}
            </List>
          </Scrollbars>
        </Paper>
        {/* Add Todo Button */}
        <Fab
          size="medium"
          style={{
            backgroundColor: lightGreen.A700,
            bottom: 23,
            right: 23,
            position: 'fixed',
          }}
          onClick={() =>
            this.handleTodoDialogOpen(this.state.addTodoDialogIsOpen)
          }
        >
          <AddIcon />
        </Fab>
        {/* Add Todo Dialog */}
        <AddTodoDialog
          open={this.state.addTodoDialogIsOpen}
          handleOpen={this.handleTodoDialogOpen}
          handleConfirm={this.handleChange}
        />
      </React.Fragment>
    );
  }
}

export default TodoList;
