import axios from "axios";
import SummaryApi, { baseURL } from "../common/summaryApi";

 const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true
})

export default Axios