import s from './styles.module.css'

type Props = {
  categories: string[]
  selectedCategory: string
  setSelectedCategory: (value: string) => void
}

export const Categories = ({categories, selectedCategory, setSelectedCategory}: Props) => {

  return (
    <div className={s.categories}>
      {categories.map(category => {
        return (
          <button 
            key={category}
            className={selectedCategory === category ? s.active : s.item} 
            onClick={() => setSelectedCategory(category)}
          >{category}</button>
        )
      })}
    </div>
  )
}
