import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { env } from 'process';
const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
// const page = 1;

// https://api.themoviedb.org/3/movie/popular?api_key=<<apikey>>&language=en-US&page=1
export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
    endpoints: (builder) => ({

        //* Get genres 
        getGenres: builder.query({
            query: () => `genre/movie/list?api_key=${tmdbApiKey}`
        }),



        //* Get movies by [Type]
        getMovies: builder.query({
            query: ({ genreIdOrCategoryName, page, searchQuery }) => {

                //* Get Movies by search
                if (searchQuery) {
                    return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
                }

                //* Get movie by category
                if (genreIdOrCategoryName && typeof genreIdOrCategoryName === "string") {
                    return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`
                }

                // console.log(genreIdOrCategoryName)
                // 12,23
                //* Get movie by Genre 
                if (genreIdOrCategoryName && typeof genreIdOrCategoryName === "number") {
                    // console.log("shubham")
                    return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`
                }
                //* Get popular movies
                return `movie/popular?page=${page}&api_key=${tmdbApiKey}`
            }
        }),


        //* Get MovieInformation of Movie
        getMovie: builder.query({
            query: (id) => `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`
        }),

        //* Get User Specific list
        getList: builder.query({
            query: ({listName, accountId, sessionId, page}) => `/account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`
        }),



        getRecommendations: builder.query({
            query: ({ movie_id, list }) => `/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`
        }),

        //* Get Actor details by their ids.
        getActorDetails: builder.query({
            query: ( id ) => `/person/${id}?api_key=${tmdbApiKey}`
        }),

        //* Get Movies by actor id
        getMoviesByActorId: builder.query({
            query : ({id, page}) => `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`
        })
    }),
});


export const {
    useGetMoviesQuery,
    useGetGenresQuery,
    useGetMovieQuery,
    useGetRecommendationsQuery,
    useGetActorDetailsQuery,
    useGetMoviesByActorIdQuery,
    useGetListQuery
} = tmdbApi;