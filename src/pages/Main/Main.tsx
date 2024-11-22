import { useEffect, useState } from 'react'
import s from './styles.module.css'
import { newsAPI } from '../../api/apiNews'
import { DomainNews } from '../../types/types'
import { NewsBanner } from '../../components/NewsBanner/NewsBanner'
import { NewsList } from '../../components/NewsList/NewsList'

export const Main = () => {
  const [news, setNews] = useState<DomainNews[]>([])

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await newsAPI();
        // console.log(response.news)
        setNews(response.news || [])
      } catch (error) {
        console.log(error);
      }
    }
    fetchNews()
  }, [])

  return (
    <main className={s.main}>
      {news.length > 0 ? <NewsBanner item={news[0]}/> : null}
      <NewsList news={news}/>
    </main>
  )
}
