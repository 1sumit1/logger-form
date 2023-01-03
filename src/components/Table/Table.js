import React, { useState } from 'react'
import Pagination from '@mui/material/Pagination'
import './Table.scss'

const Table = ({ data, setData, page, setPage }) => {
  const [order, setOrder] = useState('ASC')

  const sortingData = (col) => {
    if (order === 'ASC') {
      const sorted = [...data].sort((a, b) => (a[col] > b[col] ? 1 : -1))
      setData(sorted)
      setOrder('DSC')
    }
    if (order === 'DSC') {
      const sorted = [...data].sort((a, b) => (a[col] < b[col] ? 1 : -1))
      setData(sorted)
      setOrder('ASC')
    }
  }
  return (
    <div className='emp-table'>
      <table>
        <thead>
          <tr>
            <th onClick={() => sortingData('log_id')}>LogId</th>
            <th onClick={() => sortingData('application_id')}>ApplicationId</th>
            <th onClick={() => sortingData('application_type')}>
              ApplicationType
            </th>
            <th onClick={() => sortingData('company_id')}>CompanyId</th>
            <th onClick={() => sortingData('action_type')}>ActionType</th>
            <th onClick={() => sortingData('date')}>Date:Time</th>
          </tr>
        </thead>
        {data.slice((page - 1) * 10, (page - 1) * 10 + 10).map((item) => (
          <tbody>
            <tr>
              <td>{item.logId}</td>
              <td>{item.applicationId}</td>
              <td>{item.applicationType}</td>
              <td>{item.companyId}</td>
              <td>{item.actionType}</td>
              <td>{item.creationTimestamp}</td>
            </tr>
          </tbody>
        ))}
      </table>
      {!data.length && (
        <center>
          <h4>Data not found!</h4>
        </center>
      )}
      <Pagination
        count={10}
        onChange={(e, value) => setPage(value)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '10px',
        }}
      />
    </div>
  )
}

export default Table
