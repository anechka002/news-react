export type GetNewsResponse = {
  status: string 
  news: News[]
  page: number
}

export type News = {
  id: string
  title: string
  description: string
  url: string
  author: string
  image: string
  language: string
  category: string[]
  published: string
}

export type GetCategories = {
  categories: string[]
  description: string
  status: string
}