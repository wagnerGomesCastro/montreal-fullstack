/* eslint-disable @typescript-eslint/no-explicit-any */
import { del, get, post, patch } from '../apis/api_backend'
import * as url from '../urls'

export const getAll = () => {
  return get(`${url.USER}`)
}

export const show = (id: number | string) => {
  return get(`${url.USER}/${id}`)
}

export const create = (data: any) => {
  return post(`${url.USER}`, data)
}

export const update = ({ id, data }: any) => {
  return patch(`${url.USER}/${id}`, data)
}

export const destroy = (id: number | string) => {
  return del(`${url.USER}/${id}`)
}
