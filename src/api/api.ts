import axios, { AxiosResponse } from 'axios'
import type { IAuthResponse } from '../models/interfaces'
const api = axios.create({
  withCredentials: true,
})

api.interceptors.response.use(
  (config: AxiosResponse) => {
    return config
  },
  async (error) => {
    if (error.response.status === 401) {
      try {
        await axios.get<IAuthResponse>(`/users/refresh`, {
          withCredentials: true,
        })
      } catch (e) {
        return
      }
    } else {
      throw error
    }
  }
)

export default api
