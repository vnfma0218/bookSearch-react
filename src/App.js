import { CircularProgress, Container } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import './App.css';
import BookList from './components/BookList';
import SearchBook from './components/SearchBook';
import useBookSearch from './hooks/useBookSearch';
function App() {
  const [favoriteList, setFavoriteList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const storage = localStorage.getItem('favorite');
    if (storage) setFavoriteList(JSON.parse(storage));
  }, []);

  const { bookList, setBookList, hasMore, loading, error } = useBookSearch(
    searchTerm,
    pageNumber,
    favoriteList
  );

  const persistBookmarks = useCallback(() => {
    localStorage.setItem('favorite', JSON.stringify(favoriteList));
  }, [favoriteList]);

  useEffect(() => {
    // setState는 비동기이기 때문에
    //useEffect dependecncy를 활용하여 동기적으로 처리..
    persistBookmarks();
  }, [favoriteList, persistBookmarks, setBookList]);

  const addFavorite = (isbn) => {
    setFavoriteList((prev) => [...prev, isbn]);
    persistBookmarks();
  };

  const deleteFavorite = (isbn) => {
    setFavoriteList(favoriteList.filter((el) => el !== isbn));
  };

  return (
    <Container maxwidth='sm'>
      <SearchBook
        debouncedSearchTerm={(debouncedSearchTerm) =>
          setSearchTerm(debouncedSearchTerm)
        }
      />
      {bookList && (
        <BookList
          bookList={bookList}
          hasMore={hasMore}
          loading={loading}
          setPageNumber={setPageNumber}
          favoriteList={favoriteList}
          addFavoriteList={addFavorite}
          deleteFavoriteList={deleteFavorite}
        />
      )}
      {loading && <CircularProgress />}
    </Container>
  );
}

export default App;
