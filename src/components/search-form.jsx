
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import VersesDiolag from './verses-diolag';
import Box from '@mui/material/Box';

export function SearchForm() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get('main-roots'),
        });
      };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="text"
                label="Main Roots"
                name="main-roots"
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
                control={<Checkbox value="shouldStartsWithRoots" color="primary" />}
                label="Should starts with roots"
            />
            <FormControlLabel
                control={<Checkbox value="couldOtherCharsExistBetweenRootsChars" color="primary" />}
                label="Could other chars exist between roots chars"
            />

            <FormControlLabel
                control={<Checkbox value="useSimilarity" color="primary" />}
                label="Use similarity (not recommended)"
            />
            
            <VersesDiolag/>
            <Grid container>
                <Grid item xs>
                    <Link href="#" variant="body2">
                        Don't know how to search?
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="#" variant="body2">
                        List of holy books
                    </Link>
                </Grid>
            </Grid>
        </Box>
    );
}