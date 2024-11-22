import { DomainNews } from '../../types/types'
import { NewsItem } from '../NewsItem/NewsItem'
import s from './styles.module.css'

type Props = {
  news: DomainNews[]
}

export const NewsList = ({news}: Props) => {
  return (
    <div className={s.list}>
      {news.map(el => <NewsItem key={el.id} item={el}/>)}
    </div>
  )
}
