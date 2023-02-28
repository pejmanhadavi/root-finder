
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
import Autocomplete from '@mui/material/Autocomplete';
import Worker from 'web-worker';



export function SearchForm() {
    const url = new URL('../search-engine-worker.js', import.meta.url);
    const worker = new Worker(url);

    worker.addEventListener('message', e => {
        setVerses(e.data);
        setLoading(false);
        setOpenVerses(true);
    });

    const [formInputData, setFormInputData] = useState({});
    const [openVerses, setOpenVerses] = useState(false);
    const [verses, setVerses] = useState([]);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleBooksAutoCompleteChange = (event, value) => setBooks(value.map(item => item.label));
    const handleCloseVerses = () => {
        setOpenVerses(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const inputData = {
            mainRoots: data.get('mainRoots').split(' '),
            firstIgnoredChars: data.get('firstIgnoredChars') ? data.get('firstIgnoredChars').split(' ') : [],
            lastIgnoredChars: data.get('lastIgnoredChars') ? data.get('lastIgnoredChars').split(' ') : [],
            wordMaxLength: +data.get('maxLength') || 0,
            similarityPercent: +data.get('similarityPercent') || 0,
            shouldStartsWithRoots: data.get('shouldStartsWithRoots') === 'on',
            couldOtherCharsExistBetweenRootsChars: data.get('couldOtherCharsExistBetweenRootsChars') === 'on',
            useSimilarity: data.get('useSimilarity') === 'on',
            usedBooks: books,
        };
        setFormInputData(inputData);
        setLoading(true);
        worker.postMessage(inputData);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                // onChange={handleMainRootsChanges}
                label="Main roots"
                name="mainRoots"
                autoFocus
                helperText="Should not be empty, split multi roots with space"
            />
            {/******
            TODO: Fix margin with a best practice
                */}
            <Autocomplete
                sx={{ mt: "16px", mb: "8px" }}
                multiple
                name="listOfBooks"
                helperText="Incorrect entry."
                options={listOfBooksKeys}
                getOptionLabel={(option) => option.label}
                filterSelectedOptions
                onChange={handleBooksAutoCompleteChange}
                renderInput={(params) => (
                    <TextField
                        helperText="Check list of books at bottom of the form"
                        {...params}
                        label="filter selected books"
                        placeholder="Choose"
                    />
                )}
            />
            <TextField
                margin="normal"
                fullWidth
                name="firstIgnoredChars"
                label="First ignored chars"
                type="text"
                helperText="Split multi ignored chars with space"
            />
            <TextField
                margin="normal"
                fullWidth
                name="lastIgnoredChars"
                label="Last ignored chars"
                type="text"
                helperText="Split multi ignored chars with space"
            />
            <TextField
                margin="normal"
                fullWidth
                name="maxLength"
                label="Max length (without ignored chars)"
                type="number"
                helperText="Should be a number, (Highly recommended)"
            />
            <TextField
                margin="normal"
                fullWidth
                name="similarityPercent"
                label="Similarity percent"
                type="number"
                helperText="Should be a number between 1 and 100 (Not recommended)"
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
                label="Use similarity (Not recommended)"
            />

            <Button
                disabled={loading}
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


const listOfBooksKeys = [
    { label: 'EXO' },
    { label: 'LEV' },
    { label: 'NUM' },
    { label: 'DEU' },
    { label: 'JOS' },
    { label: 'JDG' },
    { label: 'RUT' },
    { label: '1SA' },
    { label: '2SA' },
    { label: '1KI' },
    { label: '2KI' },
    { label: '1CH' },
    { label: '2CH' },
    { label: 'EZR' },
    { label: 'NEH' },
    { label: 'EST' },
    { label: 'JOB' },
    { label: 'PSA' },
    { label: 'PRO' },
    { label: 'ECC' },
    { label: 'SOL' },
    { label: 'ISA' },
    { label: 'JER' },
    { label: 'LAM' },
    { label: 'EZE' },
    { label: 'DAN' },
    { label: 'HOS' },
    { label: 'JOE' },
    { label: 'AMO' },
    { label: 'OBA' },
    { label: 'JON' },
    { label: 'MIC' },
    { label: 'NAH' },
    { label: 'HAB' },
    { label: 'ZEP' },
    { label: 'HAG' },
    { label: 'ZEC' },
    { label: 'MAL' },
    { label: 'MAT' },
    { label: 'MAR' },
    { label: 'LUK' },
    { label: 'JOH' },
    { label: 'QUR' }];