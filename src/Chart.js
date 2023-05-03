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
import configuration from "../configuration";

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
    id,
    color,
    selectedValue,
}) => {
    const [labels, setLabels] = useState([]);
    const [remoteData, setRemoteData] = useState(undefined);
    const [selectedPeriod, setSelectedPeriod] = useState(undefined);

    const pushValues = (values) => {
        const newRemoteData = {...remoteData};
        Object.entries(values).forEach((item) => {
            // eslint-disable-next-line prefer-destructuring
            newRemoteData[item[0]] = item[1];
        });
        setRemoteData(newRemoteData);
    };

    const fetchData = (definedLastTimestamp = undefined) => {
        let timestamp = Date.now() - 3600000;
        fetch(`${configuration.API_GATEWAY}/data?id=${id}&timestamp=${timestamp}`)
            .then((response) => response.json())
            .then((res) => {
                const values = {};
                res.Items.forEach((key) => {
                    values[`${new Date(parseInt(key.timestamp.N, 10)).toISOString().split(".")[0]
                        .split("T")[0]} ${new Date(parseInt(key.timestamp.N, 10)).toLocaleTimeString().split(":").slice(0, -2)
                        .join(":")}:00`] = parseFloat(key.value.N);
                });
                if (definedLastTimestamp) {
                    pushValues(values);
                } else {
                    setRemoteData(values);
                }
            });
    };

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    useEffect(() => {
        if (selectedValue) {
            if (selectedPeriod) {
                if (selectedPeriod !== selectedValue) {
                    fetchData();
                    setSelectedPeriod(selectedValue);
                }
            } else {
                setSelectedPeriod(selectedValue);
            }
        }
    }, [selectedValue, selectedPeriod]);

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
                        label: id,
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
