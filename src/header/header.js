import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginTop:'1rem'
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
    nameHeader:{
        color:'#EC2625',
        textShadow:
        `-1px -2px 0 #D1A13F,  
         1px -2px 0 #D1A13F,
         -1px 1px 0 #D1A13F,
          1px 1px 0 #D1A13F`,
        fontSize:'3rem',
        marginRight:'20px',
      }
  }));

export default function Header(props) {
  const classes = useStyles();
  const {matches}=props;
  const [spacing, setSpacing] = React.useState(2);
  var today=new Date();
  function handleChange(event) {
    setSpacing(Number(event.target.value));
  }

  return (
    <div className={classes.root}>
      <Grid container className={classes.root} spacing={2}>
        {
          matches==undefined? <span style={{borderBottom:'2px solid black', position:'absolute',fontSize:'1.3rem', marginTop:'5px', right:'45px'}}>{today.getDate()+'.'+(today.getMonth()+1)+'.'+today.getFullYear()}</span>
          : false

        }
      <Grid item xs={12} sm={12} md={5}>
        <Grid container justify="center" spacing={spacing}  style={{textAlign:'center'}}>
          <img src="http://www.kondisa.ba/images/logo%20KONDISA%203.png"/>
        </Grid>
        
      </Grid>
      <Grid item xs={12} sm={12} md={7}>
        <Grid container justify="center" spacing={spacing} style={{textAlign:'center'}}>
          <h1 className={classes.nameHeader} style={{color:'#EC2625',fontSize:'3rem',}}>DNEVNI IZVJEŠTAJ</h1>
        </Grid>
        
      </Grid>
      </Grid>
    </div>
  );
}