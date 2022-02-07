import {useState, useEffect} from 'react';
import {get, remove} from './Calls.js';
import {Button, Paper, Table, TableBody, TableCell, TableRow, TableContainer, TableHead, IconButton} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SendSharpIcon from '@material-ui/icons/SendSharp';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import BookIcon from '@material-ui/icons/Book';
import {virtualshelfRoute} from './ApiRoutes.js';
import { useNavigate } from 'react-router-dom';
import './VirtualShelfList.css';


export default function VirtualShelfList(){
    
    const [rows, setRows] = useState([]);
    const [needUpdate, setNeedUpdate] = useState(false);
    const navigate = useNavigate();

    useEffect(async () => {
        let data = await get(virtualshelfRoute);
        setRows(data);
    }, [needUpdate]);

    const deleteVirtualShelf = async(id, index) => {
        await remove(virtualshelfRoute, id);

        rows.splice(index, 1);
        setRows(rows);
        setNeedUpdate(!needUpdate);
        alert("Virtual Shelf id:" + id + " s-a sters cu succes!")
    }

    return(
        <div className='container'>

            <h1>VirtualShelf Exam</h1> <br></br>
            <h2>See your shelfs, add one, edit and delete.</h2>

            <br/>
    
                     <div>
                          <Button
                           variant='contained'
                            color="secondary"
                         startIcon={<AddIcon />}
                         onClick={() => {navigate("AddVirtualShelf")}}
                             >
                              Adauga un Virtual Shelf
                      </Button>
                     </div>

                     <br></br>
                     <div>
                          <Button
                          variant='contained'
                          color="inherit"
                           id = 'export'
                         startIcon={<SendSharpIcon />}
                         
                             >
                              Import
                      </Button>
                     </div>

                     <br></br>
                     <div>
                          <Button
                          variant='contained'
                          color="inherit"
                           id= 'import'
                         startIcon={<ImportExportIcon />}
                         
                             >
                              Export
                      </Button>
                     </div>

                     <br></br>
                     <br></br>


            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">VirtualShelf Id</TableCell>
                            <TableCell align="center">VirtualShelf Description</TableCell>
                            <TableCell align="center">VirtualShelf Date</TableCell>
                            <TableCell align="center">Books</TableCell>
                            <TableCell align="center">Edit sau Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={row.VirtualShelfId}>
                                <TableCell component="th" scope="row" align="center">
                                    {row.VirtualShelfId}
                                </TableCell>
                                <TableCell align='center'>{row.VirtualShelfDescription}</TableCell>
                                <TableCell align='center'>{row.VirtualShelfDate}</TableCell>
                                <TableCell align='center'>
                                    <IconButton onClick={() => navigate(`/AddBook/${row.VirtualShelfId}`)}>
                                        <BookIcon color="secondary" />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => navigate(`/AddVirtualShelf/${row.VirtualShelfId}`)}>
                                        <EditIcon color="inherit" />
                                    </IconButton>
                                    <IconButton onClick={() => deleteVirtualShelf(row.VirtualShelfId, index)}>
                                        <DeleteIcon color="secondary" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
           
        </div>
    )
}