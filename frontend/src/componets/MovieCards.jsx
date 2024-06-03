/* eslint-disable react/prop-types */
import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import { formatDuration } from '../utils/utils'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useMediaQuery } from '@mui/material';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import ActiveBox from './ActiveBox';
import { useState, useEffect } from 'react';

const MovieCards = ({ movies }) => {
    const isXS = useMediaQuery('(max-width:600px)');
    const [favorites, setFavorites] = useState([]);
    const [watchLater, setWatchLater] = useState([]);

    useEffect(() => {
        const favoriteList = JSON.parse(localStorage.getItem('favorites')) || [];
        const watchLaterList = JSON.parse(localStorage.getItem('watchLater')) || [];
        setFavorites(favoriteList);
        setWatchLater(watchLaterList);
    }, []);

    const handleWatchLater = (movie) => {
        let watchLaterList = JSON.parse(localStorage.getItem('watchLater')) || [];
        if (watchLaterList.some(watch => watch.id === movie.id)) {
            watchLaterList = watchLaterList.filter(watch => watch.id !== movie.id);
        } else {
            watchLaterList.push(movie);
        }
        setWatchLater(watchLaterList);
        localStorage.setItem('watchLater', JSON.stringify(watchLaterList));
    };

    const handleFavorite = (movie) => {
        let favoriteList = JSON.parse(localStorage.getItem('favorites')) || [];
        if (favoriteList.some(fav => fav.id === movie.id)) {
            favoriteList = favoriteList.filter(fav => fav.id !== movie.id);
        } else {
            favoriteList.push(movie);
        }
        setFavorites(favoriteList);
        localStorage.setItem('favorites', JSON.stringify(favoriteList));
    };

    const isFavorite = (movieId) => {
        return favorites.some(fav => fav.id === movieId);
    };

    const isWatchLater = (movieId) => {
        return watchLater.some(watch => watch.id === movieId);
    };

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                gap: 3,
                px: { xs: 2, sm: 5 },
                margin: 0,
                alignItems: 'start',
                overflowX: 'auto',
                overflowY: 'hidden',
                display: 'flex',
                flexDirection: isXS ? 'column' : 'row',
                '::-webkit-scrollbar': { display: 'none' },
            }}
        >
            {movies?.map((item) => (
                <Card
                    key={item.id}
                    sx={{
                        minHeight: { xs: '200px', sm: '350px' },
                        minWidth: '240px',
                        width: { xs: '100%', sm: '240px' },
                        border: 'none',
                        position: 'relative',
                        '&:hover .hoverBox': {
                            display: 'block'
                        }
                    }}
                >
                    <CardCover>
                        <img
                            src="https://images.unsplash.com/photo-1542773998-9325f0a098d7?auto=format&fit=crop&w=320"
                            srcSet="https://images.unsplash.com/photo-1542773998-9325f0a098d7?auto=format&fit=crop&w=320&dpr=2 2x"
                            loading="lazy"
                            alt=""
                        />
                    </CardCover>
                    <CardCover
                        sx={{
                            background: `linear-gradient(${isXS ? '90' : '180'}deg, rgba(0,0,0,0.6) 0%, rgba(14,14,48,1) 80%)`,
                            border: '1px solid',
                            borderRadius: { xs: '10px', sm: '5px' }
                        }}
                    />
                    <CardContent
                        sx={{ justifyContent: 'flex-end', flexDirection: { xs: 'row', sm: 'column' }, position: 'relative' }}
                    >
                        <Grid container>
                            <Grid item xs={8} sm={12}>
                                <Stack height={'100%'} p={{ xs: 3, sm: 0 }} spacing={{ xs: 2, sm: 2 }} justifyContent={'center'}>
                                    {item.isNew && (
                                        <Button
                                            variant="contained"
                                            sx={{
                                                fontSize: 12,
                                                height: { sm: 25 },
                                                width: 25,
                                                backgroundColor: 'orangered',
                                                color: 'white',
                                                borderRadius: '5px'
                                            }}
                                        >
                                            New
                                        </Button>
                                    )}
                                    <Typography color={'white'} variant="h5">
                                        {item.title}
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={4} sm={12}>
                                <Stack
                                    spacing={0.5}
                                    height={'100%'}
                                    alignItems={'end'}
                                    pt={1}
                                    justifyContent={{ xs: 'center', sm: 'start' }}
                                    direction={{ xs: 'column', sm: 'row' }}
                                >
                                    <PlayCircleOutlineIcon fontSize="medium" sx={{ color: 'white' }} />
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} component='div' onClick={() => handleWatchLater(item)} >
                                        {isWatchLater(item.id) ? (
                                            <AccessTimeFilledIcon fontSize="medium" sx={{ color: 'white' }} />
                                        ) : (
                                            <AccessTimeIcon fontSize="medium" sx={{ color: 'white' }} />
                                        )}
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} component='div' onClick={() => handleFavorite(item)} >
                                        {isFavorite(item.id) ? (
                                            <FavoriteIcon fontSize="medium" sx={{ color: 'white' }} />
                                        ) : (
                                            <FavoriteBorderIcon fontSize="medium" sx={{ color: 'white' }} />
                                        )}
                                    </Box>
                                </Stack>
                            </Grid>
                        </Grid>
                        <Typography
                            variant={'caption'}
                            sx={{ color: 'white', position: 'absolute', top: 0.5, right: 1 }}
                        >
                            {formatDuration(item.duration)}
                        </Typography>
                    </CardContent>
                    <ActiveBox />
                </Card>
            ))}
        </Box>
    )
}

export default MovieCards;
