import { useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  CartesianGrid,
  Line,
} from "recharts";

import moment from "moment";
import DummyChart from "./DummyChart";
import { useChartSize } from "../../../hooks/useChartSize";

// COLOR THEME FOR GRAPH
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#007bff", 
  },
  mobile: {
    label: "Mobile",
    color: "#28a745",
  },
};

// PROCESS THE DATA FOR BAR CHART
const processChartData = (data) => {
  const features = ["F", "E", "D", "C", "B", "A"];
  return features.map((feature) => ({
    feature,
    value: data.reduce((acc, entry) => {
      const value = entry[feature];
      // Ensure value is a number, fallback to 0 if not
      return acc + (typeof value === 'number' ? value : 0);
    }, 0),
  }));
};

// PROCESS THE DATA WHEN CLICK ON THE BAR OF BAR GRAPH
const prepareLineChartData = (data, feature) => {
  return data
    .filter((entry) => entry[feature] !== undefined)
    .map((entry) => ({
      date: moment(entry.Day).format("DD-MM"), // Fixed timestamp format
      value: entry[feature] || 0,
    }));
};

const BarChartComponent = ({ data }) => {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [lineChartData, setLineChartData] = useState([]); // Default to an empty array
  const [chartData, setChartData] = useState([]);
  
  // Get filter preferences
  const chartSize = useChartSize();

  // IT RENDER WHEN DATA UPDATE
  useEffect(() => {
    if (data) {
      const chartData = processChartData(data);
      setChartData(chartData);
    }
  }, [data]);

  // HANDLE BAR CLICK
  const handleBarClick = (value) => {
    if (value) {
      setSelectedFeature(value.feature);
      const trendData = prepareLineChartData(data, value.feature);
      setLineChartData(trendData); // Make sure lineChartData is always an array
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex md:flex-row justify-around items-center gap-y-5 md:gap-x-10 mt-2 p-3 bg-gray-100 rounded-md dark:bg-gray-400">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Total</h3>
            <p className="text-sm text-gray-600">Showing total time spent for features A, B, C, D, E, and F</p>
          </div>
          <div className="">
            <BarChart
              layout="vertical"
              width={chartSize.width}
              height={chartSize.height}
              data={chartData}
              margin={{ left: 0, top: 20, bottom: 20 }}
              className=" z-40"
            >
              <XAxis
                type="number"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                label={{ value: "Time", position: "bottom" }}
              />
              <YAxis
                type="category"
                dataKey="feature"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                label={{ value: "Features", angle: -90, position: "insideLeft" }}
              />
              <Tooltip
                cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
                content={({ payload, label }) => (
                  <div className="bg-white p-2 rounded shadow-md">
                    {payload && payload.length > 0 && (
                      <>
                        <p>{label}</p>
                        <p>{`Value: ${payload[0].value}`}</p>
                      </>
                    )}
                  </div>
                )}
              />
              <Bar
                dataKey="value"
                fill={chartConfig.desktop.color}
                radius={5}
                onClick={handleBarClick}
                className="z-10"
              />
            </BarChart>
          </div>
        </div>

        {selectedFeature ? (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Time trend</h3>
              <p className="text-sm text-gray-600">Time Trend for Feature: {selectedFeature}</p>
            </div>
            <div >
              {/* Only render LineChart if lineChartData is an array and has data */}
              {Array.isArray(lineChartData) && lineChartData.length > 0 ? (
                <LineChart
                  width={chartSize.width}
                  height={chartSize.height}
                  data={lineChartData}
                  margin={{ top: 10, right: 0, left: 20, bottom: 20 }}
                >
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis
                    dataKey="date"
                    label={{
                      value: "Date",
                      position: "insideBottomRight",
                      offset: -5,
                    }}
                  />
                  <YAxis
                    label={{ value: "Value", angle: -90, position: "insideLeft" }}
                  />
                  <Tooltip />
                  <Line
                    type="linear"
                    dataKey="value"
                    stroke={chartConfig.desktop.color}
                    dot={true}
                  />
                </LineChart>
              ) : (
                <DummyChart /> // Fallback if no data
              )}
            </div>
          </div>
        ) : (
          <DummyChart />
        )}
      </div>
    </>
  );
};

export default BarChartComponent;
