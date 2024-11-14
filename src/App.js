import './App.css';
import Button from '@mui/material/Button';
import { useState,useEffect } from 'react';
import GenericStackPlan from './component/genericStackPlan';
function App() {
  const [rows, setRows] = useState([
    // Your initial rows data
    { id: 1, serialNumber: 1, shed: 'A', stack: 'S1', bagType: 'Type 1', availableSpace: 10, assignedBags: 5, checkbox: true },
    { id: 2, serialNumber: 2, shed: 'B', stack: 'S2', bagType: 'Type 2', availableSpace: 20, assignedBags: null, checkbox: false },
    // Add more rows as needed
  ]);
  useEffect(()=>{
   console.log(rows)
  },[rows])

  return (
    <GenericStackPlan rows={rows} setRows={setRows} />
  );
}

export default App;
