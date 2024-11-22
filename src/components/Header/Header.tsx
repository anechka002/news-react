import { useEffect, useState } from 'react'
import { formatDate } from '../../helpers/formatDate'
import s from './styles.module.css'

export const Header = () => {
  const [currentDate, setCurrentDate] = useState<string>(formatDate(new Date))

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(formatDate(new Date))
    }, 24 * 60 * 60 * 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <header className={s.header}>
      <h1 className={s.title}>News React</h1>
      <p className={s.date}>{currentDate}</p>
    </header>
  )
}
