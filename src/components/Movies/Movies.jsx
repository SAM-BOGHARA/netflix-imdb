import React, { useState } from 'react';
import { useGetMoviesQuery } from '../../services/TMDB';
import { MovieList, Pagination , FeaturedMovie} from '..';
import { Box, CircularProgress, Typography, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
const Movies = () => {
    const [page, setPage] = useState(1)
    const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory)
    const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });
    const isLargeDevice = useMediaQuery((theme) => theme.breakpoints.only('lg'));
    const numberOfMoviesToShowByScreenSize = isLargeDevice ? 17 : 19
    // console.log(data)

    if (isFetching) {
        return (
            <Box display="flex" justifyContent="center">
                <CircularProgress size="4rem" />
            </Box>
        )
    }
    if (!data.results.length) {
        return (
            <Box display="flex" alignItems="center" mt="20px">
                <Typography variant='h4' >
                    No movies that match that name.
                    <br />
                    Please search for something else.
                </Typography>
            </Box>
        )
    }

    if (error) return "An error has occured.";

    return (
        <>
        <FeaturedMovie movie = {data.results[0]} />
            <MovieList  movies={data} numberOfMovies={numberOfMoviesToShowByScreenSize} excludeFirst />
            <Pagination currentPage={ page } setPage = {setPage} totalPages = { data?.total_pages} />
        </>



    )


}

export default Movies;


// const { data, isLoading, isError, error, response } = useGetMoviesQuery();

// if (isLoading) {
//     return <div>Loading...</div>;
// }

// if (isError) {
//     console.log(error.message)
//     return <div>Error: {error.message}</div>;
// }
// console.log(response)
// console.log(data);


// return <div>Movies</div>;