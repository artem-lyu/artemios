"use client"

import { ChartOptions } from 'chart.js';
import {Scatter} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the components
ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const VADVisualization = ({ vadValues }: { vadValues: Array<any> }) => {
    const data = {
        datasets: [
            {
                label: 'VAD Values',
                data: vadValues.map((vad) => ({
                    x: vad.valence,
                    y: vad.arousal,
                })),
                pointBackgroundColor: 'blue',
                pointBorderColor: 'blue',
                pointHoverBackgroundColor: 'red',
                pointHoverBorderColor: 'red',
            },
        ],
    };

    const options: ChartOptions<'scatter'>= {
        scales: {
            x: {
                type: 'linear', // Update the type to "linear"
                // position: 'bottom',
                min: -1,
                max: 1,
                title: {
                    display: true,
                    text: 'Valence',
                },
            },
            y: {
                type: 'linear',
                min: -1,
                max: 1,
                title: {
                    display: true,
                    text: 'Arousal',
                },
            },
        },
    };

    return (
        <div>
            <Scatter data={data} options={options}/>
        </div>
    );
};

export default VADVisualization;