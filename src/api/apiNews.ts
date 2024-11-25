import axios from "axios";
import { GetNewsResponse } from "../types/types";

const BASE_URL = import.meta.env.VITE_NEWS_BASE_API_URL
const API_KEY = import.meta.env.VITE_NEWS_API_KEY

export const newsAPI = async () => {
  try {
    const res = await axios.get<GetNewsResponse>(`${BASE_URL}/latest-news`, {
      params: {
        apiKey: API_KEY
      }
    });
    console.log(res.data)
    return res.data
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
}


