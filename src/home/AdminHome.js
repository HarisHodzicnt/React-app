import React,{useState,useEffect} from 'react';
import {api} from '../environment/environment';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginTop:'3rem'
    },
    box:{
        padding:'20px',
        textAlign:'center',
        marginLeft:'.3rem',
        marginTop:'.4rem',
        // '&:hover':{
        //     cursor:'pointer',
        //     transform:'scale(1.05,1.05)',
        //     boxShadow:'10px 7px 29px -19px rgba(0,0,0,0.75)',
        //     borderRadius:'20%'
        // }
    },
    card: {
        minWidth: 240,
        maxWidth:300,
        background:'rgba(231,166,26,0.7)',
        color:'white'
      },
    title: {
        fontSize: 14,
      },
    button:{
        background:'rgba(0,0,0,0.1)',
        color:'white',
        '&:hover':{
            background:'rgba(0,0,0,0.3)'
        }
    }
}));

function AdminHome()
{
    const [users,setUsers]=useState(0);
    useEffect(x=>{
        fetch(`${api}/login`).then(x=>x.json()).then(y=>setUsers(y));
        },[])
    const classes=useStyles();
    const handleDelete=(e)=>{
      var id;
      console.dir(e.target.localName);
      if(e.target.localName=="span")
      id=e.target.parentElement.name;
      else
      id=e.target.name;
      fetch(`${api}/login/${id}`, {
      method: 'DELETE',
      mode:'cors',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: id})
    })
    .then(res => res.json()) 
    .then(res => {
      fetch(`${api}/login`).then(x=>x.json()).then(y=>setUsers(y));})
    }
    return(
        <Grid container justify="center" className={classes.root} spacing={4}>
            {users!=0 &&
                users.map(x=>{
                    return (
                    <Grid key={x.Id} item xs={6} sm={5} md={3} className={classes.box}>
                     <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
        {x.Ime} {x.Prezime}
        <hr/>
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Region: {x.Region}
        </Typography>
        <Typography variant="body2" component="p">
          {x.Email}
        </Typography>
      </CardContent>
      <CardActions>
        <Link style={{textDecoration:'none',marginLeft:'15%'}} to={{
            pathname:"/userDetails/"+x.Id,
            aboutProps:{
                id:x.Id
            }
        }} >
        <Button size="small"className={classes.button} >Detalji</Button>
        </Link>
        <Button name={x.Id} onClick={handleDelete} size="small"className={classes.button} style={{float:'right',color:'red',background:'rgba(0,0,0,0.3)', marginLeft:'20%'}}>Obriši</Button>
       
      </CardActions>
    </Card>
                    </Grid>
              )
                })
            }
               </Grid>   
    )
}
export default AdminHome;