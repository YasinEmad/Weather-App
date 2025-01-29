import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const SearchBar = ({ onSearch }) => {
    const [city, setCity] = useState("");
    const [error, setError] = useState(false);

    const handleSearch = () => {
        if (city.trim()) {
            setError(false);
            onSearch(city);
            setCity("");
        } else {
            setError(true);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full mb-6 space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
            <TextField
                label="Enter City"
                variant="outlined"
                placeholder="Search for a city..."
                value={city}
                onChange={(e) => {
                    setCity(e.target.value);
                    setError(false);
                }}
                error={error}
                helperText={error ? "City name is required" : ""}
                sx={{
                    "& .MuiInputBase-input": { color: "white" },
                    "& .MuiInputLabel-root": { color: "white" },
                    "& .MuiFormHelperText-root": { color: "red" },
                    backgroundColor: "rgba(55, 65, 81, 0.9)",
                    borderRadius: "8px",
                }}
                fullWidth
            />
            <Button
                variant="contained"
                onClick={handleSearch}
                sx={{
                    background: "linear-gradient(to right, #32CD32, #1E90FF)",
                    color: "white",
                    fontWeight: "bold",
                    "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
                    },
                }}
                className="w-full sm:w-auto"
            >
                Search
            </Button>
        </div>
    );
};

export default SearchBar;
