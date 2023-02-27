
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import VersesDiolag from './verses-diolag';
import Box from '@mui/material/Box';
import { ListOfBooks } from './list-of-books-diolog';
import { HowToSearch } from './how-to-search';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Search from '../search-engine';

export function SearchForm() {
    const [formInputData, setFormInputData] = useState({});
    const [openVerses, setOpenVerses] = useState(false);
    const [verses, setVerses] = useState([]);

    const handleCloseVerses = () => {
        setOpenVerses(false);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const inputData = {
            mainRoots: data.get('mainRoots').split(','),
            firstIgnoredChars: data.get('firstIgnoredChars') ? data.get('firstIgnoredChars').split(',') : [],
            lastIgnoredChars: data.get('lastIgnoredChars') ? data.get('lastIgnoredChars').split(',') : [],
            wordMaxLength: +data.get('maxLength') || 0,
            similarityPercent: +data.get('similarityPercent') || 0,
            shouldStartsWithRoots: data.get('shouldStartsWithRoots') === 'on',
            couldOtherCharsExistBetweenRootsChars: data.get('couldOtherCharsExistBetweenRootsChars') === 'on',
            useSimilarity: data.get('useSimilarity') === 'on',
        };
        setFormInputData(inputData);
        const searchResult = Search(inputData);
        setVerses(searchResult);
        setOpenVerses(true);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="text"
                label="Main Roots"
                name="mainRoots"
                autoFocus
            />
            <TextField
                margin="normal"
                fullWidth
                name="firstIgnoredChars"
                label="First ignored chars"
                type="text"
            />
            <TextField
                margin="normal"
                fullWidth
                name="lastIgnoredChars"
                label="Last ignored chars"
                type="text"
            />
            <TextField
                margin="normal"
                fullWidth
                name="maxLength"
                label="Max length (without ignored chars)"
                type="number"
            />
            <TextField
                margin="normal"
                fullWidth
                name="similarityPercent"
                label="Similarity percent"
                type="number"
            />
            <FormControlLabel
                control={<Checkbox name="shouldStartsWithRoots" color="primary" />}
                label="Should starts with roots"
            />
            <FormControlLabel
                control={<Checkbox name="couldOtherCharsExistBetweenRootsChars" color="primary" />}
                label="Could other chars exist between roots chars"
            />

            <FormControlLabel
                control={<Checkbox name="useSimilarity" color="primary" />}
                label="Use similarity (not recommended)"
            />

            <Button
                // onClick={handleClickOpen}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Search
            </Button>
            <VersesDiolag open={openVerses} handleClose={handleCloseVerses} inputData={formInputData} verses={verses} />
            <Grid container>
                <Grid item xs>
                    <HowToSearch />
                </Grid>
                <Grid item>
                    <ListOfBooks />
                </Grid>
            </Grid>
        </Box>
    );
}