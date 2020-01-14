import React from 'react';
import Undo from '@material-ui/icons/Undo';
import Fab from '@material-ui/core/Fab';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginTop:'1rem'
    },
      fab: {
        margin: theme.spacing(1),
        '&:hover':{
          cursor:'pointer',
          color:'white',
          background:'black',
          marginTop:'1rem'
        }
      },
  }));

export default function Header() {
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(2);
  var today=new Date();
  function handleChange(event) {
    setSpacing(Number(event.target.value));
  }
  const handleBack=()=>{
    window.history.back();
  }

  return (
    <div className={classes.root}>
          <Fab onClick={handleBack}  aria-label="delete" className={classes.fab} style={{ position:'absolute',marginTop:'-90px', left:'35px'}}>
        <Undo /> 
      </Fab>
    </div>
  );
}