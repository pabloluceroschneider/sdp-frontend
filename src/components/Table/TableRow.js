import React from "react";
import { SortableHandle } from "react-sortable-hoc";
import DragHandleIcon from '@material-ui/icons/DragHandle';
// styles
import styles from 'assets/jss/table/row'
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(styles);

const RowHandler = SortableHandle(() => {
  const classes = useStyles();
  return <div className={classes.handle}><DragHandleIcon /></div>
});

const TableRow = ({ columns, values }) => {
  const classes = useStyles();

  return (
    <tr className={classes.tr}>
      <td>
        <div className={classes.firstElement}>
          <RowHandler />
        </div>
      </td>
      {columns.map( ({ id, render }) => (
        <td>
          {render 
          ? render(values)
          : values[id] }
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
