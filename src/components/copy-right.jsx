import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://pejmanhadavi.github.io/root-finder/">
        https://pejmanhadavi.github.io/root-finder/
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}