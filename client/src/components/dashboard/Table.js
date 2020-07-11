import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

function createData(name, description, streak) {
  return { name, description, streak };
}

const rows = [
  createData(
    'Feed Dog',
    'Friday morning feed the dog and refill water bowl. Also, check to see if it has any fleas. May need to consider getting him a new flea/tick collar.',
    3
  ),
  createData(
    'Clean House',
    'When I wake up, clean the house starting with my room.',
    'n/a'
  ),
  createData(
    'Study for physics exam',
    'I have a physics exam this coming week and need to prepare for it. Form a study group and get to studying.',
    1
  ),
  createData('Fold clothing', '', 3),
  createData('Code for 2 hours', 'Code for 2 hours everyday', 5),
  createData(
    'Prep for interviews',
    'Spend a couple minutes after breakfast to prep for interviews.',
    1
  ),
  createData('Do homework', 'Finsh homework for this week', 3),
  createData('Send thank you letter', '', 'n/a'),
  createData(
    'Write yelp review',
    'Write review for the recent noodle shop that i visited.',
    1
  ),
];

const headCells = [
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Task',
  },
  {
    id: 'description',
    align: 'left',
    disablePadding: false,
    label: 'Description',
  },
  { id: 'streak', align: 'right', disablePadding: false, label: 'Streak' },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleClick = (event, name) => {
    // Redirect to edit task page with task id
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Toolbar>
          <Typography variant="h6" id="tableTitle" component="div">
            One and done tasks
          </Typography>
        </Toolbar>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="small"
            aria-label="enhanced table"
          >
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.align}
                    padding={headCell.disablePadding ? 'none' : 'default'}
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      tabIndex={-1}
                      key={row.name}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox inputProps={{ 'aria-labelledby': labelId }} />
                      </TableCell>
                      <TableCell id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.description}</TableCell>
                      <TableCell align="right">{row.streak}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
