import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Home.scss'
import Form from '../components/Form/Form'
import Table from '../components/Table/Table'

const Home = () => {
  const [data, setData] = useState([])
  const [dataCopy, setDataCopy] = useState([])
  const [page, setPage] = useState(1)
  useEffect(() => {
    axios
      .get(`https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f`)
      .then((response) => {
        setData(response?.data?.result?.auditLog)
        setDataCopy(response?.data?.result?.auditLog)
      })
      .catch((err) => console.log(err))
  }, [])

  console.log('data', data)
  const uniqueActionType = [...new Set(data.map((item) => item.actionType))]
  const uniqueApplicationType = [
    ...new Set(data.map((item) => item.applicationType)),
  ]

   const filterData = (newData) => {
     setData(newData)
     setPage(1)
   }
  return (
    <div className='form-container'>
      <Form
        uniqueActionType={uniqueActionType}
        uniqueApplicationType={uniqueApplicationType}
        data={dataCopy}
        setData={setDataCopy}
        filterData={filterData}
      />
      <Table data={data} setData={setData} page={page} setPage={setPage} />
    </div>
  )
}

export default Home
