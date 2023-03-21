import React, { useEffect, useContext } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { ColorModeContext } from '../utils/ToggleColorMode'
import { fetchToken } from '../utils';
import { useNavigate } from 'react-router-dom';
import { selectGenreOrCategory, searchMovie } from '../features/createGenreOrCategory';
import { useDispatch } from 'react-redux';

const useAlan = () => {
    const { setMode } = useContext(ColorModeContext);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    useEffect(() => {
        alanBtn({
            key: process.env.REACT_APP_ALAN_KEY,
            onCommand: ({ command, mode, genres, genreOrCategory, query }) => {
                if (command === 'chooseGenre' || command === 'recommendMovie') {

                    const foundGenre = genres.find((g) => g.name.toLowerCase() === genreOrCategory.toLowerCase());
                    if (foundGenre) {
                        navigate('/')
                        dispatch(selectGenreOrCategory(foundGenre.id))
                    } else if (genreOrCategory) {
                        const category = genreOrCategory.startsWith('top') ? 'top_rated' : genreOrCategory;
                        navigate('/')
                        dispatch(selectGenreOrCategory(category))
                    }
                    console.log(command, genreOrCategory)
                } else if (command === 'changeMode') {
                    if (mode === 'light') {
                        setMode('light')
                    } else {
                        setMode('dark')
                    }
                } else if (command === 'login') {
                    fetchToken();
                } else if (command === 'logout') {
                    localStorage.clear();
                    window.location.href = '/';
                } else if (command === 'search') {
                    navigate('/')
                    dispatch(searchMovie(query));
                }
            }
        });
    }, []);
}

export default useAlan;