import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './App.css';
import axios from 'axios';

function App() {
  const [appData, setAppData] = useState({
    loading: false,
    data: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setAppData({ loading: true }); // Set loading to true before fetching
        const response = await axios.post('http://localhost:5000/covid_data');
        const data = response.data;
        setAppData({ loading: false, data: data }); // Set loading to false and update data
      } catch (error) {
        console.error('Error fetching data:', error);
        setAppData({ loading: false, data: null });
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures the effect runs only once

  const data = appData.data;
 
  const transformedData = data
    ? data.map(item => ([
        new Date(item.date).getTime(), // Convert date to timestamp for x-axis
        item.confirmed_cases, // Use confirmed_cases for y-axis
      ]))
    : [];

  const options = {
    chart: {
      backgroundColor: 'white',
      type: 'area',
      height: '500px',
    },
    plotOptions: {
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
    series: [
      {
        name: "Confirmed Cases",
        data: transformedData,
      },
      
    ],
  };
  
  return (
    <div className="App">
      {/* Render your component content based on the fetched data */}
      {data ? (
        <div>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      ) : (
        <p>{appData.loading ? "Loading..." : "Error"}</p>
      )}
    </div>
  );
}

export default App;