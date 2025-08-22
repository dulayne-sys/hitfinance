import React from 'react';
import { Box, Typography, Stack, Card, TextField, Button, Chip, Alert, CircularProgress, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, ComposedChart } from 'recharts';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { Brain, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Calendar, DollarSign, Target, Lightbulb, Eye, Edit } from 'lucide-react';
import { db } from '../../App';
import { aiFinancialService } from '../../services/aiService';

export const ForecastScreen = ({ userId }) => {
  const [ledger, setLedger] = React.useState([]);
  const [expenses, setExpenses] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  
  // Traditional forecast parameters
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
  
  // AI-powered forecasts
  const [incomingRevenue, setIncomingRevenue] = React.useState([]);
  const [incomingExpenses, setIncomingExpenses] = React.useState([]);
  const [budgetGuidance, setBudgetGuidance] = React.useState(null);
  const [cashFlowProjection, setCashFlowProjection] = React.useState([]);
  
  // Traditional forecasts
  const [revenueForecast, setRevenueForecast] = React.useState([]);
  const [costForecast, setCostForecast] = React.useState([]);

  React.useEffect(() => {
    if (!userId) return;
    
    const ledgerQuery = query(collection(db, `users/${userId}/ledger`));
    const unsubscribeLedger = onSnapshot(ledgerQuery, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(), 
        date: doc.data().date?.toDate() 
      }));
      setLedger(data);
    });

    const expensesQuery = query(collection(db, `users/${userId}/expenses`));
    const unsubscribeExpenses = onSnapshot(expensesQuery, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(), 
        date: doc.data().date?.toDate() 
      }));
      setExpenses(data);
    });

    return () => {
      unsubscribeLedger();
      unsubscribeExpenses();
    };
  }, [userId]);

  const generateAIForecasts = async () => {
    setLoading(true);
    try {
      // Generate AI-powered forecasts
      const [revenueProjections, expenseProjections, guidance, cashFlow] = await Promise.all([
        generateIncomingRevenue(),
        generateIncomingExpenses(),
        generateBudgetGuidance(),
        generateCashFlowProjection()
      ]);

      setIncomingRevenue(revenueProjections);
      setIncomingExpenses(expenseProjections);
      setBudgetGuidance(guidance);
      setCashFlowProjection(cashFlow);
    } catch (error) {
      console.error('Error generating AI forecasts:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateIncomingRevenue = async () => {
    // Mock AI-generated incoming revenue projections
    const currentMonth = new Date();
    const projections = [];
    
    for (let i = 0; i < 6; i++) {
      const month = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + i, 1);
      const monthName = month.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      
      // Simulate AI analysis of historical patterns and market trends
      const baseRevenue = 15000 + (Math.random() * 5000);
      const seasonalFactor = 1 + (Math.sin(i * Math.PI / 6) * 0.2);
      const trendFactor = 1 + (i * 0.05); // Growth trend
      
      projections.push({
        month: monthName,
        projected: Math.round(baseRevenue * seasonalFactor * trendFactor),
        confidence: Math.round(85 + Math.random() * 10),
        sources: [
          { name: 'Recurring Clients', amount: Math.round(baseRevenue * 0.6 * seasonalFactor * trendFactor), probability: 95 },
          { name: 'New Prospects', amount: Math.round(baseRevenue * 0.25 * seasonalFactor * trendFactor), probability: 70 },
          { name: 'Upsells', amount: Math.round(baseRevenue * 0.15 * seasonalFactor * trendFactor), probability: 60 }
        ]
      });
    }
    
    return projections;
  };

  const generateIncomingExpenses = async () => {
    // Mock AI-generated incoming expense projections
    const currentMonth = new Date();
    const projections = [];
    
    for (let i = 0; i < 6; i++) {
      const month = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + i, 1);
      const monthName = month.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      
      // Simulate AI analysis of recurring expenses and upcoming payments
      const recurringExpenses = expenses.filter(exp => exp.isRecurring);
      const baseExpenses = recurringExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);
      
      projections.push({
        month: monthName,
        projected: Math.round(baseExpenses + (Math.random() * 2000)),
        confidence: Math.round(90 + Math.random() * 8),
        breakdown: [
          { category: 'Subscriptions', amount: Math.round(baseExpenses * 0.4), type: 'recurring' },
          { category: 'Office Expenses', amount: Math.round(baseExpenses * 0.3), type: 'variable' },
          { category: 'Travel', amount: Math.round(baseExpenses * 0.2), type: 'planned' },
          { category: 'Meals', amount: Math.round(baseExpenses * 0.1), type: 'variable' }
        ]
      });
    }
    
    return projections;
  };

  const generateBudgetGuidance = async () => {
    // Mock AI-generated budget guidance
    return {
      overallHealth: 'Good',
      riskLevel: 'Medium',
      recommendations: [
        {
          type: 'warning',
          title: 'Cash Flow Gap Detected',
          description: 'Projected cash flow dip in Month 3 due to seasonal revenue decline and fixed expense obligations.',
          impact: 'high',
          action: 'Consider securing a line of credit or adjusting payment terms with suppliers.',
          timeline: '2 weeks'
        },
        {
          type: 'opportunity',
          title: 'Revenue Growth Opportunity',
          description: 'Strong client retention rate suggests potential for 15% price increase on renewals.',
          impact: 'medium',
          action: 'Prepare value proposition for existing clients and implement gradual price adjustments.',
          timeline: '1 month'
        },
        {
          type: 'positive',
          title: 'Expense Optimization Success',
          description: 'Recent subscription audit has reduced monthly recurring costs by 12%.',
          impact: 'low',
          action: 'Continue monitoring subscription usage and eliminate underutilized services.',
          timeline: 'Ongoing'
        }
      ],
      budgetAllocations: [
        { category: 'Revenue Growth', recommended: 25, current: 20, variance: 5 },
        { category: 'Operations', recommended: 45, current: 50, variance: -5 },
        { category: 'Emergency Fund', recommended: 15, current: 10, variance: 5 },
        { category: 'Technology', recommended: 15, current: 20, variance: -5 }
      ],
      keyMetrics: {
        burnRate: 8500,
        runway: 14,
        growthRate: 12,
        profitMargin: 28
      }
    };
  };

  const generateCashFlowProjection = async () => {
    // Mock AI-generated cash flow projection
    const projections = [];
    let runningBalance = 25000; // Starting balance
    
    for (let i = 0; i < 12; i++) {
      const month = new Date(2024, i, 1).toLocaleDateString('en-US', { month: 'short' });
      const revenue = 15000 + (i * 500) + (Math.random() * 3000);
      const expenses = 8000 + (Math.random() * 2000);
      const netFlow = revenue - expenses;
      runningBalance += netFlow;
      
      projections.push({
        month,
        revenue: Math.round(revenue),
        expenses: Math.round(expenses),
        netFlow: Math.round(netFlow),
        balance: Math.round(runningBalance)
      });
    }
    
    return projections;
  };

  const handleRevenueChange = (e) => {
    setRevenueParams({ ...revenueParams, [e.target.name]: parseFloat(e.target.value) });
  };

  const handleCostChange = (e) => {
    setCostParams({ ...costParams, [e.target.name]: parseFloat(e.target.value) });
  };

  const generateTraditionalForecasts = () => {
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
    generateTraditionalForecasts();
  }, [revenueParams, costParams]);

  React.useEffect(() => {
    if (ledger.length > 0 || expenses.length > 0) {
      generateAIForecasts();
    }
  }, [ledger, expenses]);

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "Manrope, Helvetica",
            fontWeight: 800,
            color: "white",
            fontSize: "32px",
          }}
        >
          AI-Powered Financial Forecasting
        </Typography>
        <Button
          onClick={generateAIForecasts}
          disabled={loading}
          sx={{
            height: "48px",
            px: 3,
            background: "linear-gradient(90deg, rgba(62,121,229,1) 0%, rgba(1,184,227,1) 100%)",
            color: "white",
            "&:disabled": { opacity: 0.6 }
          }}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : "Refresh AI Analysis"}
        </Button>
      </Stack>

      {/* AI Budget Guidance Overview */}
      {budgetGuidance && (
        <Card sx={{ p: 4, mb: 4, background: "linear-gradient(135deg, rgba(61,122,229,0.1) 0%, rgba(1,184,227,0.1) 100%)" }}>
          <Stack direction="row" alignItems="center" spacing={3} sx={{ mb: 3 }}>
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "linear-gradient(90deg, rgba(62,121,229,1) 0%, rgba(1,184,227,1) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Brain size={24} color="white" />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ color: "white", mb: 1 }}>
                AI Budget Health Assessment
              </Typography>
              <Stack direction="row" spacing={2}>
                <Chip
                  label={`Overall: ${budgetGuidance.overallHealth}`}
                  sx={{
                    backgroundColor: budgetGuidance.overallHealth === 'Good' ? "#c1f5af" : "#ffc5a3",
                    color: budgetGuidance.overallHealth === 'Good' ? "#45b020" : "#f5640d",
                  }}
                />
                <Chip
                  label={`Risk: ${budgetGuidance.riskLevel}`}
                  sx={{
                    backgroundColor: budgetGuidance.riskLevel === 'Low' ? "#c1f5af" : 
                                   budgetGuidance.riskLevel === 'Medium' ? "#ffc5a3" : "#fdbcff",
                    color: budgetGuidance.riskLevel === 'Low' ? "#45b020" : 
                           budgetGuidance.riskLevel === 'Medium' ? "#f5640d" : "#d22cd6",
                  }}
                />
              </Stack>
            </Box>
          </Stack>

          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: "center" }}>
                <Typography sx={{ color: "#d2e0f5", fontSize: "12px", mb: 1 }}>Monthly Burn Rate</Typography>
                <Typography sx={{ color: "#f87171", fontSize: "24px", fontWeight: 700 }}>
                  ${budgetGuidance.keyMetrics.burnRate.toLocaleString()}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: "center" }}>
                <Typography sx={{ color: "#d2e0f5", fontSize: "12px", mb: 1 }}>Runway (Months)</Typography>
                <Typography sx={{ color: "#01b8e3", fontSize: "24px", fontWeight: 700 }}>
                  {budgetGuidance.keyMetrics.runway}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: "center" }}>
                <Typography sx={{ color: "#d2e0f5", fontSize: "12px", mb: 1 }}>Growth Rate</Typography>
                <Typography sx={{ color: "#4ade80", fontSize: "24px", fontWeight: 700 }}>
                  {budgetGuidance.keyMetrics.growthRate}%
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: "center" }}>
                <Typography sx={{ color: "#d2e0f5", fontSize: "12px", mb: 1 }}>Profit Margin</Typography>
                <Typography sx={{ color: "#4ade80", fontSize: "24px", fontWeight: 700 }}>
                  {budgetGuidance.keyMetrics.profitMargin}%
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>
      )}

      {/* AI Recommendations */}
      {budgetGuidance?.recommendations && (
        <Card sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" sx={{ color: "white", mb: 3 }}>
            AI Budget Recommendations
          </Typography>
          <Grid container spacing={3}>
            {budgetGuidance.recommendations.map((rec, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ p: 3, height: "100%" }}>
                  <Stack direction="row" alignItems="flex-start" spacing={2}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: "6px",
                        background: rec.type === 'warning' ? "#ffc5a3" : 
                                   rec.type === 'opportunity' ? "#a6d6f8" : "#c1f5af",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      {rec.type === 'warning' && <AlertTriangle size={16} color="#f5640d" />}
                      {rec.type === 'opportunity' && <Target size={16} color="#1092ef" />}
                      {rec.type === 'positive' && <CheckCircle size={16} color="#45b020" />}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ color: "white", fontSize: "14px", mb: 1 }}>
                        {rec.title}
                      </Typography>
                      <Typography sx={{ color: "#d2e0f5", fontSize: "11px", mb: 2 }}>
                        {rec.description}
                      </Typography>
                      <Typography sx={{ color: "#a4b4cb", fontSize: "10px", mb: 1 }}>
                        <strong>Action:</strong> {rec.action}
                      </Typography>
                      <Chip
                        label={rec.timeline}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(61,122,229,0.2)",
                          color: "#3d7ae5",
                          fontSize: "8px",
                          height: "16px"
                        }}
                      />
                    </Box>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Card>
      )}

      {/* Incoming Revenue & Expenses */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        {/* Incoming Revenue */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ color: "white", mb: 3 }}>
              AI-Projected Incoming Revenue
            </Typography>
            {incomingRevenue.length > 0 ? (
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: "#d2e0f5", fontSize: "10px" }}>Month</TableCell>
                      <TableCell sx={{ color: "#d2e0f5", fontSize: "10px" }}>Projected</TableCell>
                      <TableCell sx={{ color: "#d2e0f5", fontSize: "10px" }}>Confidence</TableCell>
                      <TableCell sx={{ color: "#d2e0f5", fontSize: "10px" }}>Details</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {incomingRevenue.slice(0, 4).map((item, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ color: "white", fontSize: "11px" }}>{item.month}</TableCell>
                        <TableCell sx={{ color: "#4ade80", fontSize: "11px", fontWeight: 600 }}>
                          ${item.projected.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={`${item.confidence}%`}
                            size="small"
                            sx={{
                              backgroundColor: item.confidence > 80 ? "#c1f5af" : "#ffc5a3",
                              color: item.confidence > 80 ? "#45b020" : "#f5640d",
                              fontSize: "8px",
                              height: "16px"
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton size="small" sx={{ color: "#01b8e3" }}>
                            <Eye size={14} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography sx={{ color: "#a4b4cb", textAlign: "center", py: 4 }}>
                Loading AI revenue projections...
              </Typography>
            )}
          </Card>
        </Grid>

        {/* Incoming Expenses */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ color: "white", mb: 3 }}>
              AI-Projected Incoming Expenses
            </Typography>
            {incomingExpenses.length > 0 ? (
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: "#d2e0f5", fontSize: "10px" }}>Month</TableCell>
                      <TableCell sx={{ color: "#d2e0f5", fontSize: "10px" }}>Projected</TableCell>
                      <TableCell sx={{ color: "#d2e0f5", fontSize: "10px" }}>Confidence</TableCell>
                      <TableCell sx={{ color: "#d2e0f5", fontSize: "10px" }}>Details</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {incomingExpenses.slice(0, 4).map((item, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ color: "white", fontSize: "11px" }}>{item.month}</TableCell>
                        <TableCell sx={{ color: "#f87171", fontSize: "11px", fontWeight: 600 }}>
                          ${item.projected.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={`${item.confidence}%`}
                            size="small"
                            sx={{
                              backgroundColor: item.confidence > 85 ? "#c1f5af" : "#ffc5a3",
                              color: item.confidence > 85 ? "#45b020" : "#f5640d",
                              fontSize: "8px",
                              height: "16px"
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton size="small" sx={{ color: "#01b8e3" }}>
                            <Eye size={14} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography sx={{ color: "#a4b4cb", textAlign: "center", py: 4 }}>
                Loading AI expense projections...
              </Typography>
            )}
          </Card>
        </Grid>
      </Grid>

      {/* Cash Flow Projection Chart */}
      <Card sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" sx={{ color: "white", mb: 3 }}>
          12-Month Cash Flow Projection
        </Typography>
        <Box sx={{ height: "400px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={cashFlowProjection}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#d2e0f5" fontSize={12} />
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
              <Bar dataKey="revenue" fill="#4ade80" name="Revenue" />
              <Bar dataKey="expenses" fill="#f87171" name="Expenses" />
              <Line type="monotone" dataKey="balance" stroke="#01b8e3" strokeWidth={3} name="Running Balance" />
            </ComposedChart>
          </ResponsiveContainer>
        </Box>
      </Card>

      {/* Traditional Forecasting Tools */}
      <Typography variant="h5" sx={{ color: "white", mb: 3 }}>
        Traditional Forecasting Models
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
            Revenue Forecast Model
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
            Cost Forecast Model
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
