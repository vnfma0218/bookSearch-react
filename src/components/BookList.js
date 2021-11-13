import React from 'react';
import Grid from '@mui/material/Grid';
import BookItem from './BookItem';
export default function BookList({ bookList }) {
  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent='center' spacing={2}>
          {bookList &&
            bookList.map((book) => (
              <BookItem
                key={book.isbn}
                title={book.title}
                price={book.sale_price}
                image={book.thumbnail}
                content={book.contents}
                date={book.datetime}
              />
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
