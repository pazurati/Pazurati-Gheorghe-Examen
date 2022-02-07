import {useState, useEffect} from 'react';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import {Grid, TextField, Button} from '@material-ui/core';
import {post, put, get} from './Calls.js';
import {virtualshelfRoute} from './ApiRoutes.js';
import { useNavigate, useParams } from 'react-router-dom';

export default function AddVirtualShelf(){

    const [virtualshelf, setVirtualShelf] = useState
    ({
        VirtualShelfDescription: "",
        VirtualShelfDate: "2021-12-01"
    });

    const navigate = useNavigate();
    const routerParams = useParams();
    const id = routerParams.id;

    useEffect(async () => {
        if (!id)
            return;

        let data = await get(virtualshelfRoute, id);
        setVirtualShelf(data);    
    }, [])

     const onChangeVirtualShelf = e => {
         setVirtualShelf({...virtualshelf, [e.target.name]: e.target.value});
     }

    const saveVirtualShelf = async () => {
        if (!id)
            await post(virtualshelfRoute, virtualshelf);
        else
            await put(virtualshelfRoute, id, virtualshelf);
            
        navigate("/");    
    }

    return (
        <div>

            <Grid container spacing={3}>
                <Grid item xs={8} sm={8}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="VirtualShelfDescription"
                        name="VirtualShelfDescription"
                        label="VirtualShelfDescription"
                        fullWidth
                        value={virtualshelf.VirtualShelfDescription}
                        onChange={e => onChangeVirtualShelf(e)}
                        />
                </Grid>

                <Grid item xs={6} sm={4}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="VirtualShelfDate"
                        name="VirtualShelfDate"
                        label="VirtualShelfDate"
                        fullWidth
                        value={virtualshelf.VirtualShelfDate}
                        onChange={e => onChangeVirtualShelf(e)}
                        />
                </Grid>
            </Grid>

            <Button color="secondary" variant='outlined' startIcon={<CancelIcon />}
                onClick={() => {navigate("/")}}
            >
                Cancel
            </Button>  

             <Button color="primary" variant='outlined' startIcon={<SaveIcon />}
                onClick={saveVirtualShelf}
            >
                Save
            </Button>  

        </div>
    )
}