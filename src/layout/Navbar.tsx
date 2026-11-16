import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { LogOut, User } from 'lucide-react';
import React from 'react'

const Navbar = () => {
  return (
  <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
          Admin Pannel
          </Typography>
         
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
             <User />
            </IconButton>
              <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
             <LogOut />
            </IconButton>
          </Box>
          
        </Toolbar>
      </AppBar>

    </Box>
  )
}

export default Navbar