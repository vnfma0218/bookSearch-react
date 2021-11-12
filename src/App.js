import { useState } from 'react';
import './App.css';
import SearchBook from './components/SearchBook';
function App() {
  const [bookList, setBookList] = useState([]);
  console.log(bookList);
  return (
    <div>
      <SearchBook setBookList={(data) => setBookList(data)} />
    </div>
  );
}

export default App;
