import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export const columns = [
  { gridArea: 'isp', label: 'ISP' },
  { gridArea: 'volume', label: 'Volume' },
  { gridArea: 'price', label: 'Price' },
  { gridArea: 'ppgb', label: 'Cost Per GB' },
  { gridArea: 'speed', label: 'Top Speed' },
  { gridArea: 'duration', label: 'Duration' },
  { gridArea: 'tech', label: 'Tech      ' },
];
const TableHeaders = () => (
  <TableHead>
    <TableRow>
      {
      columns.map(({ label, gridArea }) => (
        <TableCell className={`table-header-button ${gridArea}`} key={label}>
          {label}
        </TableCell>
      ))
    }
    </TableRow>
  </TableHead>
);

export default TableHeaders;
