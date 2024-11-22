export type GetNewsResponse = {
  status: string 
  news: DomainNews[]
  page: number
}

export type DomainNews = {
  author: string
  category: string[]
  description: string
  id: string
  image: string
  language: string
  published: string
  title: string
  url: string
}