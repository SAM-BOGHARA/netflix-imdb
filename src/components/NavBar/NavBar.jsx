import React, { useState } from 'react';
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles'
import './styles.css'
import { Sidebar, Search } from "..";


const NavBar = () => {
  const [mobileOpen, setmobileOpen] = useState(false);

  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const isAuthenticated = false;
  return (
    <>
      <AppBar position="fixed" >
        <Toolbar className='toolbar'>
          {isMobile && (
            <IconButton
              color='inherit'
              edge='start'
              style={{ outline: 'none' }}
              onClick={() => setmobileOpen((prevmobileOpen) => !prevmobileOpen)} className='menubutton' >
              <Menu />
            </IconButton>
          )}
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => { }} >
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search/>}
          <div>
            {!isAuthenticated ? (
              <Button color='inherit' onClick={() => { }}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color='inherit'
                component={Link}
                to={`/profile/:id`}
                className='menubutton'
                onClick={() => { }} >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar style={{ width: 30, height: 30 }} alt="Profile" src='https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png' />
              </Button>
            )
            }
          </div>
          {isMobile && 'Search...'}
        </Toolbar>
      </AppBar>
      <div>
        <nav className='drawer'>
          {isMobile ? (
            <Drawer
              varient="temporay"
              anchor='right'
              open={mobileOpen}
              onClose={() => setmobileOpen((prevmobileOpen) => !prevmobileOpen)}
              classes={{
                paper: {
                  className: "drawer-paper"
                }
              }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar
                setmobileOpen={setmobileOpen}
              />
            </Drawer>
          ) : (
            <Drawer className='drawer-paper' variant='permanent' open >
              <Sidebar setMobileOpen={setmobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  )
}

export default NavBar;