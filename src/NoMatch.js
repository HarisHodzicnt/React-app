import React from 'react';
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
          background:'black'
        }
      },
  }));

export default function Header() {
  const classes = useStyles();
  return (
    <div className={classes.root} style={{textAlign:'center'}}>
          <img src="https://www.coengoedegebure.com/content/images/2017/08/default404.gif" style={{margin:'0 auto', display:'inline-block'}}/>
    </div>
  );
}