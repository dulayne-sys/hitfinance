import React from 'react';
import { Box, Typography, Stack, Card, CardContent } from '@mui/material';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { db } from '../../App';

export const DashboardScreen = ({ userId }) => {
  const [ledger, setLedger] = React.useState([]);

  React.useEffect(() => {
    if (!userId) return;
    const q = query(collection(db, `users/${userId}/ledger`));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(), 
        date: doc.data().date?.toDate() 
      }));
      setLedger(data);
    });
    return () => unsubscribe();
  }, [userId]);

  const totalRevenue = ledger
    .filter(item => item.type === 'revenue')
    .reduce((acc, item) => acc + parseFloat(item.amount || 0), 0);
  
  const totalCost = ledger
    .filter(item => item.type === 'cost')
    .reduce((acc, item) => acc + parseFloat(item.amount || 0), 0);
  
  const netProfit = totalRevenue - totalCost;

  const chartData = ledger
    .sort((a, b) => a.date - b.date)
    .map(item => ({
      name: item.date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) || 'N/A',
      Revenue: item.type === 'revenue' ? item.amount : 0,
      Cost: item.type === 'cost' ? item.amount : 0,
    }));

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
        Financial Overview
      </Typography>

      {/* Stats Cards */}
      <Stack direction="row" spacing={4} sx={{ mb: 6 }}>
        {/* Total Revenue Card */}
        <Card
          sx={{
            flex: 1,
            height: "120px",
            background: "linear-gradient(0deg, rgba(250,251,252,0.1) 0%, rgba(250,251,252,0.1) 100%), linear-gradient(90deg, rgba(240,240,240,0.2) 0%, rgba(240,240,240,0) 100%)",
            border: "1px solid transparent",
            borderRadius: "10px",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              padding: "1px",
              borderRadius: "10px",
              background: "linear-gradient(90deg, rgba(62,121,229,1) 0%, rgba(1,184,227,1) 100%)",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              zIndex: 1,
              pointerEvents: "none",
            },
          }}
        >
          <CardContent sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column", gap: 1 }}>
            <Box sx={{ position: "relative" }}>
              <Typography
                sx={{
                  fontFamily: "Sora, Helvetica",
                  fontWeight: 400,
                  color: "#d2e0f5",
                  fontSize: "14px",
                }}
              >
                Total Revenue
              </Typography>
              <Box
                sx={{
                  width: "20px",
                  height: "3px",
                  borderRadius: "5px",
                  background: "linear-gradient(38deg, rgba(54,217,255,1) 0%, rgba(74,0,197,1) 100%)",
                  mt: 1,
                }}
              />
            </Box>
            <Typography
              sx={{
                fontFamily: "Manrope, Helvetica",
                fontWeight: 800,
                color: "#4ade80",
                fontSize: "36px",
                lineHeight: "normal",
              }}
            >
              ${totalRevenue.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>

        {/* Total Costs Card */}
        <Card
          sx={{
            flex: 1,
            height: "120px",
            background: "linear-gradient(0deg, rgba(250,251,252,0.1) 0%, rgba(250,251,252,0.1) 100%), linear-gradient(90deg, rgba(240,240,240,0.2) 0%, rgba(240,240,240,0) 100%)",
            border: "1px solid transparent",
            borderRadius: "10px",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              padding: "1px",
              borderRadius: "10px",
              background: "linear-gradient(90deg, rgba(62,121,229,1) 0%, rgba(1,184,227,1) 100%)",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              zIndex: 1,
              pointerEvents: "none",
            },
          }}
        >
          <CardContent sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column", gap: 1 }}>
            <Box sx={{ position: "relative" }}>
              <Typography
                sx={{
                  fontFamily: "Sora, Helvetica",
                  fontWeight: 400,
                  color: "#d2e0f5",
                  fontSize: "14px",
                }}
              >
                Total Costs
              </Typography>
              <Box
                sx={{
                  width: "20px",
                  height: "3px",
                  borderRadius: "5px",
                  background: "linear-gradient(38deg, rgba(255,54,54,1) 0%, rgba(197,0,74,1) 100%)",
                  mt: 1,
                }}
              />
            </Box>
            <Typography
              sx={{
                fontFamily: "Manrope, Helvetica",
                fontWeight: 800,
                color: "#f87171",
                fontSize: "36px",
                lineHeight: "normal",
              }}
            >
              ${totalCost.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>

        {/* Net Profit Card */}
        <Card
          sx={{
            flex: 1,
            height: "120px",
            background: "linear-gradient(0deg, rgba(250,251,252,0.1) 0%, rgba(250,251,252,0.1) 100%), linear-gradient(90deg, rgba(240,240,240,0.2) 0%, rgba(240,240,240,0) 100%)",
            border: "1px solid transparent",
            borderRadius: "10px",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              padding: "1px",
              borderRadius: "10px",
              background: "linear-gradient(90deg, rgba(62,121,229,1) 0%, rgba(1,184,227,1) 100%)",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              zIndex: 1,
              pointerEvents: "none",
            },
          }}
        >
          <CardContent sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column", gap: 1 }}>
            <Box sx={{ position: "relative" }}>
              <Typography
                sx={{
                  fontFamily: "Sora, Helvetica",
                  fontWeight: 400,
                  color: "#d2e0f5",
                  fontSize: "14px",
                }}
              >
                Net Profit
              </Typography>
              <Box
                sx={{
                  width: "20px",
                  height: "3px",
                  borderRadius: "5px",
                  background: netProfit >= 0 
                    ? "linear-gradient(38deg, rgba(54,217,255,1) 0%, rgba(74,0,197,1) 100%)"
                    : "linear-gradient(38deg, rgba(255,54,54,1) 0%, rgba(197,0,74,1) 100%)",
                  mt: 1,
                }}
              />
            </Box>
            <Typography
              sx={{
                fontFamily: "Manrope, Helvetica",
                fontWeight: 800,
                color: netProfit >= 0 ? "#01b8e3" : "#f87171",
                fontSize: "36px",
                lineHeight: "normal",
              }}
            >
              ${netProfit.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      {/* Chart */}
      <Card
        sx={{
          width: "100%",
          height: "400px",
          background: "rgba(250, 251, 252, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "10px",
          p: 3,
        }}
      >
        <Typography
          sx={{
            fontFamily: "Sora, Helvetica",
            fontWeight: 600,
            color: "white",
            fontSize: "18px",
            mb: 3,
          }}
        >
          Financial Performance
        </Typography>
        <Box sx={{ width: "100%", height: "320px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#d2e0f5" fontSize={12} />
              <YAxis stroke="#d2e0f5" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(5, 6, 36, 0.9)', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: 'white'
                }} 
              />
              <Legend />
              <Bar dataKey="Revenue" fill="#4ade80" name="Revenue" />
              <Bar dataKey="Cost" fill="#f87171" name="Costs" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Card>
    </Box>
  );
};
