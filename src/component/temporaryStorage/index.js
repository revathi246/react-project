import React, { useEffect, useState } from 'react';

import {Add as AddIcon} from '@mui/icons-material';
import { TextField, Checkbox, Select, MenuItem ,Box ,FormGroup,FormControlLabel, Button} from '@mui/material';
import { DataGrid, GridToolbarExport, GridToolbarQuickFilter, GridToolbarDensitySelector ,GridFooterContainer } from '@mui/x-data-grid';
import PropTypes from 'prop-types';


const GenericTemporaryStorage = () =>{
    const [locationDescription ,setLocationDescription] = useState("");
    const [comment ,setComment] =useState("");
    const [rows, setRows] = useState([
      {
        id: 1,
        shed: "Shed A",
        storageType: "Gangway",
        assignBags: 200,
        capacity: 100,
        maxBags: 2000,
        lead: 10,
        bagsPerLayer: 200,
      },
     
    ]);
    useEffect(()=>{
      console.log(rows);
    },[rows]);
    const handleEdit = (id, field, value) => {
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === id ? { ...row, [field]: value } : row
          )
        );
      };

    const Toolbar = () =>{
        return (
            <Box style={{ display: 'flex', gap: '30px', padding: '8px' }}>

        <GridToolbarDensitySelector />
        <GridToolbarExport/>
        
        <Button startIcon={<AddIcon />} 
        // onClick={handleClickOpen}
         >
                Add
        </Button>
        <GridToolbarQuickFilter
            placeholder="Search..."
            variant="outlined"
            size="small"
            // style={{ marginRight: "16px" }}
            />

        </Box>
        )
        }
    const CustomFooter = () => (
    <GridFooterContainer
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 1,
        borderTop: "1px solid #ccc",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          padding: 1,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <TextField
          label="Location Description"
          variant="outlined"
          size="small"
          fullWidth
          multiline
          rows={2}
          value={locationDescription}
          onChange={(e) => setLocationDescription(e.target.value)}
        />
        <TextField
          label="Comment"
          variant="outlined"
          size="small"
          fullWidth
          multiline
          rows={2}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Box>
    </GridFooterContainer>
  );

      
        const storageColumns = [
          {
            field: "shed",
            headerName: "Shed",
            width: 150,
            renderCell: (params) => (
              <Select
                value={params.row.shed}
                onChange={(e) => handleEdit(params.row.id, "shed", e.target.value)}
                variant="outlined"
                size="small"
                fullWidth
              >
                <MenuItem value="Shed A">Shed A</MenuItem>
                <MenuItem value="Shed B">Shed B</MenuItem>
                <MenuItem value="Shed C">Shed C</MenuItem>
              </Select>
            ),
          },
          {
            field: "storageType",
            headerName: "Storage Type",
            width: 200,
            renderCell: (params) => (
              <Select
                value={params.row.storageType}
                onChange={(e) =>
                  handleEdit(params.row.id, "storageType", e.target.value)
                }
                variant="outlined"
                size="small"
                fullWidth
              >
                <MenuItem value="Gangway">Gangway</MenuItem>
                <MenuItem value="Warehouse">Warehouse</MenuItem>
                <MenuItem value="Outdoor">Outdoor</MenuItem>
              </Select>
            ),
          },
            {
              field: "assignBags",
              headerName: "Assign Bags",
              width: 150,
              renderCell: (params) => (
                <TextField
                  variant="outlined"
                  size="small"
                  value={params.row.assignBags}
                  onChange={(e) =>
                    handleEdit(params.row.id, "assignBags", e.target.value)
                  }
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
              field: "capacity",
              headerName: "Capacity (MTons)",
              width: 180,
              renderCell: (params) => (
                <TextField
                  variant="outlined"
                  size="small"
                  value={params.row.capacity}
                  onChange={(e) =>
                    handleEdit(params.row.id, "capacity", e.target.value)
                  }
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
              field: "maxBags",
              headerName: "Max Bags",
              width: 150,
              renderCell: (params) => (
                <TextField
                  variant="outlined"
                  size="small"
                  value={params.row.maxBags}
                  onChange={(e) =>
                    handleEdit(params.row.id, "maxBags", e.target.value)
                  }
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
              field: "lead",
              headerName: "Lead",
              width: 120,
              renderCell: (params) => (
                <TextField
                  variant="outlined"
                  size="small"
                  value={params.row.lead}
                  onChange={(e) =>
                    handleEdit(params.row.id, "lead", e.target.value)
                  }
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
              field: "bagsPerLayer",
              headerName: "Bags Per Layer",
              width: 200,
              renderCell: (params) => (
                <TextField
                  variant="outlined"
                  size="small"
                  value={params.row.bagsPerLayer}
                  onChange={(e) =>
                    handleEdit(params.row.id, "bagsPerLayer", e.target.value)
                  }
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
          ];

    return (
        <DataGrid
            rows={rows}
            columns={storageColumns}
            pageSize={10}
            pageSizeOptions={[10, 25, 50, 100]} 
            disableSelectionOnClick
            disableRowSelectionOnClick
            disableColumnMenu
            slots={{
            toolbar: Toolbar,
           // footer: CustomFooter, 

            }}


            
        />
    )
}

export default GenericTemporaryStorage ;