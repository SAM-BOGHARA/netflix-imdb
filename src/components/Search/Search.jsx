import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import './styles.css';
import { searchMovie } from '../../features/createGenreOrCategory';

const Search = () => {
    const [query, setquery] = useState('')
    const dispatch = useDispatch();
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            console.log("shubham", query)
            dispatch(searchMovie(query));
        }
    }

    return (
        <div className='search-container'>
            <TextField
                onKeyPress={handleKeyPress}
                value={query}
                variant="standard"
                onChange={(e) => setquery(e.target.value)}
                InputProps={{
                    className : "input",
                    startAdornment: (
                        <InputAdornment position='start'>
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
            />
        </div>
    )
}

export default Search;