import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { editTask } from '../../actions/task';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

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

const RepeatTaskTable = ({ editTask, tasks }) => {
  const history = useHistory();
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRowClick = (e, task) => {
    const { _id, isCompleted, streak, streakDate } = task;
    let newStreak;
    let newStreakDate;

    if (e.target.type === 'checkbox') {
      // Update streak date
      if (streakDate === null || streak === 0) {
        newStreakDate = new Date();
        newStreakDate.setHours(0, 0, 0, 0);
      }

      // Increment streak
      newStreak = streak + 1;

      // Make task complete
      editTask(_id, {
        ...task,
        isCompleted: !isCompleted,
        streak: newStreak,
        streakDate: newStreakDate,
      });
    } else {
      // Redirect to edit task page with task id
      history.push(`/edittask/${_id}`);
    }
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
            Repeating Tasks
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
              {tasks
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((task, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      tabIndex={-1}
                      key={task._id}
                      onClick={(e) => handleRowClick(e, task)}
                      className={
                        // task.isCompleted ? 'table-rows disabled' : 'table-rows'
                        task.active && !task.isCompleted
                          ? 'table-rows'
                          : 'table-rows disabled'
                      }
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          inputProps={{ 'aria-labelledby': labelId }}
                          checked={task.isCompleted}
                          disabled={task.isCompleted}
                        />
                      </TableCell>
                      <TableCell id={labelId} scope="row" padding="none">
                        {task.name}
                      </TableCell>
                      <TableCell align="left">{task.description}</TableCell>
                      <TableCell align="right">{task.streak}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tasks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

RepeatTaskTable.propTypes = {
  editTask: PropTypes.func.isRequired,
};

export default connect(null, { editTask })(RepeatTaskTable);
