import { Fragment } from "react";
import Typography from '@mui/material/Typography';
import BookIcon from '@mui/icons-material/Book';
import Avatar from '@mui/material/Avatar';

export function Header() {
    return (
        <Fragment>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <BookIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Find words Roots in Holy Books
            </Typography>
        </Fragment>);
}