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
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ open, handleClose, verses, inputData }) {
    console.log(verses);
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
                        <Typography sx={{ ml: 2, flex: 1 }} component="div">
                            Found <span style={{fontSize: '1.4rem'}}>{verses.length}</span> Results For:  <span style={{fontSize: '1.4rem'}}>{inputData?.mainRoots?.join(',')}</span>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <List>
                    {
                        verses.map(item => {
                            const verse = item.translitration;
                            const firstPartOfVerse = verse.substring(0, verse.indexOf('{'));
                            const foundWord = verse.substring(verse.indexOf('{') + 1, verse.indexOf('}'));
                            const lastPartOfVerse = verse.substring(verse.indexOf('}') + 1, verse.length);
                            return (
                                <React.Fragment>
                                    <ListItem>
                                        <ListItemText primary={<span>{firstPartOfVerse}<span style={{color: 'red', fontSize: '1.4rem'}}>{foundWord}</span>{lastPartOfVerse}</span>} secondary={item.address} />
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