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
    left: theme.spacing(5), // moved a little down
    bottom: theme.spacing(5), // moved a little left
  },
  expand: {
    transform: 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(0deg)',
  },
}));

export default function FloatingInfo(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const rows = [
    { label: 'GDP', value: "10000"},
    { label: 'AQI', value: props.aqiValue},
    { OtherInfo: 'OK'}
    // Add more cities and colors as needed
  ];

  return (
    <Card className={classes.root} style={ {zIndex: 1000}}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Country Name: {}
        </Typography>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Table>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.label}>
                  <TableCell component="th" scope="row">
                    {row.label}
                  </TableCell>
                  <TableCell>
                    {row.value}
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
