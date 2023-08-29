import axios from "axios";

const url = "http://localhost:3001/";

let baseUrl = axios.create({
  baseURL: url,
});

export default baseUrl;
