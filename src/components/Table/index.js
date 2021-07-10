import React from "react";
import TableRow from "./TableRow";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from './arrayMove'

// styles
import styles from 'assets/jss/table/table'
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(styles);

const SortableCont = SortableContainer(({ children, className }) => {
  return <tbody className={className}>{children}</tbody>;
});

const SortableItem = SortableElement(props => <TableRow {...props} />);

/**
 * 
 * SUPER HERO TABLE
 * 
 */
const MyTable = ({ columns, data, onDragAndDrop }) => {
  const classes = useStyles();

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const list = arrayMove(data, oldIndex, newIndex)
    onDragAndDrop(list);
  }

  return (
    <table className={classes.container}>
      <thead className={classes.thead}>
        <tr>
          <td></td>
          {columns.map( ({Header, id, width}) => (
            <td style={{width}} key={id}>{Header}</td>
          ))}
        </tr>
      </thead>
      <SortableCont
        onSortEnd={onSortEnd}
        axis="y"
        lockAxis="y"
        lockToContainerEdges={true}
        lockOffset={["30%", "50%"]}
        helperClass="helperContainerClass"
        useDragHandle={true}
      >
        {data.map( (value, index) => (
          <SortableItem
            key={value._id}
            index={index}
            columns={columns}
            values={value}
          />
        ))}
      </SortableCont>
    </table>
  );
};

export default MyTable;
