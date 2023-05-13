import {Line} from "react-chartjs-2";
import React, {useEffect, useState} from "react";
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

const Chart = ({
    field,
    data,
    color
}) => {
    const [labels, setLabels] = useState([]);
    const [remoteData, setRemoteData] = useState(undefined);

    const pushValues = (values) => {
        const newRemoteData = {...remoteData};
        Object.entries(values).forEach((item) => {
            // eslint-disable-next-line prefer-destructuring
            newRemoteData[item[0]] = item[1];
        });
        setRemoteData(newRemoteData);
    };

    const createGraphs = (definedLastTimestamp = undefined) => {
        const values = {};
        data.Items.forEach((key) => {
            values[`${new Date(parseInt(key.timestamp.N, 10)).toISOString().split(".")[0]
                .split("T")[0]} ${new Date(parseInt(key.timestamp.N, 10)).toLocaleTimeString().split(":").slice(0, -1) //.slice(0, -1) to aggregate per minute, .slice(0, -2) to aggregate per hour
                .join(":")}:00`] = parseFloat(key.payload.M[field].N);
        });
        if (definedLastTimestamp) {
            pushValues(values);
        } else {
            setRemoteData(values);
        }
    };

    useEffect(() => {
        createGraphs();
    }, []);

    useEffect(() => {
        if (remoteData) {
            const valuesArray = [];
            Object.keys(remoteData).forEach((item) => {
                valuesArray.push(item);
            });
            setLabels(valuesArray);
        }
    }, [remoteData]);

    return (
        <Line
            options={{
                responsive: true,
                plugins: {
                    legend: {
                        position: "top",
                    },
                    title: {
                        display: false,
                    },
                },
            }}
            data={{
                labels,
                datasets: [
                    {
                        label: field,
                        data: labels.map((key) => remoteData[key]),
                        borderColor: color,
                        backgroundColor: color,
                    },
                ],
            }}
        />
    );
};

export default Chart;
