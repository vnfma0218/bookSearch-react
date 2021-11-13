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

export default function BookItem({ title, image, price, content, date }) {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid item>
      <Card sx={{ width: 300, maxWidth: 350 }}>
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
          <IconButton aria-label='add to favorites'>
            <FavoriteIcon />
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
              <Typography variant='h6' sx={{ marginBottom: 5 }}>
                {title}
              </Typography>
            ) : null}
            <Typography paragraph color='text.secondary'>
              {content}
            </Typography>
            <Typography paragraph color='text.secondary'>
              {content}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
}
