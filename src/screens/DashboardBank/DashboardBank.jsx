import { Box, Grid } from "@mui/material";
import React from "react";
import { AccountSummarySection } from "./sections/AccountSummarySection";
import { MoneyOverviewSection } from "./sections/MoneyOverviewSection";
import { SideBarSection } from "./sections/SideBarSection/SideBarSection";
import { TransactionsSection } from "./sections/TransactionsSection";

export const DashboardBank = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#050624",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
      data-model-id="10:529"
    >
      <Box
        sx={{
          backgroundColor: "#050624",
          width: "100%",
          maxWidth: "1409px",
          minHeight: "774px",
          position: "relative",
        }}
      >
        <Grid container spacing={0} sx={{ height: "100%" }}>
          <Grid item xs={12} md={7.8}>
            <Box
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              <Box sx={{ width: "100%", height: "44%" }}>
                <MoneyOverviewSection />
              </Box>
              <Box sx={{ display: "flex", flex: 1 }}>
                <Box sx={{ flex: 2.2 }}>
                  <TransactionsSection />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <AccountSummarySection />
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4.2}>
            <SideBarSection />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
