/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react'
import {
  Button,
  CssBaseline,
  Typography,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow
} from '@material-ui/core'
import validate from 'service/form/validation'
import formCreateInputs from 'service/form/create'
import TextInput from 'component/textInput'
import SelectInput from 'component/selectInput'
import Bottom from 'component/bottom'
import { withStyles } from '@material-ui/core/styles'
import { useForm } from 'react-final-form-hooks'
import Joi from 'joi'
import http from 'service/http'
import { PropagateLoader } from 'react-spinners'
import store from 'store'
import Header from 'component/header'
import factoryHeader from './factoryHeader'
import factoryBody from './factoryBody'
import styles from './style'
import useLoading from '../loading/hook'
import useDialog from '../dialog/hook'

const transactionsType = [{
  title: 'withdraw',
  value: 'withdraw'
},{
  title: 'deposit',
  value: 'deposit'
},{
  title: 'transfer',
  value: 'transfer'
}]

function Histories({ classes, history }) {
  const [loading, withLoading] = useLoading(false)
  const [histories, updateHistories] = useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [selectedType, updateSelectedType] = React.useState(null)
  const [Dialog, showDialogWithMessage] = useDialog({
    title: 'Histories Warning',
    btnLabel: 'Got it'
  })

  const onSubmit = async ({type, fromDate, toDate}) => {
    try {
      const { user_id: userId } = store.get('user')
      const params = {
        fromDate, toDate
      }
      const response = await withLoading(() =>
        http.get({ path: `users/${userId}/${type}`, params })
      )
      updateSelectedType(type)
      updateHistories(response)
      if (!response.length) {
        showDialogWithMessage('Empty Data!!!')
      }
    } catch (error) {
      throw error
    }
  }

  const schema = Joi.object().keys({
    type: Joi.string()
      .label('Transaction Type')
      .required(),
    fromDate: Joi.string()
      .label('From Date')
      .required(),
    toDate: Joi.string()
      .label('To Date')
      .required()
  })

  const { form, handleSubmit, submitting } = useForm({
    onSubmit,
    validate: validate(schema)
  })

  const [type, fromDate, toDate] = formCreateInputs(['type', 'fromDate', 'toDate'], form)
  
  function handleChangePage(event, newPage) {
    setPage(newPage)
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value)
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, histories.length - page * rowsPerPage)
  return (
    <div className={classes.root}>
      <Header history={history} title='Histories'/>
      <div className={classes.container}>
        <CssBaseline />
          <form onSubmit={handleSubmit} className={classes.form}>
          <SelectInput input={type} options={transactionsType} label='Select Type Transaction' />
            <TextInput input={fromDate} type='date' label='From Date' InputLabelProps={{
              shrink: true,
            }}/>
            <TextInput input={toDate} type='date' label='To Date' InputLabelProps={{
              shrink: true,
            }}/>
            {loading ? (
              <div
                style={{ display: 'flex', justifyContent: 'center', margin: 15 }}
              >
                <PropagateLoader
                  sizeUnit="px"
                  size={20}
                  color="#f50057"
                  loading={loading}
                />
              </div>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={submitting}
                className={classes.submit}
              >
                <img alt='iplay' style={{width: 30, marginRight: 15}} src={`${process.env.PUBLIC_URL}/icon/icon-history.svg`} />
                <Typography variant="button" color="inherit" className={classes.button}>
                  SUBMIT NOW
                </Typography>
              </Button>
            )}
          </form>
          {histories.length
            ? <div>
                <div className="table-wrapper">
                  <Table className="table" aria-labelledby="tableTitle">
                    {factoryHeader[selectedType]}
                    <TableBody>
                      {histories
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(factoryBody[selectedType])}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 49 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                <TablePagination
                  style={{color: '#ffaf50', fontSize: 12}}
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={histories.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  backIconButtonProps={{
                    'aria-label': 'Previous Page',
                  }}
                  nextIconButtonProps={{
                    'aria-label': 'Next Page',
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </div>
            : null
          }
        </div> 
      <Bottom history={history} />
      <Dialog/>
    </div>
  )
}

export default withStyles(styles)(Histories)
