import React, { useEffect, useState } from 'react'
import DataTable from "react-data-table-component";
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Header from '../Component/Header'
import axios from 'axios';
import '../App.css'
import { Button,Modal,Box,TextField } from '@mui/material';
import { toast } from 'react-toastify';


const API_URL = 'https://crudcrud.com/api/8a254cb1cca141068a3b1f65d20018fa/posts';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Dashboard = () => {

  const theme = useTheme();
  const isSxMatch = useMediaQuery(theme.breakpoints.down("xs"));
  const isSmMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const isMdMatch = useMediaQuery(theme.breakpoints.down("md"));
  const isLgMatch = useMediaQuery(theme.breakpoints.down("lg"));
console.log(isLgMatch,'isLgMatch')
console.log(isSmMatch,'isSmMatch')
console.log(isMdMatch,'isMdMatch')
console.log(isSxMatch,"isSxMatch")
    const [emailAdd, setEmailAdd] = useState('');
    const [userName, setUserName] = useState('');
    const [country , setCountry] = useState('');
    const [email, updateEmail] = useState();
    const [userNameU, updateUserName] = useState();
    const [city, updateCity] = useState();
    const [users, setUsers] = useState([]);
    const [users1, setUsers1] = useState();
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
  const handleOpen = () => setOpen(true);
  // const handleOpen1 = () => setOpen1(true);
  const handleClose = () => setOpen(false);
  const handleClose1 = () => setOpen1(false);

    const columns = [
        {
          name: "Email",
          selector: "emailAdd",
          sortable: true
        },
        {
          name: "Username",
          selector: "userName",
          sortable: true
        },
        {
          name: "Country",
          selector: "country",
          sortable: true
        },
        {
          name: ' Update Action',
          cell: (row) => (
            <Button variant='contained' className='my-button ' onClick={() => "handleButtonClick"(row)}>Click me</Button>
          ),
          ignoreRowClick: true,
          allowOverflow: true,
          button: true,
        },
        {
          name: 'Delete Action',
          cell: (row) => (
            <Button variant='contained' onClick={() => "handleButtonClick"(row)}>Click me</Button>
          ),
          ignoreRowClick: true,
          allowOverflow: true,
          button: true,
        },
      ];    
      useEffect(()=>{
        handleGetUser()
      },[])
      
      const handleAddUser = () => {
        const newUser = { emailAdd, userName, country };
        axios.post(API_URL, newUser)
          .then(response => setUsers([...users, response.data]),
           setOpen(false),
           toast.success("Add successfully")
           )
           
          .catch(error => console.log(error));
      };
      const handleGetUser = () => {
        axios.get(API_URL)
          .then(response => setUsers(response.data))
          .catch(error => console.log(error));
      };

      const handleDeleteUser = (id) => {
        axios.delete(`${API_URL}/${id}`)
          .then(response => {
            console.log(response);
            handleGetUser();
            toast.success("Deleted successfully");

          })
          .catch(error => console.log(error));
      };

      const handleUpdateModel = (id) =>{
        setOpen1(true);
        axios.get(`${API_URL}/${id}`)
        .then(response => {
          setUsers1(response.data._id)
          updateEmail(response.data.emailAdd)
          updateUserName(response.data.userName)
          updateCity(response.data.country)
          console.log(response);
        })
        .catch(error => console.log(error));
      }

      console.log(users1,"USERS22")
      const handleUpdateUsers = (data) => {
        const updateUser = { emailAdd: email, userName: userNameU, country: city }
          axios.put(`${API_URL}/${data}`, updateUser)
            .then(response => {
              console.log(response);
              handleClose1();
              handleGetUser();
              toast.success("updated successfully");
            })
            .catch(error => console.log(error));
        };
      
      
      console.log(users,"mapResponse")
    return(
        <>
        <Header />
        <h1>Dashboard</h1>
        <Button variant="contained" sx={{float: "inline-end"}} onClick={handleOpen}>Add</Button>
        <Box sx={{ minWidth: isLgMatch ? '200px' : '650px'}}>

        {/* <DataTable
        columns={columns}
        data={users}
        pagination
        highlightOnHover
        striped
      /> */}

<TableContainer component={Paper}>
      <Table  >
        <TableHead>
          <TableRow>
            <TableCell align='center'>S.No</TableCell>
            <TableCell align='center'>Email</TableCell>
            <TableCell align="center">Username</TableCell>
            <TableCell align="center">Country</TableCell>
            <TableCell align="center">Update Action</TableCell>
            <TableCell align="center">Delete Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((row,index) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell component="th" scope="row" align='center'>
                {row.emailAdd}
              </TableCell>
              <TableCell align="center">{row.userName}</TableCell>
              <TableCell align="center">{row.country}</TableCell>
              <TableCell align="center"><Button variant='contained' color='success' onClick={()=>handleUpdateModel(row._id)}>Update</Button></TableCell>
              <TableCell align="center"><Button variant='contained' color='error' onClick={()=> handleDeleteUser(row._id)}>Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Box>
          <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e)=> setEmailAdd(e.target.value)}
            />
           <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="UserName"
              name="userName"
              autoComplete="userName"
              autoFocus
              onChange={(e)=> setUserName(e.target.value) }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="city"
              label="City"
              name="city"
              autoComplete="city"
              autoFocus
              onChange={(e)=> setCountry(e.target.value) }
            />
            <Button variant='contained' sx={{margin:" 0px 0px 0px 156px"}} onClick={handleAddUser}>Add</Button>
        </Box>
      </Modal>     

      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e)=>{updateEmail(e.target.value)}}
                          />
           <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="UserName"
              name="userName"
              autoComplete="userName"
              autoFocus
              value={userNameU}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e)=>{updateUserName(e.target.value)}}

            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="city"
              label="City"
              name="city"
              autoComplete="city"
              autoFocus
              value={city}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e)=>{updateCity(e.target.value)}}

                          />
            <Button variant='contained' sx={{margin:" 0px 0px 0px 156px"}} onClick={()=>handleUpdateUsers(users1)}>update</Button>
        </Box>
      </Modal>     
        </>
    )
}
export default Dashboard



