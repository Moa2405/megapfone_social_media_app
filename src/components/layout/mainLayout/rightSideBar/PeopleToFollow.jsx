import React from "react";
import { Box, Avatar, Button, List, ListItem, Paper, Typography, ListItemButton } from "@mui/material"
import { useTheme } from "@mui/system";
import { Link } from "react-router-dom";

const PeopleToFollow = () => {

    const theme = useTheme();

    return (
        <Paper sx={{
            width: '100%',
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            borderRadius: "0.25rem",

        }}
        >
            <List>
                <ListItem>
                    <Typography variant="h6" component="h2">
                        People to follow
                    </Typography>
                </ListItem>
                <ListItemButton
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Link to="/profile"
                        style={{
                            textDecoration: "none",
                            color: "inherit",
                            // backgroundColor: "inherit",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                            }}
                        >
                            <Avatar sx={{ width: 30, height: 30 }}>HK</Avatar>
                            <Typography
                                sx={{
                                    paddingLeft: "0.5rem",
                                }}
                                noWrap
                                variant="body2"
                                fontWeight="bold"
                                component="p"
                            >
                                Hammad Khan
                            </Typography>

                        </Box>
                    </Link>
                    <Button variant="outlined" size="small"
                        sx={{
                            color: theme.palette.action.active,
                            borderColor: theme.palette.action.active,
                        }}
                        onClick={(e) => e.target.innerText = "Following"}
                    >
                        Follow
                    </Button>
                </ListItemButton>
                <ListItem>Item 2</ListItem>
                <ListItem>Item 3</ListItem>
            </List>
        </Paper>
    );
}



export default PeopleToFollow;