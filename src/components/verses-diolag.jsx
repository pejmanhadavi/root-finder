import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ open, handleClose, verses, inputData }) {

    return (
        <div>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Found {verses.length} Results
                        </Typography>
                    </Toolbar>
                </AppBar>
                {/* <Box
                    sx={{
                        '& .MuiTextField-root': { mt: 4, ml: 1, mr: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField
                            disabled
                            label="Main roots"
                            defaultValue={inputData.mainRoots?.length ? inputData.mainRoots : 'Not Set'}
                        />
                        <TextField
                            disabled
                            label="First ignored chars"
                            defaultValue={inputData.firstIgnoredChars?.length ? inputData.firstIgnoredChars : 'Not set'}
                        />
                        <TextField
                            disabled
                            label="Last ignored chars"
                            defaultValue={inputData.lastIgnoredChars?.length ? inputData.lastIgnoredChars : 'Not set'}
                        />
                        <TextField
                            disabled
                            label="Max length"
                            defaultValue={inputData.wordMaxLength || 'Not set'}
                        />
                        <TextField
                            disabled
                            label="Similarity percent"
                            defaultValue={inputData.similarityPercent || 'Not set'}
                        />
                        <TextField
                            disabled
                            label="Should starts withRoots"
                            defaultValue={inputData.shouldStartsWithRoots ? 'On' : 'Off'}
                        />
                        <TextField
                            disabled
                            label="Could other chars exst"
                            defaultValue={inputData.couldOtherCharsExistBetweenRootsChars ? 'On' : 'Off'}
                        />
                        <TextField
                            disabled
                            label="Use similarity"
                            defaultValue={inputData.useSimilarity ? 'On' : 'Off'}
                        />
                    </div>
                </Box> */}
                <List>
                    {
                        verses.map(item => {
                            const address = item.substring(0, 16);
                            const verse = item.substring(16, item.length);
                            const firstPartOfVerse = verse.substring(0, verse.indexOf('{'));
                            const foundWord = verse.substring(verse.indexOf('{') + 1, verse.indexOf('}'));
                            const lastPartOfVerse = verse.substring(verse.indexOf('}') + 1, verse.length);
                            return (
                                <React.Fragment dir="rtl">
                                    <ListItem>
                                        <ListItemText primary={<span>{firstPartOfVerse}<span style={{color: 'red', fontSize: '1.4rem'}}>{foundWord}</span>{lastPartOfVerse}</span>} secondary={address} />
                                    </ListItem>
                                    <Divider />
                                </React.Fragment>
                            )
                        })
                    }
                </List>
            </Dialog>
        </div>
    );
}