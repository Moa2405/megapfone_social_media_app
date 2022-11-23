import React from "react";
// import { useState, useEffect } from "react";
// import IconButton from "@mui/material/IconButton";
// import SearchIcon from "@mui/icons-material/Search";
import { TextField, InputAdornment } from "@mui/material";


const SearchBar = () => {

    // const [searchQuery, setSearchQuery] = useState("");
    // const dataFiltered = filterData(searchQuery, data);

    // const filterData = (query, data) => {
    //     if (!query) {
    //         return data;
    //     } else {
    //         return data.filter((d) => d.toLowerCase().includes(query));
    //     }
    // };

    return (
        <form>
            <TextField fullWidth id="outlined-search" size="small" label="Search profiles" type="search" />
        </form>
    );
}

export default SearchBar;