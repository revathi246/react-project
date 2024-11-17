import React, { useEffect, useState } from 'react';

import {Add as AddIcon} from '@mui/icons-material';
import { TextField, Checkbox, Select, MenuItem ,Box ,FormGroup,FormControlLabel, Button ,Dialog ,DialogTitle, Divider  ,DialogContent ,DialogContentText, Typography, DialogActions} from '@mui/material';
import { DataGrid, GridToolbarExport, GridToolbarQuickFilter, GridToolbarDensitySelector } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import GenericTemporaryStorage from '../temporaryStorage';

const GenericStackPlan = ({ rows, setRows }) => {
  const [shedFilter, setShedFilter] = useState("All Sheds");
  const [shedOptions, setShedOptions] = useState(["All Sheds"]);
  const [addShedOptions ,setAddShedOptions] =useState(["RailHead Storage" ,"1" ,"2"]) ;
  const [addSelectedShed, setAddSelectedShed] = useState("RailHead Storage");
  const [addStackOptions, setAddStackOptions] = useState(["RAH12", "RAH13", "RAH14"]); // Default for "RailHead Storage"
  const [addSelectedStack, setAddSelectedStack] = useState("RAH12");
  const [open, setOpen] = useState(false);
  const [checked ,setChecked] =useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleButtonClose = () => {
    setOpen(false);
  
    const matchingRows = rows.filter((row) => row.shed === addSelectedShed);

    if (matchingRows.length > 0) {
      const highestSerialNumber = Math.max(...matchingRows.map((row) => row.serialNumber));
      const newSerialNumber = highestSerialNumber + 1;
      const newRow = { 
      id: rows.length + 1, serialNumber: newSerialNumber, shed: addSelectedShed,   stack: addSelectedStack,  bagType: '',  availableSpace: '', assignedBags: 0, checkbox: false,
      };
      const updatedRows = rows.filter((row) => row.shed === addSelectedShed);
      setRows([...updatedRows, newRow]);
    } else {    
      const newRow = {
        id: rows.length + 1,  serialNumber: rows.length + 1,   shed: addSelectedShed,   stack: addSelectedStack,    bagType: '',availableSpace: '',  assignedBags: 0,  checkbox: false,
      };
      setRows([ newRow]);
    }
  };
  
  useEffect(() => {
    const uniqueSheds = Array.from(new Set(rows.map(row => row.shed)));
    setShedOptions(["All Sheds", ...uniqueSheds]);
  }, [rows]); 

  console.log(shedOptions);
  // Handle row updates, especially for `assignedBags` when editing
  const handleProcessRowUpdate = (newRow) => {
    const updatedRows = rows.map((row) =>
      row.id === newRow.id ? { ...row, assignedBags: newRow.assignedBags } : row
    );
    setRows(updatedRows);
    return newRow;
  };

  // shed handle change
  const handleShedFilterChange = (event) => {
    setShedFilter(event.target.value);
  };

  //dialog add shed 
  const handleAddShedChange = (e) => {
    const selectedShed = e.target.value;
    setAddSelectedShed(selectedShed);

    // Update the related stack options based on selected shed
    if (selectedShed === "RailHead Storage") {
      setAddStackOptions(["RAH12", "RAH13", "RAH14"]); // Stack options for RailHead Storage
      setAddSelectedStack("RAH12"); // Default stack for RailHead Storage

    } else if (selectedShed === "1") {
      setAddStackOptions(["1A", "1B", "1C"]);
      setAddSelectedStack("1A"); 

    } else if (selectedShed === "2") {
      setAddStackOptions(["2A", "2B", "2C"]); 
      setAddSelectedStack("2A");
    }
  };
  const handleAddStackChange =(e) =>{
    setAddSelectedStack(e.target.value) ;
  }
  const handleCheckboxChange =(e) =>{
    console.log(e.target.checked)
    setChecked(e.target.checked);
  }
  // Filtering rows for shed selction
  const filteredRows = shedFilter === "All Sheds"
    ? rows
    : rows.filter((row) => row.shed === shedFilter);

  const columns = [
    { field: 'serialNumber', headerName: 'S.No.', width: 100 },
    {
      field: 'shed',
      headerName: 'Shed',
      width: 150,
      renderHeader: () => (
        <>
          {/* <InputLabel>Shed</InputLabel> */}
          <Select
            value={shedFilter}
            onChange={handleShedFilterChange}
            variant="outlined"
            size="small"
            style={{ width: '100%' }}
          >
            {shedOptions.map((option)=>(
               <MenuItem key={option} value={option}>
                {option}
                </MenuItem>
            ))}

          </Select>
        </>
      ),
    },
    { field: 'stack', headerName: 'Stack', width: 150 },
    { field: 'bagType', headerName: 'Bag Type', width: 150 },
    { field: 'availableSpace', headerName: 'Available Space (Bags)', width: 200 },
    {
      field: 'assignedBags',
      headerName: 'Assigned Bags',
      width: 200,
      editable: true, // Allow editing in general
      renderCell: (params) => (
        <TextField
          type="number"
          value={params.value || ''}
          onChange={(e) => {
            const value = e.target.value ? Number(e.target.value) : 0;
            params.api.setEditCellValue({ id: params.id, field: 'assignedBags', value });
          }}
          variant="outlined"
          size="small"
          inputProps={{
            style: {
              textAlign: 'center',
              padding: '4px',
              backgroundColor: 'white',
            },
          }}
          disabled={!params.row.checkbox} // Disable field if checkbox is false
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      ),
    },
    {
      field: 'checkbox',
      headerName: '',
      width: 100,
      renderCell: (params) => (
        <Checkbox
          checked={params.row.checkbox || false}
          onChange={(e) => {
            const newRows = rows.map((row) => {
              if (row.id === params.id) {
                // If unchecked, reset the assignedBags field to an empty string
                return {
                  ...row,
                  checkbox: e.target.checked,
                  assignedBags: e.target.checked ? row.assignedBags : null 
                };
              }
              return row;
            });
            setRows(newRows); // Update the rows in the parent component
          }}
          color="primary"
        />
      ),
    },
  ];

  const CustomToolbar = () => {
    return (
     <>
      <Box style={{ display: 'flex', gap: '10px', padding: '8px' }}>

      <GridToolbarDensitySelector />
      <GridToolbarExport/>
      <GridToolbarQuickFilter
          placeholder="Search..."
          variant="outlined"
          size="small"
          // style={{ marginRight: "16px" }}
        />

      </Box>
      <Box style={{ display: 'flex', gap: '10px', padding: '8px' }}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox 
              // checked={gilad} onChange={handleChange} 
              name="gilad" />
            }
            label="All Bag Type Stacks"
          />
        </FormGroup>
          <Button startIcon={<AddIcon />}  onClick={handleClickOpen}>
          Add Other Stack
          </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: {
              backgroundColor: '#fff',
              width: '600px'
            },
          }}
          sx={{
            "& .MuiDialog-container": {
              alignItems: "flex-start",
            }
          }}
          >
            <DialogTitle id="alert-dialog-title">
              Add Stack
            </DialogTitle>
            <Divider />
            <DialogContent>
              <Box display="flex" alignItems="center" justifyContent="space-evenly">
                <Typography variant='subtitle1' >Shed</Typography>
                <Select value={addSelectedShed} onChange={handleAddShedChange}>
                  {addShedOptions.map((option)=>(
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
                <Typography variant='subtitle1' >Stack</Typography>
                <Select value={addSelectedStack} onChange={handleAddStackChange}>
                  {addStackOptions.map((option)=>(
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </Box>
            </DialogContent>
            <Divider/>
            <DialogActions>
              <Button onClick={handleButtonClose}  variant="contained">
                Add stack
              </Button>
            </DialogActions>
          </Dialog>
      </Box>
     </>
      
    );
  };

 
  return (
    <>
    <div style={{ height: 400,  width: '100%' }}>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        pageSize={10}
        processRowUpdate={handleProcessRowUpdate}
        pageSizeOptions={[10, 25, 50, 100]} // Available pagination options
        experimentalFeatures={{ newEditingApi: true }} // Enable new editing API
        disableSelectionOnClick
        disableRowSelectionOnClick
        disableColumnMenu
        slots={{
          toolbar: CustomToolbar,
        }}
      />

    </div>
    <div>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={handleCheckboxChange}
            // color="primary" 
          />
        }
        label="Create Temporary Storage"
      />
      {checked &&
        <GenericTemporaryStorage></GenericTemporaryStorage>
      }
    </div>
    </>
    

  );
};

GenericStackPlan.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      serialNumber: PropTypes.number.isRequired,
      shed: PropTypes.string.isRequired,
      stack: PropTypes.string.isRequired,
      bagType: PropTypes.string.isRequired,
      availableSpace: PropTypes.number.isRequired,
      assignedBags: PropTypes.oneOfType([PropTypes.number, PropTypes.any]),  // Allow both number and null
      checkbox: PropTypes.bool, // Checkbox field to control editability
    })
  ).isRequired,
  setRows: PropTypes.func.isRequired, // Function to update rows
};

export default GenericStackPlan;