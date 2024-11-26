import s from './styles.module.css'

type Props = {
  totalPages: number
  currentPage: number
  handlePageClick: (pageNumber: number) => void
  handlePreviousPage: () => void
  handleNextPage: () => void
}

export const Pagination = ({totalPages, currentPage, handlePageClick, handlePreviousPage, handleNextPage, }: Props) => {
  return (
    <div className={s.pagination}>
      <button disabled={currentPage <= 1} onClick={handlePreviousPage} className={s.arrow}>{'<'}</button>
      <div className={s.list}>
        {[...Array(totalPages)].map((_, index) => (
          <button 
            onClick={() => handlePageClick(index + 1)} 
            key={index} 
            className={s.pageNumber}
            disabled={index + 1 === currentPage}
          >{index + 1}</button>
        ))}
      </div>
      <button disabled={currentPage >= totalPages} onClick={handleNextPage} className={s.arrow}>{'>'}</button>
    </div>
  )
}
