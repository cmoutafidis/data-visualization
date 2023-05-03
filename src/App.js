import React from "react";
import Chart from "./Chart";

const App = () =>{
    return (
        <>
            <Chart
                id={"a-peek"}
                color="rgb(53, 162, 235)"
                selectedValue="50"
            />
            <Chart
                id={"a-rms"}
                color="rgb(0, 190, 240)"
                selectedValue="50"
                dateFrom=""
                dateTo=""
            />
            <Chart
                id={"crest"}
                color="rgb(0, 214, 220)"
                selectedValue="50"
                dateFrom=""
                dateTo=""
            />
            <Chart
                color="rgb(42, 232, 181)"
                id={"temperature"}
                selectedValue="50"
                dateFrom=""
                dateTo=""
            />
            <Chart
                id={"v-rms"}
                color="rgb(47, 221, 146)"
                selectedValue="50"
                dateFrom=""
                dateTo=""
            />
        </>
    )
}

export default App;
