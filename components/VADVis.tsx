"use client"

import { ChartOptions } from 'chart.js';
import { Scatter } from 'react-chartjs-2';
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

    const options: ChartOptions<'scatter'> = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1,
        scales: {
            x: {
                type: 'linear',
                min: -1,
                max: 1,
                grid: {
                    color: (context) => context.tick.value === 0 ? 'black' : '#e0e0e0',
                },
                ticks: {
                    callback: (value) => value === 0 ? 'Valence' : value,
                },
            },
            y: {
                type: 'linear',
                min: -1,
                max: 1,
                grid: {
                    color: (context) => context.tick.value === 0 ? 'black' : '#e0e0e0',
                },
                ticks: {
                    callback: (value) => value === 0 ? 'Arousal' : value,
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    return (
        <div className=''>
            <Scatter data={data} options={options} />
        </div>
    );
};

export default VADVisualization;