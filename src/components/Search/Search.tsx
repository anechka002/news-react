import React, { ChangeEvent } from 'react'
import s from './styles.module.css'

type Props = {
  keywords: string
  setKeywords: (value: string) => void
}

export const Search = ({keywords, setKeywords}: Props) => {

  const keywordsHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setKeywords(e.target.value)
  }

  return (
    <div className={s.search}>
      <input 
        type="text" 
        value={keywords} 
        className={s.input} 
        onChange={keywordsHandler}
        placeholder='Search'
      />
    </div>
  )
}
