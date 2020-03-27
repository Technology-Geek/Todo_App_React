import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemText,
  Checkbox,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { orange } from '@material-ui/core/colors';

function TodoItem({ item, changeHandler }) {
  return (
    <ListItem
      button
      dense
      divider
      style={{ textDecorationLine: item.checked ? 'line-through' : 'none' }}
      onClick={() =>
        changeHandler('Check', { id: item.id, checked: item.checked })
      }
    >
      <ListItemText primary={item.body} />
      <ListItemIcon>
        <Checkbox
          edge="end"
          checked={item.checked}
          tabIndex={-1}
          disableRipple
        />
      </ListItemIcon>
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          style={{
            color: orange.A700,
          }}
          onClick={() => changeHandler('Delete', item)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

TodoItem.propTypes = {
  item: PropTypes.exact({
    id: PropTypes.number,
    body: PropTypes.string,
    checked: PropTypes.bool,
  }),
  changeHandler: PropTypes.func,
};

export default TodoItem;
