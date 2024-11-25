import { useEffect, useState } from 'react';
import s from './styles.module.css';
import { newsAPI } from '../../api/apiNews';
import { DomainNews } from '../../types/types';
import { NewsBanner } from '../../components/NewsBanner/NewsBanner';
import { NewsList } from '../../components/NewsList/NewsList';
import { Skeleton } from '../../components/Skeleton/Skeleton';

export const Main = () => {
  const [news, setNews] = useState<DomainNews[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true)
        const response = await newsAPI();
        setNews(response.news || []);
        // setIsLoading(false)
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <main className={s.main}>
      {news.length > 0 && !isLoading ? (
        <NewsBanner item={news[0]} />
      ) : (
        <Skeleton count={1} type={'banner'} />
      )}

      {!isLoading ? (
        <NewsList news={news} />
      ) : (
        <Skeleton count={10} type={'item'} />
      )}
    </main>
  );
};
