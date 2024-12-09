import axios from "axios";
import { GetCategories, GetNewsResponse } from "../types/types";

const BASE_URL = import.meta.env.VITE_NEWS_BASE_API_URL
const API_KEY = import.meta.env.VITE_NEWS_API_KEY

type NewsApiType = {
  page_number: number
  page_size: number
  category: string | null
  keywords: string
}

export const newsAPI = async ({page_number = 1, page_size = 10, category, keywords} : NewsApiType) => {
  try {
    const res = await axios.get<GetNewsResponse>(`${BASE_URL}/search`, {
      params: {
        apiKey: API_KEY,
        page_number,
        page_size,
        category,
        keywords,
      }
    });
    // console.log(res.data)
    return res.data
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
}


export const getCategories = async () => {
  try {
    const res = await axios.get<GetCategories>(`${BASE_URL}/available/categories`, {
      params: {
        apiKey: API_KEY,
      }
    });
    // console.log(res.data)
    return res.data
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
}




