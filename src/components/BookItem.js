import React, { useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './BookItem.css';
import { pink } from '@mui/material/colors';

export default function BookItem({
  title,
  image,
  price,
  content,
  date,
  isbn,
  marked,
  addFavorite,
  deleteFavorite,
}) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const addFavotieHandler = (isbn) => {
    // console.log(isbn);
    //add to localStroage
    if (marked) {
      deleteFavorite(isbn);
    } else {
      addFavorite(isbn);
    }
  };

  return (
    <Grid item>
      <Card className='book-item' sx={{ width: 300, maxWidth: 350 }}>
        <CardHeader
          title={title.length > 10 ? `${title.substring(0, 9)}..` : title}
          subheader={date.split('T')[0]}
        />
        <CardMedia
          component='img'
          sx={{ width: 170, height: 230, margin: 'auto' }}
          image={image}
          alt={title}
        />

        <CardActions disableSpacing>
          <IconButton
            aria-label='add to favorites'
            onClick={() => addFavotieHandler(isbn)}
          >
            <FavoriteIcon sx={marked ? { color: pink[500] } : null} />
          </IconButton>
          <IconButton aria-label='share'>
            <ShareIcon />
          </IconButton>
          <IconButton
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            {title.length > 10 ? (
              <Typography variant='h6' sx={{ marginBottom: 2 }}>
                {title}
              </Typography>
            ) : null}
            <Typography variant='h7'>가격:</Typography>
            <Typography variant='h7' color='#e52d38'>
              {price}
            </Typography>
            <Typography paragraph sx={{ marginTop: 2 }}>
              {content}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
}
