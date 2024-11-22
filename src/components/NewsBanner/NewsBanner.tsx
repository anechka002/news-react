import { formatTimeAgo } from '../../helpers/formatTimeAgo'
import { DomainNews } from '../../types/types'
import { Image } from '../Image/Image'
import s from './styles.module.css'

type Props = {
  item: DomainNews
}

export const NewsBanner = ({item}: Props) => {
  return (
    <div className={s.banner}>
      <Image image={item.image}/>
      <h3 className={s.title}>{item.title}</h3>
      <p className={s.extra}>{formatTimeAgo(item.published)} by {item.author}</p>
    </div>
  )
}
