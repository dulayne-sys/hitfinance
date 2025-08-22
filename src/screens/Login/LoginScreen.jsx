import React from 'react';
import { Box, Button, Typography, Stack } from '@mui/material';

export const LoginScreen = ({ handleLogin }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#050624",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #050624 0%, #0a0d3a 50%, #050624 100%)",
      }}
    >
      <Box
        sx={{
          width: "400px",
          p: 6,
          borderRadius: "20px",
          background: "rgba(250, 251, 252, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          textAlign: "center",
        }}
      >
        <Stack spacing={4}>
          {/* Logo and Branding */}
          <Box>
            <Typography
              sx={{
                fontFamily: "Manrope",
                fontWeight: 800,
                fontSize: "48px",
                color: "white",
                background: "linear-gradient(90deg, rgba(62,121,229,1) 0%, rgba(1,184,227,1) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                mb: 1,
              }}
            >
              HitFinance
            </Typography>
            <Typography
              sx={{
                fontFamily: "Sora",
                fontWeight: 400,
                fontSize: "14px",
                color: "#d2e0f5",
                mb: 1,
              }}
            >
              by HitFluence Media & Technology Group
            </Typography>
            <Typography
              sx={{
                fontFamily: "Sora",
                fontWeight: 400,
                fontSize: "16px",
                color: "#a4b4cb",
              }}
            >
              Advanced Financial Management Platform
            </Typography>
          </Box>

          {/* Features */}
          <Stack spacing={2}>
            <Box
              sx={{
                p: 2,
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Sora",
                  fontWeight: 600,
                  fontSize: "12px",
                  color: "#01b8e3",
                  mb: 1,
                }}
              >
                ✨ Real-time Financial Tracking
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Sora",
                  fontWeight: 400,
                  fontSize: "10px",
                  color: "#d2e0f5",
                }}
              >
                Monitor revenue, expenses, and profitability
              </Typography>
            </Box>
            
            <Box
              sx={{
                p: 2,
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Sora",
                  fontWeight: 600,
                  fontSize: "12px",
                  color: "#01b8e3",
                  mb: 1,
                }}
              >
                📊 Advanced Forecasting
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Sora",
                  fontWeight: 400,
                  fontSize: "10px",
                  color: "#d2e0f5",
                }}
              >
                Predict future financial performance
              </Typography>
            </Box>
          </Stack>

          {/* Login Button */}
          <Button
            onClick={handleLogin}
            sx={{
              width: "100%",
              height: "56px",
              borderRadius: "10px",
              background: "linear-gradient(90deg, rgba(62,121,229,1) 0%, rgba(1,184,227,1) 100%)",
              fontFamily: "Sora",
              fontWeight: 600,
              fontSize: "14px",
              color: "white",
              textTransform: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              "&:hover": {
                background: "linear-gradient(90deg, rgba(62,121,229,0.8) 0%, rgba(1,184,227,0.8) 100%)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <Box
              component="img"
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQzLjYxMSAyMC4wODNINDJWMjBIMjR2OGgxMS4zMDNjLTEuNjQ5IDQuNjU3LTYuMDggOC0xMS4zMDMgOGMtNi42MjcgMC0xMi01LjM3My0xMi0xMmMwLTYuNjI3IDUuMzczLTEyIDEyLTEyYzMuMDU5IDAgNS44NDIgMS4xNTQgNy45NjEgMy4wMzlsNS42NTctNS42NTdDMzQuMDQ2IDYuMDUzIDI5LjI2OCA0IDI0IDRDMTIuOTU1IDQgNCA12Ljk1NSA0IDI0YzAgMTEuMDQ1IDguOTU1IDIwIDIwIDIwYzExLjA0NSAwIDIwLTguOTU1IDIwLTIwQzQ0IDIyLjY1OSA0My44NjIgMjEuMzUgNDMuNjExIDIwLjA4M3oiIGZpbGw9IiNGRkMxMDciLz4KPHBhdGggZD0iTTYuMzA2IDE0LjY5MWw2LjU3MSA0LjgxOUMxNC42NTUgMTUuMTA4IDE4Ljk2MSAxMiAyNCAxMmMzLjA1OSAwIDUuODQyIDEuMTU0IDcuOTYxIDMuMDM5bDUuNjU3LTUuNjU3QzM0LjA0NiA2LjA1MyAyOS4yNjggNCAyNCA0QzE2LjMxOCA0IDkuNjU2IDguMzM3IDYuMzA2IDE0LjY5MXoiIGZpbGw9IiNGRjNEMDAiLz4KPHBhdGggZD0iTTI0IDQ0YzUuMTY2IDAgOS44Ni0xLjk3NyAxMy40MDktNS4xOTJsLTYuMTktNS4yMzhDMjkuMjExIDM1LjA5MSAyNi43MTUgMzYgMjQgMzZjLTUuMjAyIDAtOS42MTktMy4zMTctMTEuMjgzLTcuOTQ2bC02LjUyMiA1LjAyNUM5LjUwNSAzOS41NTYgMTYuMjI3IDQ0IDI0IDQ0eiIgZmlsbD0iIzRDQUY1MCIvPgo8cGF0aCBkPSJNNDMuNjExIDIwLjA4M0g0MlYyMEgyNHY4aDExLjMwM2MtMC43OTIgMi4yMzctMi4yMzEgNC4xNjYtNC4wODcgNS41NzRsNi4xOSA1LjIzOEM0MC4wMDEgMzYuNjYxIDQ0IDMxLjEgNDQgMjRDNDQgMjIuNjU5IDQzLjg2MiAyMS4zNSA0My42MTEgMjAuMDgzeiIgZmlsbD0iIzE5NzZEMiIvPgo8L3N2Zz4K"
              alt="Google"
              sx={{ width: 20, height: 20 }}
            />
            Sign In with Google
          </Button>

          <Typography
            sx={{
              fontFamily: "Sora",
              fontWeight: 400,
              fontSize: "10px",
              color: "#798ba3",
            }}
          >
            Secure authentication powered by Google
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};
