import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function WeatherCard({ weather, unit, onToggleUnit }) {
    const currentDate = new Date();
    const formattedDate = new Intl.DateTimeFormat('en', {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(currentDate);

    const convertTemperature = (temp) => {
        return unit === "C" ? temp : Math.round((temp * 9) / 5 + 32);
    };

    return (
        <Box className="flex items-center justify-center min-h-screen px-4">
            <Card
                sx={{
                    width: "100%",
                    maxWidth: 700,
                    backgroundColor: "#1e293b",
                    color: "#e5e7eb",
                    padding: "2rem",  
                    borderRadius: "1rem",  
                }}
                className="transition-all duration-1000 ease-out transform border-gray-700 rounded-lg shadow-lg basorder hover:scale-105 hover:shadow-2xl"
            >
                <CardContent>
                    <div className="flex flex-col items-center justify-between mb-6 sm:flex-row">
                        <Typography
                            variant="body1"
                            component="div"
                            className="text-lg text-yellow-400"
                        >
                            Date: {formattedDate}
                        </Typography>
                        <Typography
                            variant="h4"
                            component="div"
                            className="mt-2 font-bold text-center text-yellow-400 sm:mt-0"
                        >
                            {weather.city}
                        </Typography>
                    </div>

                    <hr className="my-6 border-yellow-500" />

                    <div className="flex flex-col items-center justify-between sm:flex-row">
                        <div className="flex flex-col items-center mb-6 sm:mb-0">
                            <img
                                src={weather.icon}
                                alt="weather icon"
                                className="w-32 h-32 animate-bounce sm:w-40 sm:h-40"  
                            />
                            <Typography variant="body2" className="text-lg text-center text-gray-300">
                                {weather.weatherCondition}
                            </Typography>
                        </div>

                        <div className="text-center sm:text-right">
                            <Typography
                                variant="h2"
                                component="div"
                                className="text-4xl font-bold text-yellow-400 sm:text-5xl"
                            >
                                {convertTemperature(weather.temperature)}°{unit}
                            </Typography>
                            <Typography variant="body1" className="text-lg text-gray-400">
                                Min: {convertTemperature(weather.minTemp)}°{unit}
                            </Typography>
                            <Typography variant="body1" className="text-lg text-gray-400">
                                Max: {convertTemperature(weather.maxTemp)}°{unit}
                            </Typography>
                            <Typography variant="body1" className="text-lg text-gray-400">
                                Humidity: {weather.humidity}%
                            </Typography>
                            <Typography variant="body1" className="text-lg text-gray-400">
                                Wind: {weather.windSpeed} m/s
                            </Typography>
                        </div>
                    </div>
                </CardContent>

                <Button
                    size="medium"
                    className="mt-6 text-yellow-400 transition-transform duration-300 hover:text-yellow-300 hover:scale-105"
                    onClick={onToggleUnit}
                >
                    Switch to {unit === "C" ? "Fahrenheit" : "Celsius"}
                </Button>
            </Card>
        </Box>
    );
}
