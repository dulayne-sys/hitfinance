import React from 'react';
import { 
  Box, 
  Typography, 
  Stack, 
  Card, 
  Button, 
  Grid, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
  Chip,
  IconButton,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  Avatar,
  Divider
} from '@mui/material';
import { 
  CreditCard, 
  Plus, 
  Shield, 
  Zap, 
  CheckCircle, 
  AlertTriangle,
  Sync,
  Trash2,
  Eye,
  Lock,
  TrendingUp,
  DollarSign,
  Receipt,
  Brain,
  ExternalLink
} from 'lucide-react';
import { bankConnectionService } from '../../services/bankService';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../App';

export const BankConnectionScreen = ({ userId }) => {
  const [connections, setConnections] = React.useState([]);
  const [supportedBanks, setSupportedBanks] = React.useState([]);
  const [showConnectDialog, setShowConnectDialog] = React.useState(false);
  const [selectedBank, setSelectedBank] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [connectionStep, setConnectionStep] = React.useState(0);
  const [credentials, setCredentials] = React.useState({ username: '', password: '' });
  const [importProgress, setImportProgress] = React.useState(null);
  const [syncingConnection, setSyncingConnection] = React.useState(null);

  const connectionSteps = ['Select Bank', 'Enter Credentials', 'Verify Connection', 'Import Data'];

  React.useEffect(() => {
    // Load supported banks
    setSupportedBanks(bankConnectionService.getSupportedBanks());

    // Listen to bank connections
    if (!userId) return;
    const q = query(collection(db, `users/${userId}/bankConnections`));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const connectionsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        connectedAt: doc.data().connectedAt?.toDate(),
        lastSync: doc.data().lastSync?.toDate()
      }));
      setConnections(connectionsData);
    });

    return () => unsubscribe();
  }, [userId]);

  const handleConnectBank = async () => {
    if (!selectedBank || !credentials.username || !credentials.password) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setConnectionStep(2); // Verify Connection

    try {
      // Simulate connection steps
      await new Promise(resolve => setTimeout(resolve, 2000));
      setConnectionStep(3); // Import Data
      
      setImportProgress({ current: 0, total: 100, status: 'Analyzing transactions...' });
      
      // Simulate import progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setImportProgress({ 
          current: i, 
          total: 100, 
          status: i < 30 ? 'Connecting to bank...' :
                  i < 60 ? 'Downloading transactions...' :
                  i < 90 ? 'Analyzing with AI...' : 'Populating your data...'
        });
      }

      const result = await bankConnectionService.connectBank(userId, selectedBank.id, credentials);
      
      setImportProgress({ 
        current: 100, 
        total: 100, 
        status: `Successfully imported ${result.ledgerCount || 0} ledger entries and ${result.expenseCount || 0} expenses!`
      });

      setTimeout(() => {
        setShowConnectDialog(false);
        resetConnectionDialog();
      }, 2000);

    } catch (error) {
      console.error('Connection error:', error);
      alert('Failed to connect to bank. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetConnectionDialog = () => {
    setSelectedBank(null);
    setCredentials({ username: '', password: '' });
    setConnectionStep(0);
    setImportProgress(null);
  };

  const handleSyncConnection = async (connectionId) => {
    setSyncingConnection(connectionId);
    try {
      const result = await bankConnectionService.syncBankData(userId, connectionId);
      alert(`Synced ${result.newTransactions} new transactions`);
    } catch (error) {
      console.error('Sync error:', error);
      alert('Failed to sync bank data');
    } finally {
      setSyncingConnection(null);
    }
  };

  const handleDisconnectBank = async (connectionId) => {
    if (window.confirm('Are you sure you want to disconnect this bank account?')) {
      try {
        await bankConnectionService.disconnectBank(userId, connectionId);
      } catch (error) {
        console.error('Disconnect error:', error);
        alert('Failed to disconnect bank');
      }
    }
  };

  const renderConnectionDialog = () => (
    <Dialog 
      open={showConnectDialog} 
      onClose={() => setShowConnectDialog(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ backgroundColor: "#050624", color: "white", pb: 2 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <CreditCard size={24} />
          <Typography variant="h6">Connect Your Bank Account</Typography>
        </Stack>
      </DialogTitle>
      
      <DialogContent sx={{ backgroundColor: "#050624", p: 3 }}>
        <Stepper activeStep={connectionStep} sx={{ mb: 4 }}>
          {connectionSteps.map((label) => (
            <Step key={label}>
              <StepLabel sx={{ 
                "& .MuiStepLabel-label": { color: "#d2e0f5" },
                "& .MuiStepIcon-root": { color: "#3d7ae5" }
              }}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {connectionStep === 0 && (
          <Box>
            <Typography sx={{ color: "white", mb: 3 }}>
              Select your bank to get started:
            </Typography>
            <Grid container spacing={2}>
              {supportedBanks.map((bank) => (
                <Grid item xs={12} sm={6} key={bank.id}>
                  <Card
                    sx={{
                      p: 2,
                      cursor: "pointer",
                      border: selectedBank?.id === bank.id ? "2px solid #3d7ae5" : "1px solid rgba(255,255,255,0.1)",
                      "&:hover": { borderColor: "#3d7ae5" }
                    }}
                    onClick={() => setSelectedBank(bank)}
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar src={bank.logo} sx={{ width: 40, height: 40 }} />
                      <Box>
                        <Typography sx={{ color: "white", fontWeight: 600 }}>
                          {bank.name}
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                          {bank.features.map((feature) => (
                            <Chip
                              key={feature}
                              label={feature}
                              size="small"
                              sx={{
                                backgroundColor: "rgba(61,122,229,0.2)",
                                color: "#3d7ae5",
                                fontSize: "8px",
                                height: "16px"
                              }}
                            />
                          ))}
                        </Stack>
                      </Box>
                    </Stack>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {connectionStep === 1 && selectedBank && (
          <Box>
            <Alert severity="info" sx={{ mb: 3 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Shield size={16} />
                <Typography fontSize="12px">
                  Your credentials are encrypted and secure. We use bank-level security.
                </Typography>
              </Stack>
            </Alert>
            
            <Typography sx={{ color: "white", mb: 3 }}>
              Enter your {selectedBank.name} online banking credentials:
            </Typography>
            
            <Stack spacing={3}>
              <TextField
                label="Username/Email"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                fullWidth
                required
              />
              <TextField
                label="Password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                fullWidth
                required
              />
            </Stack>
          </Box>
        )}

        {connectionStep === 2 && (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <CircularProgress size={60} sx={{ mb: 3 }} />
            <Typography sx={{ color: "white", mb: 2 }}>
              Verifying your credentials...
            </Typography>
            <Typography sx={{ color: "#a4b4cb", fontSize: "12px" }}>
              This may take a few moments
            </Typography>
          </Box>
        )}

        {connectionStep === 3 && importProgress && (
          <Box sx={{ py: 2 }}>
            <Typography sx={{ color: "white", mb: 2 }}>
              {importProgress.status}
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={importProgress.current} 
              sx={{ 
                height: 8, 
                borderRadius: 4,
                backgroundColor: "rgba(255,255,255,0.1)",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#3d7ae5"
                }
              }} 
            />
            <Typography sx={{ color: "#a4b4cb", fontSize: "12px", mt: 1 }}>
              {importProgress.current}% complete
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ backgroundColor: "#050624", p: 3 }}>
        <Button 
          onClick={() => setShowConnectDialog(false)}
          sx={{ color: "#d2e0f5" }}
        >
          Cancel
        </Button>
        {connectionStep === 0 && (
          <Button
            onClick={() => setConnectionStep(1)}
            disabled={!selectedBank}
            sx={{
              background: "linear-gradient(90deg, rgba(62,121,229,1) 0%, rgba(1,184,227,1) 100%)",
              color: "white"
            }}
          >
            Continue
          </Button>
        )}
        {connectionStep === 1 && (
          <Button
            onClick={handleConnectBank}
            disabled={loading || !credentials.username || !credentials.password}
            sx={{
              background: "linear-gradient(90deg, rgba(62,121,229,1) 0%, rgba(1,184,227,1) 100%)",
              color: "white"
            }}
          >
            Connect Bank
          </Button>
        )}
      </DialogActions>
    </Dialog>
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
          Bank Connections
        </Typography>
        <Button
          onClick={() => setShowConnectDialog(true)}
          sx={{
            height: "48px",
            borderRadius: "10px",
            background: "linear-gradient(90deg, rgba(62,121,229,1) 0%, rgba(1,184,227,1) 100%)",
            fontFamily: "Sora",
            fontWeight: 600,
            fontSize: "12px",
            color: "white",
            textTransform: "none",
            px: 3,
            "&:hover": {
              background: "linear-gradient(90deg, rgba(62,121,229,0.8) 0%, rgba(1,184,227,0.8) 100%)",
            },
          }}
        >
          <Plus size={18} style={{ marginRight: 8 }} />
          Connect Bank Account
        </Button>
      </Stack>

      {/* Benefits Section */}
      <Card sx={{ p: 4, mb: 4, background: "linear-gradient(135deg, rgba(61,122,229,0.1) 0%, rgba(1,184,227,0.1) 100%)" }}>
        <Typography variant="h5" sx={{ color: "white", mb: 3 }}>
          Why Connect Your Bank?
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Stack alignItems="center" spacing={2}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "#c1f5af",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Zap size={24} color="#45b020" />
              </Box>
              <Typography variant="h6" sx={{ color: "white", textAlign: "center" }}>
                Auto-Import
              </Typography>
              <Typography sx={{ color: "#d2e0f5", fontSize: "12px", textAlign: "center" }}>
                Automatically import and categorize your transactions
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Stack alignItems="center" spacing={2}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "#e6ccff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Brain size={24} color="#9513fb" />
              </Box>
              <Typography variant="h6" sx={{ color: "white", textAlign: "center" }}>
                AI Analysis
              </Typography>
              <Typography sx={{ color: "#d2e0f5", fontSize: "12px", textAlign: "center" }}>
                Smart categorization and expense detection
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Stack alignItems="center" spacing={2}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "#a6d6f8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Shield size={24} color="#1092ef" />
              </Box>
              <Typography variant="h6" sx={{ color: "white", textAlign: "center" }}>
                Bank-Level Security
              </Typography>
              <Typography sx={{ color: "#d2e0f5", fontSize: "12px", textAlign: "center" }}>
                256-bit encryption and secure connections
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Stack alignItems="center" spacing={2}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "#ffc5a3",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <TrendingUp size={24} color="#f5640d" />
              </Box>
              <Typography variant="h6" sx={{ color: "white", textAlign: "center" }}>
                Real-time Sync
              </Typography>
              <Typography sx={{ color: "#d2e0f5", fontSize: "12px", textAlign: "center" }}>
                Keep your financial data up-to-date automatically
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Card>

      {/* Connected Banks */}
      {connections.length > 0 ? (
        <Stack spacing={3}>
          <Typography variant="h5" sx={{ color: "white" }}>
            Connected Accounts ({connections.length})
          </Typography>
          
          {connections.map((connection) => (
            <Card key={connection.id} sx={{ p: 3 }}>
              <Stack direction="row" alignItems="center" spacing={3}>
                <Avatar src={connection.bankLogo} sx={{ width: 50, height: 50 }} />
                
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ color: "white", mb: 1 }}>
                    {connection.bankName}
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Chip
                      label={connection.status === 'connected' ? 'Connected' : 'Disconnected'}
                      size="small"
                      sx={{
                        backgroundColor: connection.status === 'connected' ? "#c1f5af" : "#fdbcff",
                        color: connection.status === 'connected' ? "#45b020" : "#d22cd6",
                        fontSize: "10px"
                      }}
                    />
                    <Typography sx={{ color: "#a4b4cb", fontSize: "12px" }}>
                      Last sync: {connection.lastSync?.toLocaleDateString() || 'Never'}
                    </Typography>
                  </Stack>
                  
                  {connection.accounts && (
                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                      {connection.accounts.map((account, index) => (
                        <Box key={index} sx={{ 
                          p: 2, 
                          borderRadius: "8px", 
                          background: "rgba(255,255,255,0.05)",
                          minWidth: "150px"
                        }}>
                          <Typography sx={{ color: "#d2e0f5", fontSize: "12px", mb: 0.5 }}>
                            {account.name}
                          </Typography>
                          <Typography sx={{ color: "white", fontWeight: 600 }}>
                            ${account.balance?.toLocaleString() || '0.00'}
                          </Typography>
                          <Typography sx={{ color: "#a4b4cb", fontSize: "10px" }}>
                            ****{account.mask}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  )}
                </Box>

                <Stack direction="row" spacing={1}>
                  <IconButton
                    onClick={() => handleSyncConnection(connection.id)}
                    disabled={syncingConnection === connection.id}
                    sx={{ color: "#01b8e3", "&:hover": { color: "#3d7ae5" } }}
                  >
                    {syncingConnection === connection.id ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <Sync size={20} />
                    )}
                  </IconButton>
                  <IconButton
                    onClick={() => handleDisconnectBank(connection.id)}
                    sx={{ color: "#f87171", "&:hover": { color: "#ef4444" } }}
                  >
                    <Trash2 size={20} />
                  </IconButton>
                </Stack>
              </Stack>
            </Card>
          ))}
        </Stack>
      ) : (
        <Card sx={{ p: 6, textAlign: "center" }}>
          <CreditCard size={64} color="#a4b4cb" style={{ marginBottom: 16 }} />
          <Typography variant="h5" sx={{ color: "white", mb: 2 }}>
            No Bank Accounts Connected
          </Typography>
          <Typography sx={{ color: "#a4b4cb", mb: 4 }}>
            Connect your bank account to automatically import and analyze your financial data with AI.
          </Typography>
          <Button
            onClick={() => setShowConnectDialog(true)}
            sx={{
              background: "linear-gradient(90deg, rgba(62,121,229,1) 0%, rgba(1,184,227,1) 100%)",
              color: "white",
              px: 4,
              py: 1.5
            }}
          >
            <Plus size={18} style={{ marginRight: 8 }} />
            Connect Your First Bank
          </Button>
        </Card>
      )}

      {/* Security Information */}
      <Card sx={{ p: 4, mt: 4, background: "linear-gradient(135deg, rgba(255,140,54,0.1) 0%, rgba(245,100,13,0.1) 100%)" }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Lock size={24} color="#ff8c36" />
          <Typography variant="h6" sx={{ color: "#ff8c36" }}>
            Security & Privacy
          </Typography>
        </Stack>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ color: "#d2e0f5", fontSize: "12px", mb: 2 }}>
              <strong>Bank-Level Encryption:</strong> All data is encrypted using 256-bit SSL encryption, the same standard used by major banks.
            </Typography>
            <Typography sx={{ color: "#d2e0f5", fontSize: "12px", mb: 2 }}>
              <strong>Read-Only Access:</strong> We can only view your transaction history. We cannot move money or make changes to your accounts.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={{ color: "#d2e0f5", fontSize: "12px", mb: 2 }}>
              <strong>No Data Sharing:</strong> Your financial data is never shared with third parties or used for advertising.
            </Typography>
            <Typography sx={{ color: "#d2e0f5", fontSize: "12px", mb: 2 }}>
              <strong>Secure Storage:</strong> All data is stored in encrypted databases with multiple layers of security.
            </Typography>
          </Grid>
        </Grid>
      </Card>

      {renderConnectionDialog()}
    </Box>
  );
};
