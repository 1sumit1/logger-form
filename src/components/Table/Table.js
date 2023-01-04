import React, { useState } from 'react'
import Pagination from '../Pagination/Pagination'
import './Table.scss'

const Table = ({ data, setData,currentPage,setCurrentPage}) => {
 
  const [recordsPerPage] = useState(10)
 
  const indexOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord)

   const nPages = Math.ceil(data.length / recordsPerPage)

   let [sortToggle, setSortToggle] = useState({
     isLogId: true,
     isApplicationType: true,
     isApplicationId: true,
     isActionType: true,
     isDateAndTime: true,
   })

  // sort coloum data
  const LogIdSorting = () => {
    let isSort = sortToggle.isLogId
    let newData = [...data]
    let sorting = (a, b) => {
      if (isSort) {
        return a.logId - b.logId
      } else {
        return b.logId - a.logId
      }
    }
    let sortedData = newData.sort(sorting)
    setData(sortedData)
    setSortToggle({
      ...sortToggle,
      isLogId: !sortToggle.isLogId,
    })
  }

  const ApplicationIdSorting = () => {
    let isSort = sortToggle.isApplicationId
    let newData = [...data]
    let sorting = (a, b) => {
      if (isSort) {
        return a.applicationId - b.applicationId
      } else {
        return b.applicationId - a.applicationId
      }
    }
    let sortedData = newData.sort(sorting)
    setData(sortedData)
    setSortToggle({
      ...sortToggle,
      isApplicationId: !sortToggle.isApplicationId,
    })
  }

  const ApplicationTypeSorting = () => {
    let isSort = sortToggle.isApplicationType
    let newData = [...data]
    let sorting = (a, b) => {
      if (isSort) {
        return a.applicationType?.localeCompare(b.applicationType)
      } else {
        return b.applicationType?.localeCompare(a.applicationType)
      }
    }
    let sortedData = newData.sort(sorting)
    setData(sortedData)
    setSortToggle({
      ...sortToggle,
      isApplicationType: !sortToggle.isApplicationType,
    })
  }

  const ActionTypeSorting = () => {
    let isSort = sortToggle.isActionType
    let newData = [...data]
    let sorting = (a, b) => {
      if (isSort) {
        return a.actionType?.localeCompare(b.actionType)
      } else {
        return b.actionType?.localeCompare(a.actionType)
      }
    }
    let sortedData = newData.sort(sorting)
    setData(sortedData)
    setSortToggle({
      ...sortToggle,
      isActionType: !sortToggle.isActionType,
    })
  }

  const DateAndTimeSorting = () => {
    let isSort = sortToggle.isDateAndTime
    let newData = [...data]
    let sorting = (a, b) => {
      if (isSort) {
        return a.creationTimestamp?.localeCompare(b.creationTimestamp)
      } else {
        return b.creationTimestamp?.localeCompare(a.creationTimestamp)
      }
    }
    let sortedData = newData.sort(sorting)
    setData(sortedData)
    setSortToggle({
      ...sortToggle,
      isDateAndTime: !sortToggle.isDateAndTime,
    })
  }
  return (
    <div className='emp-table'>
      <table>
        <thead>
          <tr>
            <th onClick={LogIdSorting}>LogId</th>
            <th onClick={ApplicationIdSorting}>ApplicationId</th>
            <th onClick={ApplicationTypeSorting}>ApplicationType</th>
            <th onClick={ActionTypeSorting}>ActionType</th>
            <th onClick={DateAndTimeSorting}>Date:Time</th>
          </tr>
        </thead>
        {currentRecords.map((item, index) => (
          <tbody>
            <tr key={index}>
              <td>{item.logId}</td>
              <td>{item.applicationId}</td>
              <td>{item.applicationType}</td>
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
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default Table
