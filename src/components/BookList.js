import React from 'react';
import Grid from '@mui/material/Grid';
import BookItem from './BookItem';
import { Card, CardContent, Typography } from '@mui/material';
export default function BookList({
  bookList,
  addFavoriteList,
  deleteFavoriteList,
}) {
  const addFavorite = (isbn) => {
    addFavoriteList(isbn);
  };
  const deleteFavorite = (isbn) => {
    deleteFavoriteList(isbn);
  };

  if (bookList.length === 0) {
    return (
      <Card sx={{ maxWidth: 450, margin: 'auto', marginTop: 30 }}>
        <CardContent>
          <Typography variant='h5' component='div' sx={{ textAlign: 'center' }}>
            검색해주세요
          </Typography>
        </CardContent>
      </Card>
    );
  }
  return (
    <Grid sx={{ flexGrow: 1, marginTop: 10 }} container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent='center' spacing={10}>
          {bookList &&
            bookList.map((book) => (
              <BookItem
                key={book.isbn}
                title={book.title}
                price={book.sale_price}
                image={book.thumbnail}
                content={book.contents}
                date={book.datetime}
                isbn={book.isbn}
                marked={book.marked}
                addFavorite={addFavorite}
                deleteFavorite={deleteFavorite}
              />
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
