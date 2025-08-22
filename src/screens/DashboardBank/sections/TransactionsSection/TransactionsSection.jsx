import CalendarToday from "@mui/icons-material/CalendarToday";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import {
  Avatar,
  Box,
  Button,
  Chip,
  FormControl,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const transactionData = [
  {
    id: 1,
    name: "Dunkin donuts",
    date: "May 23, 2022 at 8:20 PM",
    category: "Food",
    categoryColor: "#d22bd5",
    categoryBg: "#fdbcff",
    amount: "-$19.00",
    icon: "https://c.animaapp.com/ZlWxrohe/img/icon-12@2x.png",
    trendIcon: "https://c.animaapp.com/ZlWxrohe/img/icon-13.svg",
    dateGroup: "May 23, 2022",
  },
  {
    id: 2,
    name: "Uber",
    date: "May 23, 2022 at 10:36 AM",
    category: "Transport",
    categoryColor: "#1092ef",
    categoryBg: "#a6d6f8",
    amount: "-$7.00",
    icon: "https://c.animaapp.com/ZlWxrohe/img/icon-10@2x.png",
    trendIcon: "https://c.animaapp.com/ZlWxrohe/img/icon-11.svg",
    dateGroup: "May 23, 2022",
  },
  {
    id: 3,
    name: "Paymant Salary",
    date: "May 23, 2022 at 9:48 AM",
    category: "Service",
    categoryColor: "#45b01f",
    categoryBg: "#c1f5af",
    amount: "+$15,000",
    icon: "https://c.animaapp.com/ZlWxrohe/img/icon-8@2x.png",
    trendIcon: "https://c.animaapp.com/ZlWxrohe/img/icon-9.svg",
    dateGroup: "May 23, 2022",
  },
  {
    id: 4,
    name: "Elon Musk",
    date: "May 22, 2022 at 4:48 PM",
    category: "Service",
    categoryColor: "#45b01f",
    categoryBg: "#c1f5af",
    amount: "+$3,000",
    icon: "https://c.animaapp.com/ZlWxrohe/img/icon-6@2x.png",
    trendIcon: "https://c.animaapp.com/ZlWxrohe/img/icon-7.svg",
    dateGroup: "May 22, 2022",
  },
  {
    id: 5,
    name: "Apple",
    date: "May 23, 2022 at 4:48 PM",
    category: "Shop",
    categoryColor: "#f5630d",
    categoryBg: "#ffc5a3",
    amount: "-499.00",
    icon: "https://c.animaapp.com/ZlWxrohe/img/icon-4@2x.png",
    trendIcon: "https://c.animaapp.com/ZlWxrohe/img/icon-5.svg",
    dateGroup: "May 23, 2022",
  },
];

export const TransactionsSection = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState("May");

  const groupedTransactions = transactionData.reduce((groups, transaction) => {
    const date = transaction.dateGroup;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {});

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: "Manrope",
          fontWeight: 800,
          color: "#ffffff",
          fontSize: "16px",
          mb: 5,
        }}
      >
        Transactions
      </Typography>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Box sx={{ position: "relative" }}>
          <Stack direction="row" spacing={3}>
            <Box
              onClick={() => handleTabChange("All")}
              sx={{
                cursor: "pointer",
                position: "relative",
                pb: 1,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Sora",
                  fontSize: "12px",
                  color: activeTab === "All" ? "#3d7ae5" : "#a4b4cb",
                  fontWeight: 400,
                }}
              >
                All
              </Typography>
              {activeTab === "All" && (
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "22px",
                    height: "2px",
                    backgroundColor: "#3d7ae5",
                    borderRadius: "5px",
                  }}
                />
              )}
            </Box>
            <Box
              onClick={() => handleTabChange("Upcoming")}
              sx={{
                cursor: "pointer",
                position: "relative",
                pb: 1,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Sora",
                  fontSize: "12px",
                  color: activeTab === "Upcoming" ? "#3d7ae5" : "#a4b4cb",
                  fontWeight: 400,
                }}
              >
                Upcoming
              </Typography>
              {activeTab === "Upcoming" && (
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "22px",
                    height: "2px",
                    backgroundColor: "#3d7ae5",
                    borderRadius: "5px",
                  }}
                />
              )}
            </Box>
          </Stack>
        </Box>

        <FormControl size="small">
          <Select
            value={selectedMonth}
            onChange={handleMonthChange}
            sx={{
              border: "1px solid #4b6eac",
              borderRadius: "8px",
              color: "#d3e1f5",
              fontSize: "8px",
              fontFamily: "Sora",
              "& .MuiSelect-select": {
                padding: "8px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
            startAdornment={
              <CalendarToday sx={{ width: 12, height: 12, mr: 0.5 }} />
            }
            IconComponent={KeyboardArrowDown}
          >
            <MenuItem value="May">May</MenuItem>
            <MenuItem value="June">June</MenuItem>
            <MenuItem value="July">July</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Box sx={{ position: "relative" }}>
        <Box
          component="img"
          src="https://c.animaapp.com/ZlWxrohe/img/lines.png"
          alt="Lines"
          sx={{
            width: "100%",
            height: "160px",
            objectFit: "cover",
            mb: 2,
          }}
        />

        <Stack spacing={2} sx={{ position: "relative" }}>
          {Object.entries(groupedTransactions).map(
            ([dateGroup, transactions]) => (
              <Box key={dateGroup}>
                <Typography
                  sx={{
                    fontFamily: "Manrope",
                    fontWeight: 600,
                    color: "#d2e0f5",
                    fontSize: "10px",
                    opacity: 0.6,
                    mb: 1,
                  }}
                >
                  {dateGroup}
                </Typography>
                <Stack spacing={1}>
                  {transactions.map((transaction) => (
                    <Stack
                      key={transaction.id}
                      direction="row"
                      alignItems="center"
                      spacing={1.5}
                      sx={{ height: "26px" }}
                    >
                      <Avatar
                        src={transaction.icon}
                        sx={{ width: 24, height: 24 }}
                      />

                      <Stack sx={{ minWidth: 0, flex: 1 }}>
                        <Typography
                          sx={{
                            fontFamily: "Sora",
                            fontSize: "10px",
                            color: "#ffffff",
                            fontWeight: 400,
                            lineHeight: "13px",
                          }}
                        >
                          {transaction.name}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "Manrope",
                            fontSize: "8px",
                            color: "#5b5b5b",
                            fontWeight: 400,
                          }}
                        >
                          {transaction.date}
                        </Typography>
                      </Stack>

                      <Chip
                        avatar={
                          <Box
                            sx={{
                              width: 4,
                              height: 4,
                              backgroundColor: transaction.categoryColor,
                              borderRadius: "2px",
                            }}
                          />
                        }
                        label={transaction.category}
                        sx={{
                          backgroundColor: transaction.categoryBg,
                          color: transaction.categoryColor,
                          fontSize: "8px",
                          fontFamily: "Sora",
                          fontWeight: 400,
                          height: "16px",
                          borderRadius: "3px",
                          "& .MuiChip-label": {
                            px: 0.5,
                          },
                        }}
                      />

                      <Box
                        component="img"
                        src={transaction.trendIcon}
                        alt="Trend"
                        sx={{ width: 18, height: 18 }}
                      />

                      <Typography
                        sx={{
                          fontFamily: "Sora",
                          fontSize: "12px",
                          color: "#fafbfc",
                          fontWeight: 400,
                          textAlign: "right",
                          minWidth: "60px",
                        }}
                      >
                        {transaction.amount}
                      </Typography>

                      <Button
                        variant="contained"
                        sx={{
                          fontSize: "8px",
                          fontFamily: "Sora",
                          fontWeight: 400,
                          color: "#fafbfc",
                          background:
                            "linear-gradient(90deg, rgba(62,121,229,1) 0%, rgba(1,184,227,1) 100%)",
                          borderRadius: "8px",
                          padding: "8px",
                          minWidth: "auto",
                          height: "26px",
                          textTransform: "none",
                          "&:hover": {
                            background:
                              "linear-gradient(90deg, rgba(62,121,229,0.8) 0%, rgba(1,184,227,0.8) 100%)",
                          },
                        }}
                      >
                        See invoice
                      </Button>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            ),
          )}
        </Stack>
      </Box>
    </Box>
  );
};
