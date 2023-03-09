import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Box } from '@mui/material';
import reactStringReplace from 'react-string-replace';

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
                        <Typography sx={{ ml: 2, flex: 1 }} component="div">
                            Found <span style={{ fontSize: '1.4rem' }}>{verses.length}</span> Results For:  <span style={{ fontSize: '1.4rem' }}>{inputData?.mainRoots?.join(',')}</span>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <List>
                    {
                        verses.map((item, i) => {
                            return (
                                <Box key={i} sx={{ m: 8 }}>
                                    <p>{item.trueText}</p>
                                    <p>{reactStringReplace(item.translitration, /\{(.*?)\}/, (match, i) => (
                                        <span style={{ color: 'red', fontSize: '1.4rem' }}>{match}</span>
                                    ))}</p>
                                    <p>{reactStringReplace(item.translation, /\{(.*?)\}/, (match, i) => (
                                        <span style={{ color: 'blue', fontSize: '1.4rem' }}>{match}</span>
                                    ))}</p>
                                    <p>{`${item.bookShortKey}, ${item.chapterNumber}, ${item.verseNumber}`}</p>
                                    <Divider />
                                </Box>
                            )
                        })
                    }
                </List>
            </Dialog>
        </div>
    );
}