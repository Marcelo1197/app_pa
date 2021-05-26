import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const ToDoItems= [ //TODO: traer de la aplicacion
	{ id: 'ajhsj1-1', },
	{ id: 'jhasja2', },
]

export default function CheckboxList() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List className={classes.root}>
      {ToDoItems.map( (item, idx) => {
        const labelId = `checkbox-list-label-${item.id}`;

        return (
          <ListItem key={item.id} role={undefined} dense button onClick={handleToggle(idx)}>
  				 	<ListItemText id={labelId} primary={item.dsc || item.id} />
            
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(idx) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>

         		<ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments">
                <CommentIcon />
              </IconButton>
           	</ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
