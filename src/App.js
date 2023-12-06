// App.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import ActionAreaCard from "./layout/card";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import "./App.css";

function App() {
  const [appData, setAppData] = useState({
    loading: false,
    error: false,
    data: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setAppData({ loading: true });
        const response = await axios.post("http://localhost:5000/covid_data");
        const data = response.data;
        console.log(data, "data");
        setAppData({ loading: false, data: data });
      } catch (error) {
        console.error("Error fetching data:", error);
        setAppData({ loading: false, data: null, error: error });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      {appData.data ? (
        <Container maxWidth="md">
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <ActionAreaCard
                  title="Confirmed Cases"
                  data={appData.data}
                  seriesName="confirmed_cases"
                  seriesName2={null}
                  chartType="line"
                />
              </Grid>
              <Grid item xs={6}>
                <ActionAreaCard
                  title="Deaths"
                  data={appData.data}
                  seriesName="deaths"
                  seriesName2={null}
                  chartType="area"
                />
              </Grid>
              <Grid item xs={6}>
                <ActionAreaCard
                  title="Deaths vs Recovered"
                  data={appData.data}
                  seriesName="deaths"
                  seriesName2="recovered"
                  chartType="area"
                />
              </Grid>
              <Grid item xs={6}>
                <ActionAreaCard
                  title="Recovered"
                  data={appData.data}
                  seriesName="recovered"
                  seriesName2={null}
                  chartType="column"
                />
              </Grid>
            </Grid>
          </Box>
        </Container>
      ) : (
        <p>{appData.loading ? "Loading..." : "Error"}</p>
      )}
    </div>
  );
}

export default App;
