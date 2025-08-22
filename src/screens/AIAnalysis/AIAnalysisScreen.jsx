import React from 'react';
import { 
  Box, 
  Typography, 
  Stack, 
  Card, 
  Button, 
  Tabs, 
  Tab, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  Alert,
  CircularProgress,
  Grid
} from '@mui/material';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  DollarSign,
  Target,
  Lightbulb,
  BarChart3,
  PieChart,
  Calculator
} from 'lucide-react';
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { db } from '../../App';
import { aiFinancialService } from '../../services/aiService';

const COLORS = ['#3d7ae5', '#01b8e3', '#45b020', '#f5640d', '#9513fb', '#d22cd6'];

export const AIAnalysisScreen = ({ userId }) => {
  const [ledger, setLedger] = React.useState([]);
  const [expenses, setExpenses] = React.useState([]);
  const [activeTab, setActiveTab] = React.useState('overview');
  const [loading, setLoading] = React.useState(false);
  const [analysis, setAnalysis] = React.useState(null);

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

  const generateAnalysis = async () => {
    setLoading(true);
    try {
      const [incomeStatement, balanceSheet, insights, optimizationTips] = await Promise.all([
        aiFinancialService.generateIncomeStatement(ledger, expenses),
        aiFinancialService.generateBalanceSheet(ledger, expenses),
        aiFinancialService.generateFinancialInsights(ledger, expenses),
        aiFinancialService.generateProfitOptimizationTips({ ledger, expenses })
      ]);

      setAnalysis({
        incomeStatement,
        balanceSheet,
        insights,
        optimizationTips,
        generatedAt: new Date()
      });
    } catch (error) {
      console.error('Error generating analysis:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (ledger.length > 0 || expenses.length > 0) {
      generateAnalysis();
    }
  }, [ledger, expenses]);

  const renderOverview = () => (
    <Stack spacing={4}>
      {/* AI Score Card */}
      <Card sx={{ p: 4, background: "linear-gradient(135deg, rgba(61,122,229,0.1) 0%, rgba(1,184,227,0.1) 100%)" }}>
        <Stack direction="row" alignItems="center" spacing={3}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "linear-gradient(90deg, rgba(62,121,229,1) 0%, rgba(1,184,227,1) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Brain size={32} color="white" />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" sx={{ color: "white", mb: 1 }}>
              Financial Health Score
            </Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="h2" sx={{ color: "#01b8e3", fontSize: "48px" }}>
                {analysis?.insights?.overallScore || 0}
              </Typography>
              <Box>
                <Typography sx={{ color: "#d2e0f5", fontSize: "14px" }}>
                  Out of 100
                </Typography>
                <Typography sx={{ color: "#45b020", fontSize: "12px" }}>
                  Above Average
                </Typography>
              </Box>
            </Stack>
          </Box>
          <Button
            onClick={generateAnalysis}
            disabled={loading}
            sx={{
              height: "48px",
              px: 3,
              background: "linear-gradient(90deg, rgba(62,121,229,1) 0%, rgba(1,184,227,1) 100%)",
              color: "white",
              "&:disabled": { opacity: 0.6 }
            }}
          >
            {loading ? <CircularProgress size={20} color="inherit" /> : "Refresh Analysis"}
          </Button>
        </Stack>
      </Card>

      {/* Key Insights */}
      <Grid container spacing={3}>
        {analysis?.insights?.insights?.slice(0, 4).map((insight, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={{ p: 3, height: "100%" }}>
              <Stack direction="row" alignItems="flex-start" spacing={2}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "8px",
                    background: insight.type === 'warning' ? "#ffc5a3" : 
                               insight.type === 'opportunity' ? "#a6d6f8" : "#c1f5af",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {insight.type === 'warning' && <AlertTriangle size={20} color="#f5640d" />}
                  {insight.type === 'opportunity' && <Target size={20} color="#1092ef" />}
                  {insight.type === 'positive' && <CheckCircle size={20} color="#45b020" />}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ color: "white", mb: 1 }}>
                    {insight.title}
                  </Typography>
                  <Typography sx={{ color: "#d2e0f5", fontSize: "12px", mb: 2 }}>
                    {insight.description}
                  </Typography>
                  <Chip
                    label={`${insight.impact} impact`}
                    size="small"
                    sx={{
                      backgroundColor: insight.impact === 'high' ? "#fdbcff" : 
                                     insight.impact === 'medium' ? "#ffc5a3" : "#c1f5af",
                      color: insight.impact === 'high' ? "#d22cd6" : 
                             insight.impact === 'medium' ? "#f5640d" : "#45b020",
                      fontSize: "10px"
                    }}
                  />
                </Box>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Industry Comparison */}
      <Card sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ color: "white", mb: 3 }}>
          Industry Benchmarking
        </Typography>
        <Grid container spacing={4}>
          {analysis?.insights?.industryComparison && Object.entries(analysis.insights.industryComparison).map(([key, data]) => (
            <Grid item xs={12} md={4} key={key}>
              <Box sx={{ textAlign: "center" }}>
                <Typography sx={{ color: "#d2e0f5", fontSize: "12px", mb: 1 }}>
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </Typography>
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                  <Box>
                    <Typography sx={{ color: "white", fontSize: "24px", fontWeight: 700 }}>
                      {data.yours}%
                    </Typography>
                    <Typography sx={{ color: "#a4b4cb", fontSize: "10px" }}>
                      Your Company
                    </Typography>
                  </Box>
                  <Box sx={{ color: data.status === 'above' ? "#45b020" : "#f5640d" }}>
                    {data.status === 'above' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                  </Box>
                  <Box>
                    <Typography sx={{ color: "#d2e0f5", fontSize: "18px", fontWeight: 600 }}>
                      {data.industry}%
                    </Typography>
                    <Typography sx={{ color: "#a4b4cb", fontSize: "10px" }}>
                      Industry Avg
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Card>
    </Stack>
  );

  const renderIncomeStatement = () => (
    <Stack spacing={4}>
      <Card sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ color: "white", mb: 3 }}>
          Income Statement (Profit & Loss)
        </Typography>
        
        {analysis?.incomeStatement && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "#d2e0f5", fontWeight: 600 }}>Item</TableCell>
                  <TableCell align="right" sx={{ color: "#d2e0f5", fontWeight: 600 }}>Amount</TableCell>
                  <TableCell align="right" sx={{ color: "#d2e0f5", fontWeight: 600 }}>% of Revenue</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ color: "white", fontWeight: 600 }}>Total Revenue</TableCell>
                  <TableCell align="right" sx={{ color: "#4ade80", fontWeight: 600 }}>
                    ${analysis.incomeStatement.revenue.totalRevenue.toFixed(2)}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "#4ade80" }}>100.0%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ color: "white" }}>Cost of Goods Sold</TableCell>
                  <TableCell align="right" sx={{ color: "#f87171" }}>
                    ${analysis.incomeStatement.costs.totalCosts.toFixed(2)}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "#f87171" }}>
                    {((analysis.incomeStatement.costs.totalCosts / analysis.incomeStatement.revenue.totalRevenue) * 100).toFixed(1)}%
                  </TableCell>
                </TableRow>
                <TableRow sx={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
                  <TableCell sx={{ color: "white", fontWeight: 600 }}>Gross Profit</TableCell>
                  <TableCell align="right" sx={{ color: "#01b8e3", fontWeight: 600 }}>
                    ${analysis.incomeStatement.profitability.grossProfit.toFixed(2)}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "#01b8e3", fontWeight: 600 }}>
                    {analysis.incomeStatement.profitability.grossMargin.toFixed(1)}%
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ color: "white" }}>Operating Expenses</TableCell>
                  <TableCell align="right" sx={{ color: "#ff8c36" }}>
                    ${analysis.incomeStatement.expenses.totalExpenses.toFixed(2)}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "#ff8c36" }}>
                    {((analysis.incomeStatement.expenses.totalExpenses / analysis.incomeStatement.revenue.totalRevenue) * 100).toFixed(1)}%
                  </TableCell>
                </TableRow>
                <TableRow sx={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
                  <TableCell sx={{ color: "white", fontWeight: 600 }}>Operating Income</TableCell>
                  <TableCell align="right" sx={{ color: "#01b8e3", fontWeight: 600 }}>
                    ${analysis.incomeStatement.profitability.operatingIncome.toFixed(2)}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "#01b8e3", fontWeight: 600 }}>
                    {analysis.incomeStatement.profitability.operatingMargin.toFixed(1)}%
                  </TableCell>
                </TableRow>
                <TableRow sx={{ backgroundColor: "rgba(62,121,229,0.1)", borderTop: "2px solid #3d7ae5" }}>
                  <TableCell sx={{ color: "white", fontWeight: 700, fontSize: "16px" }}>Net Income</TableCell>
                  <TableCell align="right" sx={{ color: "#01b8e3", fontWeight: 700, fontSize: "16px" }}>
                    ${analysis.incomeStatement.profitability.netIncome.toFixed(2)}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "#01b8e3", fontWeight: 700 }}>
                    {analysis.incomeStatement.profitability.netMargin.toFixed(1)}%
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>

      {/* Revenue & Expense Breakdown Charts */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ color: "white", mb: 3 }}>
              Revenue Breakdown
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={analysis?.incomeStatement?.revenue?.breakdown ? 
                      Object.entries(analysis.incomeStatement.revenue.breakdown).map(([key, value]) => ({
                        name: key,
                        value: value
                      })) : []
                    }
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                  >
                    {Object.entries(analysis?.incomeStatement?.revenue?.breakdown || {}).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(5, 6, 36, 0.9)', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: 'white'
                    }} 
                  />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ color: "white", mb: 3 }}>
              Expense Breakdown
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={analysis?.incomeStatement?.expenses?.breakdown ? 
                      Object.entries(analysis.incomeStatement.expenses.breakdown).map(([key, value]) => ({
                        name: key.charAt(0).toUpperCase() + key.slice(1),
                        value: value
                      })) : []
                    }
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                  >
                    {Object.entries(analysis?.incomeStatement?.expenses?.breakdown || {}).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(5, 6, 36, 0.9)', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: 'white'
                    }} 
                  />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );

  const renderBalanceSheet = () => (
    <Card sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ color: "white", mb: 3 }}>
        Balance Sheet
      </Typography>
      
      {analysis?.balanceSheet && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ color: "#4ade80", mb: 2 }}>
              Assets
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ color: "#d2e0f5", border: "none" }}>Current Assets:</TableCell>
                    <TableCell sx={{ color: "white", border: "none" }}></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: "#a4b4cb", border: "none", pl: 3 }}>Cash</TableCell>
                    <TableCell align="right" sx={{ color: "white", border: "none" }}>
                      ${analysis.balanceSheet.assets.current.cash.toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: "#a4b4cb", border: "none", pl: 3 }}>Accounts Receivable</TableCell>
                    <TableCell align="right" sx={{ color: "white", border: "none" }}>
                      ${analysis.balanceSheet.assets.current.accountsReceivable.toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: "#a4b4cb", border: "none", pl: 3 }}>Inventory</TableCell>
                    <TableCell align="right" sx={{ color: "white", border: "none" }}>
                      ${analysis.balanceSheet.assets.current.inventory.toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
                    <TableCell sx={{ color: "white", fontWeight: 600, border: "none" }}>Total Current Assets</TableCell>
                    <TableCell align="right" sx={{ color: "#4ade80", fontWeight: 600, border: "none" }}>
                      ${analysis.balanceSheet.assets.current.total.toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: "#d2e0f5", border: "none", pt: 2 }}>Fixed Assets:</TableCell>
                    <TableCell sx={{ color: "white", border: "none" }}></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: "#a4b4cb", border: "none", pl: 3 }}>Equipment</TableCell>
                    <TableCell align="right" sx={{ color: "white", border: "none" }}>
                      ${analysis.balanceSheet.assets.fixed.equipment.toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ backgroundColor: "rgba(255,255,255,0.1)", borderTop: "2px solid #4ade80" }}>
                    <TableCell sx={{ color: "white", fontWeight: 700, border: "none" }}>Total Assets</TableCell>
                    <TableCell align="right" sx={{ color: "#4ade80", fontWeight: 700, border: "none" }}>
                      ${analysis.balanceSheet.assets.total.toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ color: "#f87171", mb: 2 }}>
              Liabilities
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ color: "#d2e0f5", border: "none" }}>Current Liabilities:</TableCell>
                    <TableCell sx={{ color: "white", border: "none" }}></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: "#a4b4cb", border: "none", pl: 3 }}>Accounts Payable</TableCell>
                    <TableCell align="right" sx={{ color: "white", border: "none" }}>
                      ${analysis.balanceSheet.liabilities.current.accountsPayable.toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ backgroundColor: "rgba(255,255,255,0.1)", borderTop: "2px solid #f87171" }}>
                    <TableCell sx={{ color: "white", fontWeight: 700, border: "none" }}>Total Liabilities</TableCell>
                    <TableCell align="right" sx={{ color: "#f87171", fontWeight: 700, border: "none" }}>
                      ${analysis.balanceSheet.liabilities.total.toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ color: "#01b8e3", mb: 2 }}>
              Equity
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ color: "#a4b4cb", border: "none" }}>Retained Earnings</TableCell>
                    <TableCell align="right" sx={{ color: "white", border: "none" }}>
                      ${analysis.balanceSheet.equity.retainedEarnings.toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ backgroundColor: "rgba(255,255,255,0.1)", borderTop: "2px solid #01b8e3" }}>
                    <TableCell sx={{ color: "white", fontWeight: 700, border: "none" }}>Total Equity</TableCell>
                    <TableCell align="right" sx={{ color: "#01b8e3", fontWeight: 700, border: "none" }}>
                      ${analysis.balanceSheet.equity.total.toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}

      {/* Financial Ratios */}
      <Box sx={{ mt: 4, pt: 4, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <Typography variant="h6" sx={{ color: "white", mb: 3 }}>
          Key Financial Ratios
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: "center" }}>
              <Typography sx={{ color: "#d2e0f5", fontSize: "12px", mb: 1 }}>
                Current Ratio
              </Typography>
              <Typography sx={{ color: "#4ade80", fontSize: "24px", fontWeight: 700 }}>
                {analysis?.balanceSheet?.ratios?.currentRatio?.toFixed(2) || '0.00'}
              </Typography>
              <Typography sx={{ color: "#a4b4cb", fontSize: "10px" }}>
                Liquidity Measure
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: "center" }}>
              <Typography sx={{ color: "#d2e0f5", fontSize: "12px", mb: 1 }}>
                Debt-to-Equity
              </Typography>
              <Typography sx={{ color: "#ff8c36", fontSize: "24px", fontWeight: 700 }}>
                {analysis?.balanceSheet?.ratios?.debtToEquity?.toFixed(2) || '0.00'}
              </Typography>
              <Typography sx={{ color: "#a4b4cb", fontSize: "10px" }}>
                Leverage Measure
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: "center" }}>
              <Typography sx={{ color: "#d2e0f5", fontSize: "12px", mb: 1 }}>
                Return on Assets
              </Typography>
              <Typography sx={{ color: "#01b8e3", fontSize: "24px", fontWeight: 700 }}>
                {analysis?.balanceSheet?.ratios?.returnOnAssets?.toFixed(1) || '0.0'}%
              </Typography>
              <Typography sx={{ color: "#a4b4cb", fontSize: "10px" }}>
                Efficiency Measure
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );

  const renderOptimizationTips = () => (
    <Stack spacing={3}>
      <Typography variant="h5" sx={{ color: "white", mb: 2 }}>
        AI-Powered Profit Optimization Recommendations
      </Typography>
      
      {analysis?.optimizationTips?.map((tip, index) => (
        <Card key={index} sx={{ p: 4 }}>
          <Stack direction="row" spacing={3}>
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: "12px",
                background: tip.priority === 'high' ? "#fdbcff" : 
                           tip.priority === 'medium' ? "#ffc5a3" : "#c1f5af",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Lightbulb 
                size={24} 
                color={tip.priority === 'high' ? "#d22cd6" : 
                       tip.priority === 'medium' ? "#f5640d" : "#45b020"} 
              />
            </Box>
            
            <Box sx={{ flex: 1 }}>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ color: "white" }}>
                  {tip.title}
                </Typography>
                <Chip
                  label={`${tip.priority} priority`}
                  size="small"
                  sx={{
                    backgroundColor: tip.priority === 'high' ? "#fdbcff" : 
                                   tip.priority === 'medium' ? "#ffc5a3" : "#c1f5af",
                    color: tip.priority === 'high' ? "#d22cd6" : 
                           tip.priority === 'medium' ? "#f5640d" : "#45b020",
                    fontSize: "10px"
                  }}
                />
                <Chip
                  label={tip.category}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(61,122,229,0.2)",
                    color: "#3d7ae5",
                    fontSize: "10px"
                  }}
                />
              </Stack>
              
              <Typography sx={{ color: "#d2e0f5", fontSize: "14px", mb: 3 }}>
                {tip.description}
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <Box>
                    <Typography sx={{ color: "#a4b4cb", fontSize: "10px", mb: 0.5 }}>
                      Potential Impact
                    </Typography>
                    <Typography sx={{ color: "#4ade80", fontSize: "16px", fontWeight: 600 }}>
                      {tip.potentialSavings || tip.potentialGain}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box>
                    <Typography sx={{ color: "#a4b4cb", fontSize: "10px", mb: 0.5 }}>
                      Implementation Time
                    </Typography>
                    <Typography sx={{ color: "white", fontSize: "14px" }}>
                      {tip.implementation}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box>
                    <Typography sx={{ color: "#a4b4cb", fontSize: "10px", mb: 0.5 }}>
                      Effort Level
                    </Typography>
                    <Typography sx={{ color: "white", fontSize: "14px" }}>
                      {tip.effort}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      borderColor: "#3d7ae5",
                      color: "#3d7ae5",
                      "&:hover": {
                        borderColor: "#01b8e3",
                        color: "#01b8e3"
                      }
                    }}
                  >
                    Learn More
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Card>
      ))}
    </Stack>
  );

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
          AI Financial Analysis
        </Typography>
        
        {analysis?.generatedAt && (
          <Typography sx={{ color: "#a4b4cb", fontSize: "12px" }}>
            Last updated: {analysis.generatedAt.toLocaleString()}
          </Typography>
        )}
      </Stack>

      <Box sx={{ mb: 4 }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{
            "& .MuiTab-root": {
              color: "#a4b4cb",
              fontFamily: "Sora",
              fontSize: "12px",
              textTransform: "none",
              "&.Mui-selected": {
                color: "#3d7ae5",
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#3d7ae5",
            },
          }}
        >
          <Tab label="Overview & Insights" value="overview" />
          <Tab label="Income Statement" value="income" />
          <Tab label="Balance Sheet" value="balance" />
          <Tab label="Optimization Tips" value="optimization" />
        </Tabs>
      </Box>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress size={60} />
        </Box>
      )}

      {!loading && analysis && (
        <>
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'income' && renderIncomeStatement()}
          {activeTab === 'balance' && renderBalanceSheet()}
          {activeTab === 'optimization' && renderOptimizationTips()}
        </>
      )}

      {!loading && !analysis && (
        <Alert severity="info" sx={{ mt: 4 }}>
          Add some financial data to your ledger and expenses to generate AI analysis.
        </Alert>
      )}
    </Box>
  );
};
