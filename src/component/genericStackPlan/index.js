import React from 'react';
import { TextField, Checkbox } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';

const GenericStackPlan = ({ rows, setRows }) => {
  // Handle row updates, especially for `assignedBags` when editing
  const handleProcessRowUpdate = (newRow) => {
    const updatedRows = rows.map((row) => 
      row.id === newRow.id ? { ...row, assignedBags: newRow.assignedBags } : row
    );
    setRows(updatedRows);
    return newRow;
  };

  // Define columns with the specific headers
  const columns = [
    { field: 'serialNumber', headerName: 'S.No.', width: 100 },
    { field: 'shed', headerName: 'Shed', width: 150 },
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

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        processRowUpdate={handleProcessRowUpdate}
        experimentalFeatures={{ newEditingApi: true }} // Enable new editing API
        disableSelectionOnClick 
        disableRowSelectionOnClick
      />

    </div>
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
