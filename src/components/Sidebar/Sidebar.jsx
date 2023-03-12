import React from 'react'
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress } from '@mui/material'
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles'
import './styles.css'
import { useGetGenresQuery } from '../../services/TMDB';
import genreIcons from '../../assets/assets/genres'
import { useDispatch, useSelector } from 'react-redux';
import { selectGenreOrCategory } from '../../features/createGenreOrCategory';


const categories = [
    { label: "Popular", value: "popular" },
    { label: "Top Rated", value: "top_rated" },
    { label: "Upcoming", value: "upcoming" },

];


const redLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const blueLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';
const Sidebar = ({ setMobileOpen }) => {
    const theme = useTheme();
    const { data, isFetching, error, } = useGetGenresQuery();
    const dispatch = useDispatch();
    const genreIdOrCategoryName = useSelector((state) => state.currentGenreOrCategory)
    console.log(genreIdOrCategoryName)
    console.log(data)
    return (
        <>
            <Link to="/" className='image-link'>
                <img className='image' src={theme.palette.mode === 'light' ? redLogo : blueLogo} alt="Filmpire Logo" />
            </Link>
            <Divider />
            <List>
                <ListSubheader>Categories</ListSubheader>

                {categories.map(({ label, value }) => (
                    <Link className='links' key={label} to="/" >
                        <ListItem onClick={() => dispatch(selectGenreOrCategory(value))} button >
                            <ListItemIcon>
                                <img className='genre-images' src={genreIcons[label.toLowerCase()]} alt="" />
                            </ListItemIcon>
                            <ListItemText primary={label} />
                        </ListItem>
                    </Link>
                ))
                }
            </List>
            <Divider />
            <List>
                <ListSubheader>Genres</ListSubheader>
                {isFetching
                    ?
                    <Box dislay="flex" justifyContent="center">
                        <CircularProgress size="4rem" />
                    </Box>
                    :
                    data.genres.map(({ name, id }) => (
                        <Link className='links' key={name} to="/" >
                            <ListItem onClick={() => dispatch(selectGenreOrCategory(id))} button >
                                <ListItemIcon>
                                    <img className='genre-images' src={genreIcons[name.toLowerCase()]} alt="" />
                                </ListItemIcon>
                                <ListItemText primary={name} />
                            </ListItem>
                        </Link>
                    ))}
            </List>
        </>
    )
}

export default Sidebar;

