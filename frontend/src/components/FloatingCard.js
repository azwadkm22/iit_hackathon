import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';
import zIndex from '@material-ui/core/styles/zIndex';


const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    top: theme.spacing(10), // moved a little down
    right: theme.spacing(5), // moved a little left
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function FloatingCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const rows = [



{city: 'Good', color: '#9cd84e'},    
    { city: 'Moderate', color: '#facf39' },    
    { city: 'Unhealthy for sensitive groups', color: '#f99049' },
    { city: 'Unhealthy', color: '#facf39' },
    { city: 'Very unhealthy', color: '#a070b6' },
    { city: 'Hazardous', color: '#a06a7b' },
    // Add more cities and colors as needed
  ];

  return (
    <Card className={classes.root} style={ {zIndex: 1000}}>
      <CardContent>
        <Typography variant="h5" component="h2">
          AQI Grade
        </Typography>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Table>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.city}>
                  <TableCell component="th" scope="row">
                    {row.city}
                  </TableCell>
                  <TableCell style={{ backgroundColor: row.color, borderRadius: '10px', textAlign: 'center'}}>
                   
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

        </CardContent>
      </Collapse>
      <IconButton
        className={expanded ? classes.expandOpen : classes.expand}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </IconButton>
    </Card>
  );
}
