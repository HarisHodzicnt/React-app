import 'date-fns';
import React,{useState,useEffect, useRef} from 'react';
import {api} from '../environment/environment';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Save from '@material-ui/icons/Save';
import Description from '@material-ui/icons/Description';
import Fab from '@material-ui/core/Fab';
import DateFnsUtils from '@date-io/date-fns';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Input from '@material-ui/core/Input';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Report from '../report/Report';
import ReactToPrint from 'react-to-print';
import CustomizedSnackbars from '../logMessages/LogMessages';
import Header from '../header/header';
import $ from 'jquery';
import EvStation from '@material-ui/icons/EvStation';
import Send from '@material-ui/icons/Send';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Ruta 1',
  'Ruta 2',
  'Ruta 3',
  'Ruta 4',
  'Ruta 5',
  'Ruta 6',
  'Ruta 7',
  'Ruta 8',
  'Ruta 9',
  'Ruta 10',
  'Ruta 11',
  'Ruta 12',
];
const ref = React.createRef();

function getStyles(name, route, theme) {
  return {
    fontWeight:
      route.NazivRute.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginTop:'2rem',
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      width:'220px'
    },
    box:{
        padding:'20px',
        textAlign:'center',
        marginLeft:'.7rem',
        marginTop:'.4rem',
        // '&:hover':{
        //     cursor:'pointer',
        //     transform:'scale(1.05,1.05)',
        //     boxShadow:'10px 7px 29px -19px rgba(0,0,0,0.75)',
        //     borderRadius:'20%'
        // }
    },
    card: {
        minWidth: 275,
        background:'rgba(231,166,26,0.7)',
        color:'white!important',
        marginLeft:'1rem',
        marginRight:'1rem'
      },
    title: {
        fontSize: 14,
      },
    marginLeft:{
        marginLeft:'15px'
      },
      whiteColor:{
        color:'white',

      },
      fab: {
        position: 'absolute',
        bottom: theme.spacing(0),
        right: theme.spacing(3),
      },
      textField: {
        height:'48px',
    marginRight: theme.spacing(1),
  },
  hover:{
    '&:hover':{
      cursor:'pointer',
      color:'grey'
    }
  }
}));

