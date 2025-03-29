import React, { useEffect, useState } from "react";
import { fetchTrains } from "../api"; 

const TrainList = () => {
    const [trains, setTrains] = useState([]);

    useEffect(() => {
        const getTrains = async () => {
            const data = await fetchTrains();
            setTrains(data);
        };
        getTrains();
    }, []);

    return (
        <div>
            <h2>Available Trains</h2>
            <ul>
                {trains.length > 0 ? (
                    trains.map((train) => (
                        <li key={train.id}>
                            {train.name} - {train.departure} to {train.arrival} (Duration: {train.duration})
                        </li>
                    ))
                ) : (
                    <p>Loading trains...</p>
                )}
            </ul>
        </div>
    );
};

export default TrainList;
