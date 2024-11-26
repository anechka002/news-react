import { useEffect, useState } from 'react';
import s from './styles.module.css';
import { newsAPI } from '../../api/apiNews';
import { DomainNews } from '../../types/types';
import { NewsBanner } from '../../components/NewsBanner/NewsBanner';
import { NewsList } from '../../components/NewsList/NewsList';
import { Skeleton } from '../../components/Skeleton/Skeleton';
import { Pagination } from '../../components/Pagination/Pagination';

export const Main = () => {
  const [news, setNews] = useState<DomainNews[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = 10;
  const pageSize = 10;

  const fetchNews = async (currentPage: number) => {
    try {
      setIsLoading(true)
      const response = await newsAPI(currentPage, pageSize);
      setNews(response.news || []);
      // setIsLoading(false)
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if(currentPage < totalPages) {
      setCurrentPage(prev => prev + 1)
    }
  }

  const handlePreviousPage = () => {
    if(currentPage > 1) {
      setCurrentPage(prev => prev - 1)
    }
  }

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <main className={s.main}>
      {news.length > 0 && !isLoading ? (
        <NewsBanner item={news[0]} />
      ) : (
        <Skeleton count={1} type={'banner'} />
      )}

      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageClick={handlePageClick} 
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
      />

      {!isLoading ? (
        <NewsList news={news} />
      ) : (
        <Skeleton count={10} type={'item'} />
      )}

      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageClick={handlePageClick} 
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
      />

    </main>
  );
};
