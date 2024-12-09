import { useEffect, useState } from 'react';
import s from './styles.module.css';
import { getCategories, newsAPI } from '../../api/apiNews';
import { NewsBanner } from '../../components/NewsBanner/NewsBanner';
import { NewsList } from '../../components/NewsList/NewsList';
import { Skeleton } from '../../components/Skeleton/Skeleton';
import { Pagination } from '../../components/Pagination/Pagination';
import { News } from '../../types/types';
import { Categories } from '../../components/Categories/Categories';
import { Search } from '../../components/Search/Search';
import { useDebounce } from '../../helpers/hooks/useDebounce';

export const Main = () => {
  const [news, setNews] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [keywords, setKeywords] = useState<string>('')

  const totalPages = 10;
  const pageSize = 10;

  const debouncedKeywords = useDebounce(keywords, 1500)

  const fetchNews = async (currentPage: number) => {
    try {
      setIsLoading(true)
      const response = await newsAPI({
        page_number: currentPage, 
        page_size: pageSize,
        category: selectedCategory === 'All' ? null : selectedCategory,
        keywords: debouncedKeywords,
      });
      setNews(response.news || []);
      // setIsLoading(false)
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(['All', ...response.categories]);
    } catch (error) {
      console.log(error);
    } 
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchNews(currentPage);
  }, [currentPage, selectedCategory, debouncedKeywords]);

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

      <Categories 
        categories={categories} 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory}
      />

      <Search keywords={keywords} setKeywords={setKeywords}/>

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
