import TrendingDownOutlined from "@mui/icons-material/TrendingDownOutlined";
import TrendingUpOutlined from "@mui/icons-material/TrendingUpOutlined";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";

const summaryData = [
  {
    type: "Income",
    amount: "+$27,785",
    icon: TrendingUpOutlined,
    iconSrc: "https://c.animaapp.com/ZlWxrohe/img/icon-2@2x.png",
  },
  {
    type: "Expense",
    amount: "-$27,785",
    icon: TrendingDownOutlined,
    iconSrc: "https://c.animaapp.com/ZlWxrohe/img/icon-3@2x.png",
  },
];

const legendData = [
  { label: "Service", color: "#45b020" },
  { label: "Transport", color: "#1092ef" },
  { label: "Health", color: "#9513fb" },
  { label: "Food", color: "#d22cd6" },
  { label: "Shop", color: "#f5640d" },
];

export const AccountSummarySection = () => {
  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: "Manrope, Helvetica",
          fontWeight: 800,
          color: "white",
          fontSize: "16px",
          mb: 5,
        }}
      >
        Account Summary
      </Typography>

      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          {summaryData.map((item, index) => (
            <Card
              key={index}
              sx={{
                width: 112,
                height: 59,
                background:
                  "linear-gradient(0deg, rgba(250,251,252,0.1) 0%, rgba(250,251,252,0.1) 100%), linear-gradient(90deg, rgba(240,240,240,0.2) 0%, rgba(240,240,240,0) 100%)",
                border: "1px solid transparent",
                borderRadius: "10px",
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  padding: "1px",
                  borderRadius: "10px",
                  background:
                    "linear-gradient(90deg, rgba(62,121,229,1) 0%, rgba(1,184,227,1) 100%)",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  zIndex: 1,
                  pointerEvents: "none",
                },
              }}
            >
              <CardContent sx={{ p: 1, "&:last-child": { pb: 1 } }}>
                <Box sx={{ position: "relative", zIndex: 2 }}>
                  <img
                    src={item.iconSrc}
                    alt="Icon"
                    style={{
                      width: "18px",
                      height: "10px",
                      position: "absolute",
                      top: "2px",
                      left: "1px",
                    }}
                  />

                  <Typography
                    sx={{
                      fontFamily: "Sora, Helvetica",
                      fontWeight: 400,
                      color: "#d2e0f5",
                      fontSize: "12px",
                      position: "absolute",
                      top: index === 0 ? "7px" : "6px",
                      left: "25px",
                    }}
                  >
                    {item.type}
                  </Typography>

                  <Typography
                    sx={{
                      fontFamily: "Manrope, Helvetica",
                      fontWeight: 700,
                      color: "white",
                      fontSize: "18px",
                      textAlign: "center",
                      position: "absolute",
                      top: "28px",
                      left: index === 0 ? "5px" : "0px",
                      width: index === 0 ? "84px" : "78px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.amount}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>

        <Card
          sx={{
            width: 239,
            height: 232,
            background: "rgba(250, 251, 252, 0.15)",
            borderRadius: "10px",
            border: "none",
          }}
        >
          <CardContent sx={{ p: 2, position: "relative" }}>
            <Box
              sx={{
                position: "relative",
                width: 196,
                height: 147,
                mx: "auto",
                mt: 0,
              }}
            >
              <Box
                sx={{
                  width: 163,
                  height: 147,
                  backgroundImage:
                    "url(https://c.animaapp.com/ZlWxrohe/img/graphic@2x.png)",
                  backgroundSize: "100% 100%",
                  position: "relative",
                }}
              >
                <Typography
                  sx={{
                    position: "absolute",
                    top: "122px",
                    left: "52px",
                    fontFamily: "Sora, Helvetica",
                    fontWeight: 400,
                    color: "white",
                    fontSize: "8.1px",
                  }}
                >
                  35%
                </Typography>
                <Typography
                  sx={{
                    position: "absolute",
                    top: "78px",
                    left: "130px",
                    fontFamily: "Sora, Helvetica",
                    fontWeight: 400,
                    color: "white",
                    fontSize: "8.1px",
                  }}
                >
                  25%
                </Typography>
                <Typography
                  sx={{
                    position: "absolute",
                    top: "12px",
                    left: "50px",
                    fontFamily: "Sora, Helvetica",
                    fontWeight: 400,
                    color: "white",
                    fontSize: "8.1px",
                  }}
                >
                  11%
                </Typography>
                <Typography
                  sx={{
                    position: "absolute",
                    top: "21px",
                    left: "101px",
                    fontFamily: "Sora, Helvetica",
                    fontWeight: 400,
                    color: "white",
                    fontSize: "8.1px",
                  }}
                >
                  12%
                </Typography>
                <Typography
                  sx={{
                    position: "absolute",
                    top: "53px",
                    left: "10px",
                    fontFamily: "Sora, Helvetica",
                    fontWeight: 400,
                    color: "white",
                    fontSize: "8.1px",
                  }}
                >
                  17%
                </Typography>
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  width: 46,
                  height: 14,
                  top: "72px",
                  left: "150px",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    width: 44,
                    height: 4,
                    top: "10px",
                    left: 0,
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      width: 4,
                      height: 4,
                      top: 0,
                      left: 0,
                      background: "#fafbfc",
                      borderRadius: "2px",
                    }}
                  />
                  <img
                    src="https://c.animaapp.com/ZlWxrohe/img/vector-643.svg"
                    alt="Vector"
                    style={{
                      position: "absolute",
                      width: "41px",
                      height: "1px",
                      top: "2px",
                      left: "2px",
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: "15px",
                    fontFamily: "Sora, Helvetica",
                    fontWeight: 700,
                    color: "#fafbfc",
                    fontSize: "8px",
                  }}
                >
                  $7,244
                </Typography>
              </Box>
            </Box>

            <Stack
              direction="row"
              spacing={2.25}
              sx={{ position: "absolute", top: "185px", left: "24px" }}
            >
              <Stack spacing={1}>
                <Stack direction="row" alignItems="center" spacing={0.75}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      background: "#45b020",
                      borderRadius: "50%",
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: "Sora, Helvetica",
                      fontWeight: 400,
                      color: "#fafbfc",
                      fontSize: "8px",
                    }}
                  >
                    Service
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={0.75}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      background: "#d22cd6",
                      borderRadius: "50%",
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: "Sora, Helvetica",
                      fontWeight: 400,
                      color: "#fafbfc",
                      fontSize: "8px",
                    }}
                  >
                    Food
                  </Typography>
                </Stack>
              </Stack>

              <Stack spacing={1}>
                <Stack direction="row" alignItems="center" spacing={0.75}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      background: "#1092ef",
                      borderRadius: "50%",
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: "Sora, Helvetica",
                      fontWeight: 400,
                      color: "#fafbfc",
                      fontSize: "8px",
                    }}
                  >
                    Transport
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={0.75}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      background: "#f5640d",
                      borderRadius: "50%",
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: "Sora, Helvetica",
                      fontWeight: 400,
                      color: "#fafbfc",
                      fontSize: "8px",
                    }}
                  >
                    Shop
                  </Typography>
                </Stack>
              </Stack>

              <Stack spacing={1}>
                <Stack direction="row" alignItems="center" spacing={0.75}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      background: "#9513fb",
                      borderRadius: "50%",
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: "Sora, Helvetica",
                      fontWeight: 400,
                      color: "#fafbfc",
                      fontSize: "8px",
                    }}
                  >
                    Health
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};
