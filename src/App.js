import "./App.css";
import { Container, CircularProgress, Alert, Button } from "@mui/material";
import WeatherCard from "./component/Cardcontainer";
import SearchBar from "./component/SearchBar";
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [unit, setUnit] = useState("C");

    const fetchWeatherData = async (signal, city = "Cairo") => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f2157b51a882f5001b7e91ae8eb50f93`,
                { signal }
            );

            const temperature = Math.round(response.data.main.temp - 273.15);
            const minTemp = Math.round(response.data.main.temp_min - 273.15);
            const maxTemp = Math.round(response.data.main.temp_max - 273.15);

            const data = {
                city: response.data.name,
                temperature,
                minTemp,
                maxTemp,
                humidity: response.data.main.humidity,
                windSpeed: response.data.wind.speed,
                weatherCondition: response.data.weather[0].main,
                icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
            };

            setWeatherData(data);
            setLoading(false);
            setError(null);
        } catch (error) {
            if (error.name === 'AbortError') return;

            let errorMessage = 'Failed to fetch weather data. Please try again later.';
            if (error.response) {
                if (error.response.status === 401) {
                    errorMessage = 'Invalid API key. Please check your API key.';
                } else if (error.response.status === 404) {
                    errorMessage = 'City not found. Please check the city name.';
                } else if (error.response.status === 429) {
                    errorMessage = 'Too many requests. Please try again later.';
                }
            } else if (error.request) {
                errorMessage = 'Network error. Please check your internet connection.';
            }

            console.error('Error fetching weather data:', error);
            setError(errorMessage);
            setLoading(false);
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        fetchWeatherData(signal);

        return () => {
            controller.abort();
        };
    }, []);

    const handleRetry = () => {
        setLoading(true);
        setError(null);
        const controller = new AbortController();
        const signal = controller.signal;
        fetchWeatherData(signal);
    };

    const handleSearch = (city) => {
        setLoading(true);
        setError(null);
        const controller = new AbortController();
        const signal = controller.signal;
        fetchWeatherData(signal, city);
    };

    const toggleUnit = () => {
        setUnit(unit === "C" ? "F" : "C");
    };

    return (
        <div className="background-container">
    <div className="flex flex-col items-center justify-center min-h-screen bg-opacity-80">
        <Container
            maxWidth="md"
            className="relative px-4 sm:px-6 lg:px-8"
        >
            <SearchBar onSearch={handleSearch} />
            {loading ? (
                <CircularProgress className="text-yellow-400" />
            ) : error ? (
                <div className="text-center">
                    <Alert severity="error" className="mb-4">
                        {error}
                    </Alert>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleRetry}
                    >
                        Retry
                    </Button>
                </div>
            ) : (
                <WeatherCard weather={weatherData} unit={unit} onToggleUnit={toggleUnit} />
            )}
        </Container>
    </div>
</div>

    );
}

export default App;
