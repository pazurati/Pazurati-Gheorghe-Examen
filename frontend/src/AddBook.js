import {useState, useEffect} from 'react';
import {get, remove} from './Calls.js';
import {Button, Paper, Table, TableBody, TableCell, TableRow, TableContainer, TableHead, IconButton} from '@material-ui/core';
import ArrowBackIosTwoToneIcon from '@material-ui/icons/ArrowBackIosTwoTone';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {bookRoute} from './ApiRoutes.js';
import { useNavigate } from 'react-router-dom';



export default function BookList(){
    
    const [rows, setRows] = useState([]);
    const [needUpdate, setNeedUpdate] = useState(false);
    const navigate = useNavigate();

    useEffect(async () => {
        let data = await get(bookRoute);
        setRows(data);
    }, [needUpdate]);

    const deleteBook = async(id, index) => {
        await remove(bookRoute, id);

        rows.splice(index, 1);
        setRows(rows);
        setNeedUpdate(!needUpdate);
        alert("Book id:" + id + " s-a sters cu succes!")
    }

    return(
        <div>

            <br/>
            <br/>
           <div>
                          <Button
                           variant='contained'
                            color="secondary"
                         startIcon={<ArrowBackIosTwoToneIcon />}
                         onClick={() => {navigate("/")}}
                             >
                              Mergi inapoi la Virtual Shelf
                      </Button>
                     </div>

            <br/>
            
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Book Id</TableCell>
                            <TableCell align="center">Book Title</TableCell>
                            <TableCell align="center">Book Genre</TableCell>
                            <TableCell align="center">Book URL</TableCell>
                        
                            <TableCell align="center">Edit sau Sterge</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={row.BookId}>
                                <TableCell component="th" scope="row" align="center">
                                    {row.BookId}
                                </TableCell>
                                <TableCell align='center'>{row.BookTitle}</TableCell>
                                <TableCell align='center'>{row.BookGen}</TableCell>
                                <TableCell align='center'>{row.BookURL}</TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => navigate(`/AddBook/${row.BookId}`)}>
                                        <EditIcon color="inherit" />
                                    </IconButton>
                                    <IconButton onClick={() => deleteBook(row.BookId, index)}>
                                        <DeleteIcon color="secondary" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
            <br></br>
                    

        </div>
    )
}