import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Home.scss'
import Form from '../components/Form/Form'
import Table from '../components/Table/Table'

const Home = () => {
  const [data, setData] = useState([])
  const [dataCopy, setDataCopy] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  //get data from api endpoint
  useEffect(() => {
    axios
      .get(`https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f`)
      .then((response) => {
        setData(response?.data?.result?.auditLog)
        setDataCopy(response?.data?.result?.auditLog)
      })
      .catch((err) => console.log(err))
  }, [])

  const filterData = (newData) => {
    setData(newData)
    setCurrentPage(1)
  }
  return (
    <div className='form-container'>
      <Form data={dataCopy} setData={setDataCopy} filterData={filterData} />
      <Table
        data={data}
        setData={setData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default Home
