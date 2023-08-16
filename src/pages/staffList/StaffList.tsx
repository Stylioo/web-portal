import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import "../../styles/staffList/staffList.css";

// address_line_1
// : 
// null
// address_line_2
// : 
// null
// city
// : 
// null
// contact_no
// : 
// null
// district
// : 
// null
// email
// : 
// "ruwandi@gmail.com"
// first_name
// : 
// "Ruwandi"
// last_name
// : 
// "Mayunika"
// password
// : 
// "$2b$10$pl1GX8i6R/M1/3AAFrCV6eJA4I8HFUegKZwVPJcekfDdB39Jc5mmq"
// role
// : 
// "RECEPTIONIST"
// uid
// : 
// "2058cade-b90a-44ec-8748-dae14834dc0b"

type employeeType = {
  address_line_1?: string,
  address_line_2?: string,
  city?: string,
  contact_no?: string,
  district?: string,
  email: string,
  first_name: string,
  last_name: string,
  password?: string,
  role: string,
  doj?: string,
  gender?: string,
  uid: string
}

function createData(
  name: string,
  contact: string,
  email: string,
  address: string,
  gender: string,
  doj: string,
  role: string,
  action: string,

) {
  return { name, contact, email, address, gender, doj, role, action };
}

// const rows = [
//   createData('Chirasi Amaya', '0711234567', 'chirasi@gmail.com', 'No/22,Araliya Road, Nugegoda, Colombo', 'Female', '2023/07/10', 'Beautician', 'vghsds'),
//   createData('Dasuni Dewani', '0716791207', 'dasuni@gmail.com', 'No/976,Melder Road, Nugegoda, Kirulapana', 'Female', '2022/10/06', 'Beautician', 'vghsds'),
//   createData('Ruwandi Mayunika', '0756781342', 'ruwandi@gmail.com', 'No/11,Ananda Road, Nugegoda, Navinna', 'Female', '2022/04/10', 'Beautician', 'vghsds'),
//   createData('Oshadee Dilthara', '0710986524', 'oshadee@gmail.com', 'No/27,Nalandarama Road, Kohuwala, Colombo', 'Female', '2021/08/10', 'Beautician', 'vghsds'),
//   createData('Nipuni Krishnajina', '0774151897', 'nipuni@gmail.com', 'No/687,Kadduwa Road, Dickwella, Matara', 'Female', '2021/05/21', 'Beautician', 'vghsds'),
//   createData('Kasuni Jayasinghe', '0762459913', 'kasuni@gmail.com', 'No/45,Hiriketiya Road, Delkanda Colombo', 'Female', '2021/05/21', 'Beautician', 'vghsds'),
//   createData('Pabasara Samarasinghe', '0774151460', 'pabasara@gmail.com', 'No/07,Samagi Road, Nilwella, Matara', 'Female', '2021/05/21', 'Receptionist', 'vghsds'),
//   createData('Janith Madarasinghe', '0715458769', 'janith@gmail.com', 'No/34,Ramaniya Road, Nugegoda, Colombo', 'Male', '2021/05/21', 'Manager', 'vghsds'),

// ];

function StaffList() {
  const [selectedValue, setSelectedValue] = React.useState("5")
  const [searchValue, setSearchValue] = React.useState("")

  const [employees, setEmployees] = useState<employeeType[]>([])

  const getEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5400/employee")
      if (response.data.success) {
        setEmployees(response.data.data)
      }

      console.log(response.data.data);

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getEmployees()
  }, [])

  return (
    <div>
      <h2 style={{ marginBottom: '15px' }}>Staff List</h2>
      <div className="header_container">
        <p>Create, edit and manage Staff list</p>

        <div>
          <Link to="../addEmployee">
            <button className="primary_button" >Add</button>
          </Link>
        </div>
      </div>

      <div className="search_container" style={{ marginBottom: '15px' }}>
        <div>
          <div className="show_container">
            <p>Show</p>
            <select value={selectedValue}
              onChange={(e) => {
                setSelectedValue(e.target.value);
              }}
              className="selectbox_container"
            >
              <option value="">5</option>
              <option value="option1">10</option>
              <option value="option2">25</option>
              <option value="option3">50</option>
            </select>
          </div>
        </div>


        <input
          type="text"
          value={searchValue}
          onChange={(e) => {
            e.preventDefault()
            setSearchValue(e.target.value)
          }}
          placeholder="Search..."
          className="searchbar"
        />
      </div>


      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow style={{
              backgroundColor: '#999999'
            }}>
              <TableCell>Name</TableCell>
              <TableCell align="left">Contact </TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left">Gender</TableCell>
              <TableCell align="left">Date of Joining</TableCell>
              <TableCell align="left">Role</TableCell>
              <TableCell align="left">Action</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((row) => (
              <TableRow
                key={row.uid}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.first_name} {row.last_name}
                </TableCell>
                <TableCell align="left">{row.contact_no}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.address_line_1}<br></br>{row.address_line_2}</TableCell>
                <TableCell align="left">{row?.gender}</TableCell>
                <TableCell align="left">{row?.doj}</TableCell>
                <TableCell align="left">{row.role}</TableCell>
                <TableCell width='120px' align="left">
                  <IconButton aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}


export default StaffList