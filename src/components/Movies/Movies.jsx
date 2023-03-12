import React,{useState} from 'react';
import { useGetMoviesQuery } from '../../services/TMDB';
import { MovieList } from '..';
import { Box, CircularProgress, Typography } from '@mui/material';
import { selectGenreOrCategory } from '../../features/createGenreOrCategory';
import { useSelector } from 'react-redux';
const Movies = () => {
    const [page, setpage] = useState(1)
    const { genreIdOrCategoryName , searchQuery } = useSelector((state) => state.currentGenreOrCategory)
    const { data, error, isFetching } = useGetMoviesQuery({genreIdOrCategoryName, page , searchQuery});
    console.log(data)

    if (isFetching) {
        return (
            <Box dislay="flex" justifyContent="center">
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

        <MovieList movies={data} />

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