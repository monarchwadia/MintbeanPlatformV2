import axios from "axios";

export class ApiService {
  get(url: string) {
    return axios.get(url);
  }
  post(url: string, data: any) {
    return axios.post(url, data);
  }
}
