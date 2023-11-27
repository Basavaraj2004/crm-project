import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Paper } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import Orders from './orders';
import Footer from './footer';
import bgimg from './bg3.jpg';

const data = [
  { value: 5, label: 'India' },
  { value: 10, label: 'USA' },
  { value: 15, label: 'Canada' },
  { value: 20, label: 'UK' },
  { value: 2, label: 'Others' }
];

const chartSize = {
  width: 320,
  height: 250,
};

const chartSetting = {
  xAxis: [
    {
      label: 'Customer Impressions (lakhs)',
    },
  ],

  width: 250,
  height: 300,
};


const dataset = [
  {
    seoul: 21,
    month: 'Jan',
  },
  {
    seoul: 28,
    month: 'Fev',
  },
  {
    seoul: 41,
    month: 'Mar',
  },
  {
    seoul: 73,
    month: 'Apr',
  },
  {
    seoul: 99,
    month: 'May',
  },
  {
    seoul: 144,
    month: 'June',
  },
  {
    seoul: 319,
    month: 'July',
  },
  {
    seoul: 249,
    month: 'Aug',
  },
  {
    seoul: 131,
    month: 'Sept',
  },
  {
    seoul: 55,
    month: 'Oct',
  },
  {
    seoul: 48,
    month: 'Nov',
  },
  {
    seoul: 25,
    month: 'Dec',
  },
];

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 16,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

const ChartContainer = ({ children }) => (
  <div style={{ margin: '10px', paddingLeft: '10px' }}>{children}</div>
);

const valueFormatter = (value) => `${value} lakhs`;

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div style={{
      backgroundImage: `url(${bgimg})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      minHeight: '89.9vh',
      minWidth: '95vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
    }} >
      <Grid container spacing={4} justifyContent="space-around">
        <Grid item xs={12} md={4}>
          <ChartContainer>
            <Paper square={false} elevation={24} style={{ padding: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }}>
              {/* Bar Chart */}
              <BarChart
                dataset={dataset}
                yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                series={[{ dataKey: 'seoul', label: ' Customer Impressions (2022)', valueFormatter }]}
                layout="horizontal"
                {...chartSize}
              />
            </Paper>
          </ChartContainer>
        </Grid>
        <Grid item xs={12} md={4}>
          <ChartContainer>
            <Paper square={false} elevation={24} style={{ padding: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }}>
              {/* Line Chart */}
              <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10], label: 'Company Stock Rate' }]}
                series={[{ data: [2, 5.5, 2, 3.5, 5.5, 8] }]}
                {...chartSize}
                label="Company Stock Rate"
              />
            </Paper>
          </ChartContainer>
        </Grid>
        <Grid item xs={12} md={4}>
          <ChartContainer>
            <Paper square={false} elevation={24} style={{ padding: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }}>
              {/* Pie Chart */}
              <PieChart series={[{ data, innerRadius: 60 }]} {...chartSize}>
                <PieCenterLabel>Country Stat</PieCenterLabel>
              </PieChart>
            </Paper>
          </ChartContainer>
        </Grid>
      </Grid>
      <br />
      <Orders />
      <Paper square={false} elevation={24} style={{ margin: '10px', padding: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }} >
        
        <div>
          <h2>To Do List</h2>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>{post.title}</li>
              
            ))}
          </ul>
        </div>
      </Paper>
      <Footer />
    </div>
  );
};

export default Home;