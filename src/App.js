import { Container } from '@mui/material';
import { useState } from 'react';
import './App.css';
import BookList from './components/BookList';
import SearchBook from './components/SearchBook';
function App() {
  const [bookList, setBookList] = useState([]);
  return (
    <Container maxwidth='sm'>
      <SearchBook setBookList={(data) => setBookList(data)} />
      <BookList bookList={bookList} />
    </Container>
  );
}

export default App;
