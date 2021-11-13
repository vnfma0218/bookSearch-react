import { Container } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import './App.css';
import BookList from './components/BookList';
import SearchBook from './components/SearchBook';
function App() {
  const [bookList, setBookList] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    const storage = localStorage.getItem('favorite');
    if (storage) setFavoriteList(JSON.parse(storage));
  }, []);

  const persistBookmarks = useCallback(() => {
    localStorage.setItem('favorite', JSON.stringify(favoriteList));
  }, [favoriteList]);

  useEffect(() => {
    // setState는 비동기이기 때문에
    //useEffect dependecncy를 활용하여 동기적으로 처리..
    persistBookmarks();
    setBookList((prev) =>
      prev.map((b) => {
        if (favoriteList.some((isbn) => isbn === b.isbn)) {
          return { ...b, marked: true };
        } else {
          return { ...b, marked: false };
        }
      })
    );
  }, [favoriteList, persistBookmarks]);

  const addFavorite = (isbn) => {
    setFavoriteList((prev) => [...prev, isbn]);
  };

  const deleteFavorite = (isbn) => {
    //delete from array state
    //and localstorage
  };

  const getBookList = (data) => {
    const markedBookList = data.map((b) => {
      if (favoriteList.some((isbn) => isbn === b.isbn)) {
        return { ...b, marked: true };
      } else {
        return { ...b, marked: false };
      }
    });
    setBookList(markedBookList);
  };

  return (
    <Container maxwidth='sm'>
      <SearchBook setBookList={(data) => getBookList(data)} />
      <BookList
        bookList={bookList}
        favoriteList={favoriteList}
        addFavoriteList={addFavorite}
        deleteFavoriteList={deleteFavorite}
      />
    </Container>
  );
}

export default App;
