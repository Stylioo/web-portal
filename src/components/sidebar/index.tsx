import React, { useState } from 'react';
import { CssBaseline, Box, Drawer, AppBar, Toolbar, List, Typography, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, Container, Avatar, Tooltip, MenuItem, IconButton, useMediaQuery } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MenuIcon from '@mui/icons-material/Menu';

import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';

const drawerWidth = 220;
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const SidebarItems = ['Home', 'Appointment', 'Clients', 'Beauticians']

interface sidebarPropType {
    children: React.ReactNode
}

export default function SideBar({ children }: sidebarPropType) {

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{

                    }}>
                        <IconButton
                            sx={{
                                marginRight: '1.5rem'
                            }}
                            onClick={() => setOpenDrawer(!openDrawer)}
                        ><MenuIcon sx={{
                            display: isMobile ? 'block' : 'none',
                            color: 'white',
                            fontSize: '1.5rem',
                        }} /></IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                        >
                            Stylioo
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="https://stylioo.blob.core.windows.net/images/profile.jpeg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Drawer
                variant={isMobile ? "temporary" : "permanent"}
                open={openDrawer}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}

            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {SidebarItems.map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {SidebarItems.map((text, index) => (
                            <ListItem key={text} disablePadding>
                                {/* <ListItemButton> */}
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <Link
                                    to={text === 'Home' ? '/' : `/${text.toLowerCase()}`}
                                >
                                    <ListItemText primary={text} />
                                </Link>
                                {/* </ListItemButton> */}
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: '100dvh' }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}