import React, { useContext, useEffect, useState } from 'react';
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7, Login } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles'
import { fetchToken, createSessionId, movieApi } from '../../utils';
import { Sidebar, Search } from "..";
import { useDispatch, useSelector } from 'react-redux';
import { setUser, userSelector } from '../../features/auth';
import '../global.css';
import { ColorModeContext } from '../../utils/ToggleColorMode';

const NavBar = () => {
  const [mobileOpen, setmobileOpen] = useState(false);
  const { isAuthenticated, user } = useSelector(userSelector)
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const dispatch = useDispatch();
  const token = localStorage.getItem("request_token");
  const sessionIdFromLocalStorage = localStorage.getItem("session_id");
  const colorMode = useContext(ColorModeContext)
  // console(user)

  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          // console.log(1)
          const { data: userData } = await movieApi.get(`/account?session_id=${sessionIdFromLocalStorage}`);
          dispatch(setUser(userData));
        } else {
          // console.log(2)
          const sessionId = await createSessionId();
          const { data: userData } = await movieApi.get(`/account?session_id=${sessionId}`);
          dispatch(setUser(userData));
        }
      }
    }
    logInUser();
  }, [token]);

  return (
    <>
      <AppBar position="fixed" >
        <Toolbar className='toolbar'>
          {isMobile && (
            <IconButton
              color='inherit'
              edge='start'
              style={{ outline: 'none' }}
              onClick={() => setmobileOpen((prevmobileOpen) => !prevmobileOpen)}
              className='menubutton' >
              <Menu />
            </IconButton>
          )}
          <IconButton color="inherit" sx={{ ml: 2 }} onClick={ colorMode.toggleColorMode } >
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color='inherit' onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color='inherit'
                component={Link}
                to={`/profile/${user.id}`}
                className='menubutton'
                onClick={() => { }} >
                {!isMobile && <>My Movies &nbsp;</>}
                  <Avatar style={{ width: 30, height: 30 }} alt="Profile"
                    src={`https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar_path}`} />
              </Button>
            )
            }
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className='drawer'>
          {isMobile ? (
            <Drawer
              varient="temporary"
              anchor='right'
              open={mobileOpen}
              onClose={() => setmobileOpen((prevmobileOpen) => !prevmobileOpen)}
              classes={{
                paper: {
                  className: 'drawer-paper'
                }
              }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar
                setMobileOpen={setmobileOpen}
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