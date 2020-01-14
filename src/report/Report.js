import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    maxWidth:560,
    width:560,
    minWidth:560,
  },
}));

export default function Report(props) {
  var arrayOfRoutesAndComments=[];
  const classes = useStyles();
  const [routesComments, setRoutesComments]=useState([]);

  
  return (
    <Paper className={classes.root} style={{textAlign:'center'}}>
     
          {
             props.data.map((x,index)=>{
                 var date=new Date(x.Date);
                 var vrijemeDolaska=new Date(x.VrijemeDolaska);
                 var putanje="";
                 var komentari="";
                 if(x.NazivRute!=null)
                 putanje=x.NazivRute.split(',');
                 if(x.NazivRute!=null)
                 komentari=x.Komentar.split(',');
                 var vrijemePolaska=new Date(x.VrijemePolaska);
                 vrijemePolaska=`${vrijemePolaska.getHours()}`.padStart(2, '0')+':'+`${vrijemePolaska.getMinutes()}`.padStart(2, '0')+':'+`${vrijemePolaska.getSeconds()}`.padStart(2, '0');
                 vrijemeDolaska=`${vrijemeDolaska.getHours()}`.padStart(2, '0')+':'+`${vrijemeDolaska.getMinutes()}`.padStart(2, '0')+':'+`${vrijemeDolaska.getSeconds()}`.padStart(2, '0');
                 if(putanje!='')
                 putanje.pop();
                 if(putanje!='')
                 komentari.pop();            
                 return(
                    <Table key={index} className={classes.table} style={{marginLeft:'50px',
                      width:660,
                      minWidth:660,textAlign:'center'}}>
            <TableHead style={{background:'black', color:'white',border:'2px solid black'}}>
            <TableRow >
            <StyledTableCell>{date.getDate()+'.'+(date.getMonth()+1)+'.'+date.getFullYear()}</StyledTableCell>
          </TableRow>
          <TableRow >
            <StyledTableCell style={{width:'10%', padding:'5px', fontSize:'0.7rem', padding:'12px 4px 12px 4px',border:'2px solid black',textAlign:'center'}}>Ruta</StyledTableCell>
            <StyledTableCell align="center" style={{width:'10%', padding:'12px 4px 12px 4px', fontSize:'0.7rem',textAlign:'center',border:'2px solid black'}}>Početna kilometraža</StyledTableCell>
            <StyledTableCell align="center"  style={{width:'10%',  padding:'12px 4px 12px 4px', fontSize:'0.7rem',textAlign:'center',border:'2px solid black'}}>Konačna kilometraža</StyledTableCell>
            <StyledTableCell align="center"  style={{width:'10%',  padding:'12px 4px 12px 4px', fontSize:'0.7rem',textAlign:'center',border:'2px solid black'}}>Vrijeme polaska</StyledTableCell>
            <StyledTableCell align="center"  style={{width:'10%',  padding:'12px 4px 12px 4px', fontSize:'0.7rem',textAlign:'center',border:'2px solid black'}}>Vrijeme dolaska</StyledTableCell>
            {
               putanje!='' ? putanje.map((x,index)=>{
                    return <StyledTableCell key={index} align="center" style={{width:'15%',  padding:'12px 4px 12px 4px', fontSize:'0.7rem',textAlign:'center',border:'2px solid black'}}> Putanja i Komentar {index+1}</StyledTableCell>
                })
                :false
            }
            <StyledTableCell align="center"  style={{width:'10%',  padding:'12px 4px 12px 4px', fontSize:'0.7rem',textAlign:'center',border:'2px solid black'}}>Količina goriva</StyledTableCell>
            <StyledTableCell align="center"  style={{width:'10%',  padding:'12px 4px 12px 4px', fontSize:'0.7rem',textAlign:'center',border:'2px solid black'}}>Grad</StyledTableCell>
            <StyledTableCell align="center"  style={{width:'10%',  padding:'12px 4px 12px 4px', fontSize:'0.7rem',textAlign:'center',border:'2px solid black'}}>Benziska pumpa</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody style={{backgroundColor:'#D3D3D3'}}>
            <StyledTableRow >
              <StyledTableCell align="center" style={{width:'30px',fontSize:'0.7rem', padding:'12px 4px 12px 4px',border:'2px solid #D3D3D3',textAlign:'center'}}>
             {x.BrojRute}
              </StyledTableCell>
              <StyledTableCell align="center" style={{fontSize:'0.7rem',textAlign:'center', padding:'12px 4px 12px 4px',border:'2px solid #D3D3D3'}}>{x.PocetnaKilometraza} km</StyledTableCell>
              <StyledTableCell align="center" style={{fontSize:'0.7rem',textAlign:'center', padding:'12px 4px 12px 4px',border:'2px solid #D3D3D3'}}>{x.KonacnaKilometraza} km</StyledTableCell>
              <StyledTableCell align="center" style={{fontSize:'0.7rem',textAlign:'center', padding:'12px 4px 12px 4px',border:'2px solid #D3D3D3'}}>{vrijemePolaska}</StyledTableCell>
              <StyledTableCell align="center" style={{fontSize:'0.7rem',textAlign:'center', padding:'12px 4px 12px 4px',border:'2px solid #D3D3D3'}}>{vrijemeDolaska}</StyledTableCell>
              {
                putanje!='' ? putanje.map((x,index)=>{
                   return <StyledTableCell key={index} align="center" style={{fontSize:'0.7rem',textAlign:'center', padding:'12px 4px 12px 4px',border:'2px solid #D3D3D3'}}>{x} , {komentari[index]}</StyledTableCell>
                })
                :false
            }
            <StyledTableCell align="center"   style={{fontSize:'0.7rem',textAlign:'center', padding:'12px 4px 12px 4px',border:'2px solid #D3D3D3'}}>{x.KolicinaGoriva}l</StyledTableCell>
            <StyledTableCell align="center"   style={{fontSize:'0.7rem',textAlign:'center', padding:'12px 4px 12px 4px',border:'2px solid #D3D3D3'}}>{x.Grad}</StyledTableCell>
            <StyledTableCell align="center"   style={{fontSize:'0.7rem',textAlign:'center', padding:'12px 4px 12px 4px',border:'2px solid #D3D3D3'}}>{x.NazivBenzinskePumpe}</StyledTableCell>
            </StyledTableRow>
        </TableBody>
        </Table>
                 )
             }) 
          }
        
    </Paper>
  );
}