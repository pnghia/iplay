import React from 'react'
import {
  TableCell,
  TableRow
} from '@material-ui/core'
import moment from 'moment'

const factory = {
  withdraw: ({amount, bank_account_name: bankAccountName, bank_account_number: bankAccountNo, bank_name: bankName, id, created_at: date}) => {
    return (
      <TableRow
        hover
        key={id}
      >
        <TableCell style={{color: '#ffaf50'}} numeric>{id}</TableCell>
        <TableCell style={{color: '#ffaf50'}} component="th" scope="row" padding="none">
          {amount}
        </TableCell>
        <TableCell style={{color: '#ffaf50'}} numeric>{moment(date).format('YY-MM-DD hh:mm')}</TableCell>
        <TableCell style={{color: '#ffaf50'}} numeric>{bankAccountName}</TableCell>
        <TableCell style={{color: '#ffaf50'}} numeric>{bankAccountNo}</TableCell>
        <TableCell style={{color: '#ffaf50'}} numeric>{bankName}</TableCell>
      </TableRow>
    )
  },
  deposit: ({amount, from_bank: fromBank, to_bank: toBank, bonus_amount: bonusAmount, id, created_at: date, status}) => {
    return (
      <TableRow
        hover
        key={id}
      >
        <TableCell style={{color: '#ffaf50'}} numeric>{id}</TableCell>
        <TableCell style={{color: '#ffaf50'}} component="th" scope="row" padding="none">
          {amount}
        </TableCell>
        <TableCell style={{color: '#ffaf50'}} numeric>{moment(date).format('YY-MM-DD hh:mm')}</TableCell>
        <TableCell style={{color: '#ffaf50'}} numeric>{fromBank}</TableCell>
        <TableCell style={{color: '#ffaf50'}} numeric>{toBank}</TableCell>
        <TableCell style={{color: '#ffaf50'}} numeric>{bonusAmount}</TableCell>
        <TableCell style={{color: '#ffaf50'}} numeric>{status}</TableCell>
      </TableRow>
    )
  },
  transfer: ({amount, target, origin, id, created_at: date, status}) => {
    return (
      <TableRow
        hover
        key={id}
      >
        <TableCell style={{color: '#ffaf50'}} numeric>{id}</TableCell>
        <TableCell style={{color: '#ffaf50'}} component="th" scope="row" padding="none">
          {amount}
        </TableCell>
        <TableCell style={{color: '#ffaf50'}} numeric>{moment(date).format('YY-MM-DD hh:mm')}</TableCell>
        <TableCell style={{color: '#ffaf50'}} numeric>{origin}</TableCell>
        <TableCell style={{color: '#ffaf50'}} numeric>{target}</TableCell>
        <TableCell style={{color: '#ffaf50'}} numeric>{status}</TableCell>
      </TableRow>
    )
  }
}

export default factory