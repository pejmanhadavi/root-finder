import { Fragment } from "react";
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/Book';
import Avatar from '@mui/material/Avatar';

export function Header() {
    return (
        <Fragment>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Find words Roots in Holy Books
            </Typography>
        </Fragment>);
}