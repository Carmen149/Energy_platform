import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    post: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
    },
  },
});

export const axiosInstanceAuth = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=UTF-8",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});
