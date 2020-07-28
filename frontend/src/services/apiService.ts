/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from "axios";

export class ApiService {
  get(url: string, config?: AxiosRequestConfig) {
    if (config) {
      return axios.get(url, config);
    } else {
      return axios.get(url);
    }
  }
  post(url: string, data: any) {
    return axios.post(url, data);
  }
  patch(url: string, data: any) {
    return axios.patch(url, data);
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */
