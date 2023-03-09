import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Box, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import reactStringReplace from 'react-string-replace';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ open, handleClose, verses, inputData }) {
    const copiedVerses = [];

    const handleCheckBoxOnChange = (e) => {
        if (e.target.checked) {
            copiedVerses.push(e.target.value)
        } else {
            if (copiedVerses.includes(e.target.value)) {
                removeItemOnce(copiedVerses, e.target.value);
            }
        }
        navigator.clipboard.writeText(copiedVerses)
    };

    function removeItemOnce(arr, value) {
        var index = arr.indexOf(value);
        if (index > -1) {
          arr.splice(index, 1);
        }
        return arr;
      }

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
                            Found <span style={{ fontSize: '1.4rem' }}>{verses.length}</span> Results
                        </Typography>
                    </Toolbar>
                </AppBar>
                <FormGroup>
                    {
                        verses.map((item, i) => {
                            return (
                                <Box key={i} sx={{ m: 1 }}>
                                        <p>{item.trueText}</p>
                                        <p>{reactStringReplace(item.translitration, /\{(.*?)\}/, (match, i) => (
                                            <span style={{ color: 'red', fontSize: '1.4rem' }}>{match}</span>
                                            ))}</p>
                                        <p>{reactStringReplace(item.translation, /\{(.*?)\}/, (match, i) => (
                                            <span style={{ color: 'blue', fontSize: '1.4rem' }}>{match}</span>
                                        ))}</p>

                                    <FormControlLabel control={<Checkbox 
                                    label={'حثتپشد حثتپشد'}
                                    value={`
${item.trueText}
${item.translitration}
${item.translation}
${item.bookShortKey}, ${item.chapterNumber}, ${item.verseNumber}
                                        `}
                                    onChange={handleCheckBoxOnChange}
                                    />} label={`${item.bookShortKey}, ${item.chapterNumber}, ${item.verseNumber}`}/>
                                    <Divider />
                                </Box>
                            )
                        })
                    }
                </FormGroup>
            </Dialog>
        </div>
    );
}