import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import {api} from '../environment/environment';
const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      minWidth: 120,
      maxWidth: 300,
      margin:'0 auto'
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }));
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

  export default function Rute(props) {
    const classes = useStyles();
    const theme = useTheme();
    const {selectedRoute, broj,region}=props;
    const [routes, setRute] = React.useState([]);
    const [personName, setPersonName] = React.useState([]);
    const [selectedRute, setSelectedRoute]=React.useState([]);
   
    function handleChange(event) {
      setSelectedRoute(event.target.value);
    }
  
  const handleData=(id)=>{
      fetch(`${api}/rute/${region}/${id}`).then(x=>x.json()).then(y=>setRute(y));
    }
    return (
        <div className={classes.root}>
            <FormControl className={classes.formControl}  id={broj} onClick={() => handleData(broj)}   >
        <InputLabel htmlFor="select-multiple-checkbox" >Ruta {broj}</InputLabel>
        <Select
          multiple
          name={broj+''}
          value={selectedRute}
          onChange={handleChange}
          input={<Input id="select-multiple-checkbox" />}
          renderValue={selected => selected.join(', ')}
          MenuProps={MenuProps}
          onClick={selectedRoute}
        >
          {routes.map(x => {
                              return <MenuItem key={x.NazivRute} value={x.NazivRute}>
                              <Checkbox  checked={selectedRute.indexOf(x.NazivRute) > -1}  />
                              <ListItemText primary={x.NazivRute} />

                            </MenuItem>
          }
           
           
          )}
           <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
        </Select>
        
      </FormControl>
        </div>
         );
        }