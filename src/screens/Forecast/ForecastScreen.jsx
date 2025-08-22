import React from 'react';
import { Box, Typography, Stack, Card, TextField, FormControl, InputLabel } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const ForecastScreen = ({ userId }) => {
  const [revenueParams, setRevenueParams] = React.useState({ 
    initial: 10000, 
    growth: 5, 
    periods: 12 
  });
  const [costParams, setCostParams] = React.useState({ 
    fixed: 2000, 
    variable: 30, 
    periods: 12 
  });
  const [revenueForecast, setRevenueForecast] = React.useState([]);
  const [costForecast, setCostForecast] = React.useState([]);

  const handleRevenueChange = (e) => {
    setRevenueParams({ ...revenueParams, [e.target.name]: parseFloat(e.target.value) });
  };

  const handleCostChange = (e) => {
    setCostParams({ ...costParams, [e.target.name]: parseFloat(e.target.value) });
  };

  const generateForecasts = () => {
    // Revenue Forecast
    const revData = [];
    let currentRevenue = revenueParams.initial;
    for (let i = 1; i <= revenueParams.periods; i++) {
      revData.push({ name: `Month ${i}`, Revenue: currentRevenue });
      currentRevenue *= (1 + revenueParams.growth / 100);
    }
    setRevenueForecast(revData);

    // Cost Forecast
    const costData = [];
    for (let i = 1; i <= costParams.periods; i++) {
      const variableCost = (revData[i-1]?.Revenue || 0) * (costParams.variable / 100);
      const totalCost = costParams.fixed + variableCost;
      costData.push({ name: `Month ${i}`, Cost: totalCost });
    }
    setCostForecast(costData);
  };
  
  React.useEffect(() => {
    generateForecasts();
  }, [revenueParams, costParams]);

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <Typography
        variant="h2"
        sx={{
          fontFamily: "Manrope, Helvetica",
          fontWeight: 800,
          color: "white",
          fontSize: "32px",
          mb: 4,
        }}
      >
        Financial Forecasts
      </Typography>

      <Stack direction="row" spacing={4}>
        {/* Revenue Forecast */}
        <Card
          sx={{
            flex: 1,
            background: "rgba(250, 251, 252, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "10px",
            p: 3,
          }}
        >
          <Typography
            sx={{
              fontFamily: "Sora",
              fontWeight: 600,
              color: "white",
              fontSize: "18px",
              mb: 3,
            }}
          >
            Revenue Forecast
          </Typography>
          
          <Stack spacing={2} sx={{ mb: 3 }}>
            <TextField
              label="Initial Monthly Revenue ($)"
              type="number"
              name="initial"
              value={revenueParams.initial}
              onChange={handleRevenueChange}
              fullWidth
            />
            <TextField
              label="Growth Rate (%)"
              type="number"
              name="growth"
              value={revenueParams.growth}
              onChange={handleRevenueChange}
              fullWidth
            />
            <TextField
              label="Periods (Months)"
              type="number"
              name="periods"
              value={revenueParams.periods}
              onChange={handleRevenueChange}
              fullWidth
            />
          </Stack>

          <Box sx={{ height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueForecast}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#d2e0f5" fontSize={10} />
                <YAxis stroke="#d2e0f5" fontSize={10} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(5, 6, 36, 0.9)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: 'white'
                  }} 
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="Revenue" 
                  stroke="#4ade80" 
                  strokeWidth={3}
                  dot={{ fill: "#4ade80", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Card>

        {/* Cost Forecast */}
        <Card
          sx={{
            flex: 1,
            background: "rgba(250, 251, 252, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "10px",
            p: 3,
          }}
        >
          <Typography
            sx={{
              fontFamily: "Sora",
              fontWeight: 600,
              color: "white",
              fontSize: "18px",
              mb: 3,
            }}
          >
            Operational Cost Forecast
          </Typography>
          
          <Stack spacing={2} sx={{ mb: 3 }}>
            <TextField
              label="Fixed Monthly Costs ($)"
              type="number"
              name="fixed"
              value={costParams.fixed}
              onChange={handleCostChange}
              fullWidth
            />
            <TextField
              label="Variable Costs (% of Revenue)"
              type="number"
              name="variable"
              value={costParams.variable}
              onChange={handleCostChange}
              fullWidth
            />
            <TextField
              label="Periods (Months)"
              type="number"
              name="periods"
              value={costParams.periods}
              onChange={handleCostChange}
              fullWidth
            />
          </Stack>

          <Box sx={{ height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={costForecast}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#d2e0f5" fontSize={10} />
                <YAxis stroke="#d2e0f5" fontSize={10} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(5, 6, 36, 0.9)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: 'white'
                  }} 
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="Cost" 
                  stroke="#f87171" 
                  strokeWidth={3}
                  dot={{ fill: "#f87171", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Card>
      </Stack>
    </Box>
  );
};
