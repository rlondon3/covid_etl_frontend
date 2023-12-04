// HighchartsChart.js

import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const HighchartsChart = ({ data, seriesName, seriesName2, chartType }) => {
  const transformedData1 = data
    ? data.map(item => ([
        new Date(item.date).getTime(),
        item[seriesName], // Use the specified key for y-axis
      ]))
    : [];

  let transformedData2 = [];
  if (seriesName2) {
    transformedData2 = data.map(item => ([
      new Date(item.date).getTime(),
      item[seriesName2], // Use the specified key for y-axis
    ]));
  }

  const options = {
    chart: {
      backgroundColor: 'white',
      type: chartType,
      height: '500px',
    },
    plotOptions: (seriesName2 !== null) ?
      {
        area: {
          pointStart: 1940,
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                enabled: true
              }
            }
          }
        }
      }
      : {
        series: {
          fillColor: {
            linearGradient: [0, 0, 0, 300],
            stops: [
              [0, Highcharts.getOptions().colors[0]],
              [
                1,
                Highcharts.color(Highcharts.getOptions().colors[3])
                  .setOpacity(0)
                  .get('rgba'),
              ],
            ],
          },
        },
      },
    title: {
      text: 'United States Covid Data',
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        day: '%Y-%m-%d',
      },
    },
    series: (seriesName2 !== null) ? [
      {
        name: seriesName,
        data: transformedData1,
      },
      {
        name: seriesName2,
        data: transformedData2,
      }
    ] : [
        {
          name: seriesName,
          data: transformedData1,
        }
      ],
  };

  return (
    <HighchartsReact highcharts={Highcharts} options={options} />
  );
};

export default HighchartsChart;
