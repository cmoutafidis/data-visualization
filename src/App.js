import React, {useEffect, useState} from "react";
import Chart from "./Chart";
import configuration from "../configuration";

const App = () =>{

    const [data, setData] = useState(undefined);

    useEffect(() => {
        let timestamp = Date.now() - 36000000;
        fetch(`${configuration.API_GATEWAY}/data?id=Siemens SIMATIC&timestamp=${timestamp}`).then((response) => response.json()).then((res) => {
            setData(res);
        });
    }, []);

    return (
        <>
            {data ? (
                <>
                    <Chart
                        field={"apeak"}
                        data={data}
                        color="rgb(53, 162, 235)"
                    />
                    <Chart
                        field={"arms"}
                        data={data}
                        color="rgb(0, 190, 240)"
                    />
                    <Chart
                        field={"crest"}
                        data={data}
                        color="rgb(0, 214, 220)"
                    />
                    <Chart
                        field={"temperature"}
                        data={data}
                        color="rgb(42, 232, 181)"
                    />
                    <Chart
                        field={"vrms"}
                        data={data}
                        color="rgb(47, 221, 146)"
                    />
                </>
            ) : (
                <span>Loading...</span>
            )}
        </>
    )
}

export default App;
