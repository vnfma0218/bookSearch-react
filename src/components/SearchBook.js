import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import './SearchBook.css';
export default function SearchBook(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const searchSubmitHandler = async (e) => {
    e.preventDefault();

    const response = await axios.get(
      'https://dapi.kakao.com/v3/search/book?target=title',
      {
        method: 'GET',
        params: { query: searchTerm },
        headers: {
          Authorization: `KakaoAK ${process.env.REACT_APP_KEY}`,
        },
      }
    );
    const data = await response.data.documents;
    console.log(response);
    props.setBookList(data);
    setSearchTerm('');
  };
  return (
    <section className='search__container'>
      <h1>책검색하기</h1>
      <form onSubmit={searchSubmitHandler}>
        {/* <Input
          id='standard-search'
          label='Search field'
          type='search'
          variant='standard'
          placeholder='Search your books'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        /> */}
        <TextField
          id='outlined-search'
          className='search-input'
          label='Search'
          type='search'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant='contained' onClick={searchSubmitHandler}>
          검색
        </Button>
      </form>
    </section>
  );
}