function AdminHome(props)
{
  const matches = useMediaQuery('(min-width:959px)');
  const componentRef = useRef();
  const theme = useTheme();
  const [route, setRoute] = React.useState({
    NazivRute:'',
    Id:'',
    Region:''
  });
  const [open, setOpen] = React.useState(false);
  const [openSelect, setOpenSelect]=React.useState(false);
  const [report, setReport]=React.useState([]);
  const [openReport, setOpenReport] = React.useState(false);
  const [messagee, setMessage] = React.useState("");
  const [variant, setVariant] = React.useState("");
  const [fuelReport, setFuelReport]=useState({
    UkupnaKilometraza:'',
    UkupnoGoriva:'',
    ProsjecnoGoriva:''
  });
  const [openMessage, setOpenMessage] = React.useState(false);
    var id;
    const [checked, setChecked] = React.useState(false);
    const [values, setValues] = useState({
        showPassword: false,
      });
      const [selectedDateFrom, setSelectedDateFrom] = React.useState(new Date());
      const [selectedDateTo, setSelectedDateTo] = React.useState(new Date());
      const [fuelReportOpen,setFuelReportOpen]=useState(false);
      const [user,setUser]=useState({
        Ime:'',
        Prezime:'',
        Region:'',
        Email:'',
        Password:'',
        Rola:''
      });
      const [userCopy,setUserCopy]=useState({
        Ime:'',
        Prezime:'',
        Region:'',
        Email:'',
        Password:'',
        Rola:''

      });
    if(props.location.aboutProps == undefined)
    {
            id=window.location.href.substr(-1);
    }
    else 
    id=props.location.aboutProps.id;
    useEffect(x=>{
        fetch(`${api}/login/${id}`).then(x=>x.json()).then(y=>{setUser(y);setUserCopy(y);});
    },[])
    
  function handleChange(e) {
    setUserCopy({...userCopy, "Rola":e.target.value})
  }
  const handleChangeSelect = event => {
    var property;
    if(event.target.name!='')
    {
      property=event.target.name;
      setRoute({...route, [property]:event.target.value.substr(event.target.value.length - (event.target.value.length-event.target.value.indexOf(" ")))});
    }
    else
    {
      property=event.target.id;
      setRoute({...route, [property]:event.target.value});
    }
    setOpenSelect(false);
  };
  function handleClose() {
    setOpen(false);
  }
  const handleClickOpen = () => {
    setOpenReport(true);
  };
  const handleChangeFuelData=(e)=>{
   setFuelReport({...fuelReport,[e.target.id]:e.target.value})
  }
  const handleDownloadPdf=()=>{
    var html=document.getElementById("report").innerHTML;
    $.ajax({
      url: `${api}/izvjestaj/print`,
      type: 'post',
      xhrFields: {
        responseType: 'blob'
      },
      contentType: 'application/json',
      data: JSON.stringify({"htmlTable": html,"datum1":selectedDateFrom.getDate()+'.'+(selectedDateFrom.getMonth()+1)+'.'+selectedDateFrom.getFullYear(),"datum2":selectedDateTo.getDate()+'.'+(selectedDateTo.getMonth()+1)+'.'+selectedDateTo.getFullYear()}),
      success: function(data) {
        console.log(data);
        var blob=new Blob([data],{type: 'application/pdf'});
        var link=document.createElement('a');
        link.href=window.URL.createObjectURL(blob);
        link.download="proba.pdf";
        link.click();
      },
      error: function( jqXhr, textStatus, errorThrown ){
          console.log( errorThrown );
      }
  });
  
  }
  const handlePrintFuel=()=>{
    var datum1=selectedDateFrom.getFullYear()+'-'+(selectedDateFrom.getMonth()+1)+'-'+selectedDateFrom.getDate();
    var datum2=selectedDateTo.getFullYear()+'-'+(selectedDateTo.getMonth()+1)+'-'+selectedDateTo.getDate();
    fetch(`${api}/izvjestaj/fuel/${datum1}/${datum2}/${id}`).then(x=>x.json()).then(y=>{setFuelReport(y); console.log(y);handleClickOpenFuelReport();});

  }
  console.log(fuelReport);
  const handleClickOpenFuelReport=()=>{
    setFuelReportOpen(true);
  }
  const handleClickCloseFuelReport=()=>{
    setFuelReportOpen(false);
  }
  const handleClickClose = () => {
    setOpenReport(false);
  };
  function handleOpen() {
    setOpen(true);
  }
    const handleChangeData=e=>{
        setUserCopy({...user, [e.target.id]:e.target.value})
      }
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
       function handleUpdate(){
         console.log(userCopy);
        for (var key in userCopy) {
          if(userCopy[key]=='')
          {
            setMessage("Unesite podatke u polje " + key);
            setVariant("error");
            setOpenMessage(true);
            return;
      }
    }
        if(route.NazivRute!='' && route.Id!='')
        {
          route.Region=userCopy.Region;
         
        }
        console.log(route);
        if(route.NazivRute!='')
          fetch(`${api}/rute`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            mode:'cors',
            body:JSON.stringify(route)
        }).then(x=>x.json()).then(y=>{console.log(y)});
        
       
        fetch(`${api}/login/${id}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            mode:'cors',
            body:JSON.stringify(userCopy)
        }).then(x=>x.json()).then(y=>{setUserCopy(y); setUser(y);});
      }
    
      const handleCloseMessage = (boool) => {
        setOpenMessage(boool);
    }
      function handlePrintPdf(){
        var datum1=selectedDateFrom.getFullYear()+'-'+(selectedDateFrom.getMonth()+1)+'-'+selectedDateFrom.getDate();
        var datum2=selectedDateTo.getFullYear()+'-'+(selectedDateTo.getMonth()+1)+'-'+selectedDateTo.getDate();
          fetch(`${api}/izvjestaj/${datum1}/${datum2}/${id}`).then(x=>x.json()).then(y=>{setReport(y); handleClickOpen();});
      }
      const handleMouseDownPassword = event => {
        event.preventDefault();
      };
      function handleDateChangeFrom(date) {
        setSelectedDateFrom(date);
      }
      function handleDateChangeTo(date) {
        setSelectedDateTo(date);
      }
      const handleChangeDropDown = () => {
        setChecked(prev => !prev);
      };

    const classes=useStyles();
    return(
        <Grid container justify="center" className={classes.root} spacing={4}>
          {
            openMessage==true? <CustomizedSnackbars handleClose={handleCloseMessage} handleOpen={openMessage} message={messagee} variant={variant}/> : false
        }
             <Grid item xs={12} sm={12} md={6} >
                     <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2" >
        <Grid container>
        <Grid item xs={12} sm={6} md={6}>
        <TextField
        id="Ime"
        label="Ime"
        className={classes.textField}
        value={userCopy.Ime}
        onChange={handleChangeData}
        margin="normal"
        variant="filled"
        InputProps={{
            className: clsx(classes.whiteColor,classes.textField)
          }}
      
      />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
      <TextField
       
        id="Prezime"
        label="Prezime"
        className={clsx(classes.textField,classes.marginLeft)}
        value={userCopy.Prezime}
        onChange={handleChangeData}
        margin="normal"
        variant="filled"
        InputProps={{
            className: clsx(classes.whiteColor,classes.textField)
          }}
      />
            </Grid>
            </Grid>

       <TextField
         fullWidth
        id="Email"
        label="Email"
        className={classes.textField}
        value={userCopy.Email}
        onChange={handleChangeData}
        margin="normal"
        variant="filled"
        
        InputProps={{
            className: clsx(classes.whiteColor,classes.textField)
          }}
      />
      <TextField
         fullWidth
        id="Region"
        label="Region"
        className={classes.textField}
        value={userCopy.Region}
        onChange={handleChangeData}
        margin="normal"
        variant="filled"
        InputProps={{
            className: clsx(classes.whiteColor,classes.textField)
          }}
      />
       <FormControlLabel

        control={<Switch checked={checked} onChange={handleChangeDropDown} />}
        label={"Dodaj podrutu za region "+userCopy.Region }
      />
      
      <div className={classes.container}>
        <Collapse in={checked}>
        <Grid container justify="center" spacing={4}>
             <Grid item xs={6} sm={6} md={6}>
          <TextField
          id="NazivRute"
          className={classes.textField}
          value={route.NazivRute}
          placeholder="Naziv podrute"
          margin="normal"
          variant="filled"
          
          onChange={handleChangeSelect}
          InputProps={{
              className: classes.textField
            }}/>
            </Grid>
            <Grid item xs={6}  sm={6} md={6}>
             <FormControl variant="filled" className={clsx(classes.formControl, classes.noLabel)}>
        <Select
          
          name="Id"
          displayEmpty
          onClick={()=>{setOpenSelect(!openSelect)}}
          value={"Ruta"+route.Id}
          open={openSelect}
          onChange={handleChangeSelect}
          input={<Input id="select-multiple-placeholder" />}
          renderValue={selected => {
            console.log(selected);
            if (selected.length === 0) {
              return <em>Odaberite Rutu</em>;
            }

            return selected;
          }}
          style={{height:'65px',marginTop:'-10px'}}
          className={classes.textField}
          MenuProps={MenuProps}
        >
          <MenuItem disabled value="">
            <em>Rute</em>
          </MenuItem>
          {names.map(name => (
            <MenuItem key={name} value={name} style={getStyles(name, route,theme)} >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </Grid>
      </Grid>

        </Collapse>
      </div>
      <TextField
       fullWidth
        id="Password"
        label="Password"
        className={classes.textField}
        value={userCopy.Password}
      
        InputProps={{
            className: clsx(classes.whiteColor,classes.textField),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  style={{color:'white'}}
                  edge="end"
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        onChange={handleChangeData}
        margin="normal"
        variant="filled"
        type={values.showPassword ? 'text' : 'password'}

      />
       <FormControl className={classes.formControl}>
        <InputLabel htmlFor="demo-controlled-open-select">Rola</InputLabel>
        <Select
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={userCopy.Rola}
          onChange={handleChange}
          inputProps={{
            className:classes.whiteColor,
            name: 'rola',
            id: 'demo-controlled-open-select',
          }}
        >
          <MenuItem value="Korisnik"><em>Korisnik</em></MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
        </Select>
      </FormControl>
            <br/>
            
        </Typography>
      </CardContent>
     
      <p style={{position:'relative'}} id="message" >
      
        <Fab color="primary" onClick={handleUpdate} className={classes.fab}>
            <Save />
        </Fab>
        <br/>
     </p>
      
    </Card>
    <br/>
    <br/>
    <br/>
    <br/>

                    </Grid>
                    <br/>

            <Grid item xs={12} sm={12} md={6} >
                     <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
        {user.Ime} {user.Prezime}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        Izvještaj po mjesecu
        </Typography>
        <hr/>
        <Typography variant="body2" component="h3">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="center" spacing={4}>
        <Grid container item xs={12} sm={12} md={6}>

        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Datum od"
          value={selectedDateFrom}
          onChange={handleDateChangeFrom}
          InputProps={{
            className: classes.whiteColor
          }}
          KeyboardButtonProps={{
            'aria-label': 'change date',
            className: classes.whiteColor

          }}
        />
        </Grid>
        <Grid container item xs={12} sm={12} md={6}>
        <KeyboardDatePicker
          style={{ color:'white'}}
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Datum do"
          value={selectedDateTo}
          onChange={handleDateChangeTo}
          InputProps={{
            className: classes.whiteColor
          }}
          KeyboardButtonProps={{
            'aria-label': 'change date',
            className: classes.whiteColor

          }}
        />
                </Grid>
                </Grid>
               
                  
        </MuiPickersUtilsProvider>
        </Typography>
        <div onClick={handlePrintPdf} className={classes.hover} style={{marginTop:'15px',float:'left'}}>
                <Description style={{display:'inline-block',fontSize:'35px'}}/>
                <span style={{display:'inline-block',marginTop:'-13px',marginLeft:'2px'}}>Izvjestaj</span>
                </div>
                <div onClick={handlePrintFuel} className={classes.hover} style={{marginTop:'15px',float:'left', marginLeft:'30px'}}>
                <EvStation style={{display:'inline-block',fontSize:'35px'}}/>
                <span style={{display:'inline-block',marginTop:'-13px',marginLeft:'2px'}}>Gorivo</span>
                </div>
                <br/><br/>
      </CardContent>
   
    </Card>
  <div><br/><br/><br/><br/></div>
                    </Grid>
      <Dialog
        fullWidth={true}
        maxWidth={'md'}
        open={openReport}
        onClose={handleClickClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">{"Dnevni izvjestaji"}</DialogTitle>
        <DialogContent   ref={componentRef} id="report" 
>           <Header/>
            <Report data={report} />
        </DialogContent>
        <DialogActions>     
    <ReactToPrint
        trigger={() =><Button color="primary" autoFocus>᪳ Print</Button>}
        content={() => componentRef.current}
      />
          <Button onClick={handleDownloadPdf} color="primary" autoFocus>
          ↓ Download PDF
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth={true}
        maxWidth={'md'}
        open={fuelReportOpen}
        onClose={handleClickCloseFuelReport}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">{"Dnevni izvjestaji"}</DialogTitle>
        <DialogContent   ref={componentRef} id="report" >          
         <Header  matches={true}/>
         <h4>Izvjestaj za {selectedDateFrom.getDate()+'.'+(selectedDateTo.getMonth()+1)+'.'+selectedDateTo.getFullYear()}.  -  {selectedDateTo.getDate()+'.'+(selectedDateFrom.getMonth()+1)+'.'+selectedDateFrom.getFullYear()}.</h4>
         <TextField
       
        id="UkupnaKilometraza"
        label="Ukupna kilometraza"
        className={classes.textField}
        value={fuelReport.UkupnaKilometraza}  
        InputProps={{
            className: classes.textField,
          }}
        margin="normal"
        variant="filled"
      />  
  
        <TextField
       
        id="ProsjecnoGoriva"
        label="Prosjecna potrosnja goriva"
        className={classes.textField}
        value={fuelReport.ProsjecnoGoriva}  
        InputProps={{
            className: classes.textField,
          }}
        placeholder="6.6l"
        onChange={handleChangeFuelData}
        margin="normal"
        variant="filled"
      />   
       <Fab  aria-label={"send"} style={{marginTop:'10px', marginLeft:'20px'}} color="primary">
            <Send/>
          </Fab>
       {
         fuelReport.ProsjecnoGoriva !='' ? <div>
         <span>Količina goriva potrebna da se pređe {fuelReport.UkupnaKilometraza} kilometara:  </span>
         <span style={{borderBottom:'2px solid black', fontWeight:'bold'}}> {fuelReport.UkupnaKilometraza /100 * fuelReport.ProsjecnoGoriva} l</span> 
       </div>    :false
       }  
      <hr/>
      <TextField
        id="UkupnaGoriva"
        label="Ukupna potrosnja goriva za odabrani period"
        style={{width:'20rem'}}
        className={classes.textField}
        value={fuelReport.UkupnoGoriva + " l"}  
        InputProps={{
            className: classes.textField,
          }}
        onChange={handleChangeData}
        margin="normal"
        variant="filled"
      />      
        </DialogContent>
        <DialogActions>     
          <Button onClick={handleClickCloseFuelReport} color="primary">
          Close
          </Button>
        </DialogActions>
      </Dialog>
           </Grid>
    )
}
export default AdminHome;