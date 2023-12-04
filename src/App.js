// App.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HighchartsChart from './components/HighchartsChart';
import './App.css';

function App() {
  const [appData, setAppData] = useState({
    loading: false,
    error: false,
    data: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setAppData({ loading: true });
        const response = await axios.post('http://localhost:5000/covid_data');
        const data = response.data;
        console.log(data, 'data')
        setAppData({ loading: false, data: data });
      } catch (error) {
        console.error('Error fetching data:', error);
        setAppData({ loading: false, data: null, error: error });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      {appData.data ? (
        <div>
          {/* Use the HighchartsChart component and specify the key for y-axis values */}
          <HighchartsChart data={appData.data} seriesName="confirmed_cases" seriesName2={null} chartType='line' />
          <HighchartsChart data={appData.data} seriesName="deaths" seriesName2={null} chartType='area' />
          <HighchartsChart data={appData.data} seriesName="deaths" seriesName2='recovered' chartType='area' />
          <HighchartsChart data={appData.data} seriesName="recovered" seriesName2={null} chartType='column' />
        </div>
      ) : (
        <p>{appData.loading ? "Loading..." : "Error"}</p>
      )}
    </div>
  );
}

export default App;
