import axios from "axios"
import { useState, useEffect, useCallback } from "react"
import socket from "./../socket"
import { toast } from "react-toastify"

export const useCRUD = (baseUrl) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(baseUrl)
      setData(response.data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [baseUrl])

  const createData = async (newData, event) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.post(baseUrl, newData)
      socket.emit(`${event}`, response.data)
      toast.success("Data created successfully")
      return response.data
    } catch (err) {
      setError(err)
      toast.error(err?.data?.message || err?.message)
    } finally {
      setLoading(false)
    }
  }

  const toglerStatus = async (id, event) => {
    setLoading(true)
    setError(null)
    try {
      await axios.patch(`${baseUrl}/${id}`)
      socket.emit(`${event}`, id)
      toast.success("Data updated successfully")
    } catch (err) {
      toast.error(err?.data?.message || err?.message)
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  const updateData = async (id, updatedData, event) => {
    setLoading(true)
    setError(null)
    try {
      await axios.put(`${baseUrl}/${id}`, updatedData)
      socket.emit(`${event}`, id)
      toast.success("Data updated successfully")
    } catch (err) {
      setError(err)
      toast.error(err?.data?.message || err?.message)
    } finally {
      setLoading(false)
    }
  }

  const deleteData = async (id, event) => {
    setLoading(true)
    setError(null)
    try {
      await axios.delete(`${baseUrl}/${id}`)
      socket.emit(`${event}`)
      toast.success("Data deleted successfully")
    } catch (err) {
      toast.error("something wrong")
      setError(err)
      return err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    data,
    loading,
    error,
    fetchData,
    createData,
    updateData,
    deleteData,
    toglerStatus,
  }
}

export default useCRUD
