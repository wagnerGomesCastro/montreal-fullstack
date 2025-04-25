/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'

const API_URL = import.meta.env.VITE_APP_API_URL

const axiosApi = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
  },
})

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
)

export async function get(url: string, config = {}) {
  return await axiosApi.get(url, { ...config }).then((response) => response.data)
}

export async function post(url: string, data: any, config = {}) {
  return axiosApi.post(url, { ...data }, { ...config }).then((response) => response.data)
}

export async function patch(url: string, data: any, config = {}) {
  return axiosApi.patch(url, { ...data }, { ...config }).then((response) => response.data)
}

export async function put(url: string, data: any, config = {}) {
  return axiosApi.put(url, { ...data }, { ...config }).then((response) => response.data)
}

export async function del(url: string, config = {}) {
  return await axiosApi.delete(url, { ...config }).then((response) => response.data)
}
