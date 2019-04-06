import React from 'react'
import {
  TableCell,
  TableRow
} from '@material-ui/core'

const factory = {
  withdraw: (
    <TableRow style={{color: '#ffaf50', fontWeight: 'bold'}}>
      <TableCell>ID</TableCell>
      <TableCell>Amount</TableCell>
      <TableCell align="right">Time</TableCell>
      <TableCell align="right">Bank Account Name</TableCell>
      <TableCell align="right">Bank Account No</TableCell>
      <TableCell align="right">Bank Name</TableCell>
    </TableRow>
  ),
  deposit: (
    <TableRow style={{color: '#ffaf50', fontWeight: 'bold'}}>
      <TableCell>ID</TableCell>
      <TableCell>Amount</TableCell>
      <TableCell align="right">Time</TableCell>
      <TableCell align="right">From Bank</TableCell>
      <TableCell align="right">To Bank</TableCell>
      <TableCell align="right">Bonus Amount</TableCell>
      <TableCell align="right">Status</TableCell>
    </TableRow>
  ),
  transfer: (
    <TableRow style={{color: '#ffaf50', fontWeight: 'bold'}}>
      <TableCell>ID</TableCell>
      <TableCell>Amount</TableCell>
      <TableCell align="right">Time</TableCell>
      <TableCell align="right">Origin</TableCell>
      <TableCell align="right">Target</TableCell>
      <TableCell align="right">Status</TableCell>
    </TableRow>
  )
}

export default factory