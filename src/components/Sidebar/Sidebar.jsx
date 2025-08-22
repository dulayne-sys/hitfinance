import React from 'react';
import { Box, Stack, Typography, Button, Avatar } from '@mui/material';
import { BarChart2, DollarSign, TrendingUp, FileText, LogOut, Receipt, Brain, HelpCircle, CreditCard } from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart2 },
  { id: 'ledger', label: 'Finance Ledger', icon: DollarSign },
  { id: 'expenses', label: 'Expense Manager', icon: Receipt },
  { id: 'bank-connect', label: 'Bank Connections', icon: CreditCard },
  { id: 'forecast', label: 'Forecasts', icon: TrendingUp },
  { id: 'ai-analysis', label: 'AI Financial Analysis', icon: Brain },
  { id: 'documentation', label: 'Documentation', icon: FileText },
  { id: 'help', label: 'Help & FAQ', icon: HelpCircle },
];

export const Sidebar = ({ activeTab, setActiveTab, handleLogout, user }) => {
  return (
    <Box
      sx={{
        width: "317px",
        height: "100vh",
        backgroundColor: "rgba(61, 122, 229, 0.1)",
        position: "relative",
        p: 4,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 4, pb: 3, borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Avatar 
            src={user.photoURL} 
            sx={{ width: 40, height: 40 }}
          >
            {user.displayName?.charAt(0) || 'U'}
          </Avatar>
          <Box>
            <Typography
              sx={{
                fontFamily: "Manrope",
                fontWeight: 800,
                fontSize: "20px",
                color: "white",
                background: "linear-gradient(90deg, rgba(62,121,229,1) 0%, rgba(1,184,227,1) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              HitFinance
            </Typography>
            <Typography
              sx={{
                fontFamily: "Sora",
                fontWeight: 400,
                fontSize: "10px",
                color: "#d2e0f5",
              }}
            >
              by HitFluence Media & Technology Group
            </Typography>
          </Box>
        </Stack>
        <Typography
          sx={{
            fontFamily: "Sora",
            fontWeight: 400,
            fontSize: "12px",
            color: "#a4b4cb",
          }}
        >
          Welcome, {user.displayName?.split(' ')[0] || 'User'}
        </Typography>
      </Box>

      {/* Navigation */}
      <Stack spacing={1} sx={{ flex: 1 }}>
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              sx={{
                width: "100%",
                height: "48px",
                borderRadius: "10px",
                justifyContent: "flex-start",
                px: 2,
                background: isActive 
                  ? "linear-gradient(90deg, rgba(62,121,229,1) 0%, rgba(1,184,227,1) 100%)"
                  : "transparent",
                color: isActive ? "white" : "#a4b4cb",
                fontFamily: "Sora",
                fontWeight: 400,
                fontSize: "12px",
                textTransform: "none",
                "&:hover": {
                  background: isActive 
                    ? "linear-gradient(90deg, rgba(62,121,229,0.8) 0%, rgba(1,184,227,0.8) 100%)"
                    : "rgba(255, 255, 255, 0.05)",
                  color: isActive ? "white" : "#d2e0f5",
                },
              }}
            >
              <IconComponent size={18} style={{ marginRight: 12 }} />
              {item.label}
            </Button>
          );
        })}
      </Stack>

      {/* Logout Button */}
      <Button
        onClick={handleLogout}
        sx={{
          width: "100%",
          height: "48px",
          borderRadius: "10px",
          justifyContent: "flex-start",
          px: 2,
          background: "transparent",
          color: "#a4b4cb",
          fontFamily: "Sora",
          fontWeight: 400,
          fontSize: "12px",
          textTransform: "none",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          "&:hover": {
            background: "rgba(255, 255, 255, 0.05)",
            color: "#d2e0f5",
          },
        }}
      >
        <LogOut size={18} style={{ marginRight: 12 }} />
        Logout
      </Button>
    </Box>
  );
};
