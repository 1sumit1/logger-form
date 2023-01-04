import React, { useState, useEffect } from 'react'
import { useSearchParams, useLocation } from 'react-router-dom'
import './Form.scss'

const Form = ({ data, filterData }) => {
  const location = useLocation()
  const [selectedData, setSelectedData] = useState({})
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const queryParams = Object.fromEntries([...searchParams])
    setSelectedData({ ...queryParams })
    handleFilter()
    // eslint-disable-next-line
  }, [location, data])

  // actionType unique data
  let actionTypeOptions = new Set(
    data.map((item) => {
      return item.actionType
    })
  )

  // applicationType unique data
  let applicationTypeOptions = new Set(
    data.map((item) => {
      return item.applicationType
    })
  )

  const handleSearch = () => {
    let paramsData = {}
    if (selectedData.LogId) {
      paramsData.LogId = selectedData.LogId
    }
    if (selectedData.ActionType) {
      paramsData.ActionType = selectedData.ActionType
    }
    if (selectedData.ApplicationType) {
      paramsData.ApplicationType = selectedData.ApplicationType
    }
    if (selectedData.fromDate) {
      paramsData.fromDate = selectedData.fromDate
    }
    if (selectedData.toDate) {
      paramsData.toDate = selectedData.toDate
    }
    if (selectedData.ApplicationID) {
      paramsData.ApplicationID = selectedData.ApplicationID
    }
    setSearchParams(paramsData)
  }

  const handleReset = () => {
    setSearchParams()
  }

  let handleFilter = () => {
    let newData = [...data]
    const queryParams = Object.fromEntries([...searchParams])

    const selectedValue = queryParams

    let actionArray = selectedValue?.ActionType
      ? newData?.filter((item) =>
          item?.actionType?.includes(selectedValue?.ActionType)
        )
      : newData
    let applicationArray = selectedValue?.ApplicationType
      ? actionArray?.filter(
          (item) => item?.applicationType === selectedValue?.ApplicationType
        )
      : actionArray
    let dateFromArray = selectedValue?.fromDate
      ? applicationArray?.filter(
          (item) =>
            item?.creationTimestamp.split(' ')[0] >= selectedValue?.fromDate
        )
      : applicationArray

    let dateToArray = selectedValue?.toDate
      ? dateFromArray?.filter(
          (item) =>
            item?.creationTimestamp.split(' ')[0] <= selectedValue?.toDate
        )
      : dateFromArray

    let applicationIDArray = selectedValue?.ApplicationID
      ? dateToArray?.filter((item) =>
          item?.applicationId?.toString().includes(selectedValue?.ApplicationID)
        )
      : dateToArray

    let LogIdArray = selectedValue?.LogId
      ? applicationIDArray?.filter((item) =>
          item?.logId?.toString().includes(selectedValue?.LogId)
        )
      : applicationIDArray
    filterData(LogIdArray)
  }

  return (
    <div className='emp-form'>
      <div className='form1'>
        <div className='form-item'>
          <label className='form-label'>Log Id</label>
          <input
            className='form-input'
            onChange={(e) =>
              setSelectedData({ ...selectedData, LogId: e.target.value })
            }
            value={selectedData?.LogId ? selectedData?.LogId : ''}
            type='text'
            placeholder='eg:758574985743'
          />
        </div>
        <div className='form-item'>
          <label className='form-label'>Action type</label>
          <select
            className='form-input'
            onChange={(e) =>
              setSelectedData({ ...selectedData, ActionType: e.target.value })
            }
            value={selectedData?.ActionType ? selectedData?.ActionType : ''}
          >
            <option value=''>select</option>
            {[...actionTypeOptions].map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
        </div>
        <div className='form-item'>
          <label className='form-label'>Application type</label>
          <select
            className='form-input'
            onChange={(e) =>
              setSelectedData({
                ...selectedData,
                ApplicationType: e.target.value,
              })
            }
            value={
              selectedData?.ApplicationType ? selectedData?.ApplicationType : ''
            }
          >
            <option value=''>select</option>
            {[...applicationTypeOptions].map((item, index) =>
              item ? <option key={index}>{item}</option> : ''
            )}
          </select>
        </div>
        <div className='form-item'>
          <label className='form-label'>From Date</label>
          <input
            className='form-input'
            onChange={(e) =>
              setSelectedData({ ...selectedData, fromDate: e.target.value })
            }
            value={selectedData?.fromDate ? selectedData?.fromDate : ''}
            type='date'
            placeholder='from date'
          />
        </div>
        <div className='form-item'>
          <label className='form-label'>To Date</label>
          <input
            className='form-input'
            type='date'
            onChange={(e) =>
              setSelectedData({ ...selectedData, toDate: e.target.value })
            }
            value={selectedData?.toDate ? selectedData?.toDate : ''}
            placeholder='to date'
          />
        </div>
        <div className='form-item'>
          <label className='form-label'>Application ID</label>
          <input
            className='form-input'
            type='text'
            onChange={(e) =>
              setSelectedData({
                ...selectedData,
                ApplicationID: e.target.value,
              })
            }
            value={
              selectedData?.ApplicationID ? selectedData?.ApplicationID : ''
            }
            placeholder='eg:74864957395'
          />
        </div>
      </div>
      <div className='form-btn'>
        <button className='btn' onClick={() => handleSearch()}>
          Search Logger
        </button>
        <button className='btn' onClick={() => handleReset()}>
          Reset
        </button>
      </div>
    </div>
  )
}

export default Form
