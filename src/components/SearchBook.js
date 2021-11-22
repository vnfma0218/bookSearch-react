import { Button, TextField } from '@mui/material';
import React from 'react';
import './SearchBook.css';
export default function SearchBook(props) {
  return (
    <section className='search__container'>
      <h1>Kakao Book</h1>
      <TextField
        id='outlined-search'
        className='search-input'
        label='Search'
        type='search'
        onChange={(e) => props.debouncedSearchTerm(e.target.value)}
      />
    </section>
  );
}
