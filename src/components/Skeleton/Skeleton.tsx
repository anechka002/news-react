import s from './styles.module.css'

type Props = {
  count: number
  type: string
}

export const Skeleton = ({count=1, type='banner'}: Props) => {


  return (
    <>
      {count > 1 ? (
        <ul className={s.list}>
          {[...Array(count)].map((_, index) => (
            <li key={index} className={type === 'banner' ? s.banner : s.item}></li>
          ))}
        </ul>
      ) : (
        <li className={type === 'banner' ? s.banner : s.item}></li>
      )}
    </>
  )
}
