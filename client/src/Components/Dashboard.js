import React, { useEffect, useContext, useState } from 'react'
import { AppBar, Toolbar, IconButton, Typography, Button, Avatar, Box, Dialog, DialogTitle, DialogContent } from '@material-ui/core'
import { CloudDownload, Edit, ExitToApp } from '@material-ui/icons'

import { BASE_URL } from '../environment'
import { AppStateContext } from '../Contexts/AppStateContext';
import Axios from 'axios';
import CommonTable from './CommonTable/CommonTable';
import EditUserDialog from './EditUserDialog';

const usersColumnsList = [
  {
    id: 'id',
    title: 'Id'
  },
  {
    id: 'name',
    title: 'Name'
  },
  {
    id: 'email',
    title: 'Email'
  },
  {
    id: 'gender',
    title: 'Gender'
  },
  {
    id: 'status',
    title: 'Status'
  },
  {
    id: 'alarmDefinitionName',
    title: 'Alarm'
  },
  {
    id: 'alarmDefinitionRecommendation',
    title: 'Recommendation'
  }
]
const usersColumnsListMap = usersColumnsList.reduce(
  (acc, column) => ({
    ...acc,
    [column.id]: column
  }),
  {}
)

const Dashboard = () => {
  const {
    setState,
    state: { token, userDetails, users }
  } = useContext(AppStateContext)
  const columns = React.useMemo(
    () => [
      {
        Header: usersColumnsListMap.id.title,
        accessor: usersColumnsListMap.id.id,
        disableFilters: true,
        disableSortBy: true,
      },
      {
        Header: usersColumnsListMap.name.title,
        accessor: usersColumnsListMap.name.id,
        disableFilters: true,
        disableSortBy: true,
      },
      {
        Header: usersColumnsListMap.email.title,
        accessor: usersColumnsListMap.email.id,
        disableFilters: true,
        disableSortBy: true,
      },
      {
        Header: usersColumnsListMap.gender.title,
        accessor: usersColumnsListMap.gender.id,
        disableFilters: true,
        disableSortBy: true,
      },
      {
        Header: usersColumnsListMap.status.title,
        accessor: usersColumnsListMap.status.id,
        disableFilters: true,
        disableSortBy: true,
      },
      {
        Header: 'Actions',
        accessor: 'health',
        disableFilters: true,
        disableSortBy: true,
        Cell: ({ row }) => {
          return (
            <div className='d-flex justify-content-center'>
              <IconButton onClick={() => showEditUserDialog(row.original)}>
                <Edit />
              </IconButton>
            </div>
          )
        }
      }
    ],
    []
  )
  const [tableData, setTableData] = useState({
    loading: false,
    data: [],
    count: 1,
    controlledTableState: {
      pageSize: 20,
      pageIndex: 0,
      filters: [],
      sortBy: []
    }
  })
  const fetchData = React.useCallback(
    async ({ pageSize, pageIndex, filters, sortBy }) => {
      try {
        const requestQueryParams = new window.URLSearchParams('')
        requestQueryParams.set('limit', pageSize)
        requestQueryParams.set('offset', pageSize * pageIndex)
        const response = await window.fetch(
          `${BASE_URL}/users?${requestQueryParams.toString()}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        const responseJson = await response.json()
        const {
          metaData: { count },
          data
        } = responseJson
        setTableData(ps => ({
          ...ps,
          data,
          count: count || 0,
          controlledTableState: {
            ...ps.controlledTableState,
            pageIndex,
            pageSize,
            pageCount: Math.ceil(count / pageSize),
            filters,
            sortBy
          }
        }))
      } catch (ex) {
        if (ex.name === 'AbortError') return
        console.log(ex)
      }
    },
    []
  )
  const [editUserDialogState, setEditUserDialogState] = useState({
    show: false,
    user: null
  })
  const showEditUserDialog = user => {
    setEditUserDialogState(ps => ({
      ...ps,
      show: true,
      user: {
        ...user
      }
    }))
  }
  const hideEditUserDialog = (refreshTable = false) => {
    setEditUserDialogState(ps => ({
      ...ps,
      show: false,
      user: null
    }))
    if (refreshTable) {
      fetchData(tableData.controlledTableState)
    }
  }
  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Box display='flex' flexDirection='column'>
            <Typography variant='h6'>Gorest User App</Typography>
          </Box>
          <Box flex='1'></Box>
          <IconButton color='inherit'>
            <CloudDownload onClick={() => {
              window.open(`${BASE_URL}/users/export`, '_blank')
            }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box>
        <div className=''>
          <CommonTable
            columns={columns}
            data={tableData.data}
            count={tableData.count}
            controlledTableState={tableData.controlledTableState}
            fetchData={fetchData}
            loading={false}
          />
        </div>
      </Box>
      <Dialog open={editUserDialogState.show} onClose={hideEditUserDialog} aria-labelledby="edit user">
        <DialogTitle id="form-dialog-title">Edit User</DialogTitle>
        <DialogContent>
          {
            editUserDialogState.show && <EditUserDialog user={editUserDialogState.user} onClose={hideEditUserDialog} onUpdate={() => hideEditUserDialog(true)} />
          }
        </DialogContent>
      </Dialog>
    </>
  )
}
export default Dashboard
