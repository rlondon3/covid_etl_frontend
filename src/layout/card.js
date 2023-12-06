import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import HighchartsChart from "../components/HighchartsChart";

export default function ActionAreaCard({
  title,
  data,
  seriesName,
  seriesName2,
  chartType
}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <HighchartsChart
          data={data}
          seriesName={seriesName}
          seriesName2={seriesName2}
          chartType={chartType}
        />
        <Typography variant="body2" color="text.secondary">
          Additional information about the chart or any other content goes here.
        </Typography>
      </CardContent>
    </Card>
  );
}
