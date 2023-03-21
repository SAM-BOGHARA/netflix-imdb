import React from 'react';
import { Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';




const Pagination = ({ currentPage, totalPages, setPage }) => {

    const theme = useTheme();

    if (totalPages === 0) return null;

    const handlePrev = () => {
        if (currentPage !== 1) {
            setPage((prevPage) => prevPage - 1)
        }

    }

    const handleNext = () => {
        if (currentPage !== totalPages) {
            setPage((prevPage) => prevPage + 1)
        }

    }



    return (
        <>
            <div className="pagination--container">
                {currentPage !== 1 && <Button onClick={handlePrev} className="pagination--button" variant='contained' type='button' style={{ color: theme.palette.color }}>Prev</Button>}
                <Typography variant='h4' className='pagination--pageNumber'>{currentPage}</Typography>
                {currentPage !== totalPages && <Button onClick={handleNext} className="pagination--button" variant='contained' type='button' style={{ color: theme.palette.color }}>Next</Button>}
            </div>
        </>
    )
}

export default Pagination;