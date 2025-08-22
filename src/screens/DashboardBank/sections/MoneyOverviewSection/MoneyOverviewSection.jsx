import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const chartDates = [
  { label: "DEC 2", active: false },
  { label: "DEC 3", active: false },
  { label: "DEC 4", active: false },
  { label: "DEC 5", active: true },
  { label: "DEC 6", active: false },
  { label: "DEC 7", active: false },
  { label: "DEC 8", active: false },
  { label: "DEC 5", active: false },
  { label: "DEC 10", active: false },
  { label: "DEC 11", active: false },
  { label: "DEC 12", active: false },
];

const yAxisLabels = ["4k", "3k", "2k", "1k", "0k"];

export const MoneyOverviewSection = () => {
  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <Typography
        variant="h2"
        sx={{
          fontFamily: "Manrope, Helvetica",
          fontWeight: 800,
          color: "white",
          fontSize: "24px",
          mb: 4,
        }}
      >
        Overview
      </Typography>

      <Stack direction="row" spacing={4} sx={{ height: "277px" }}>
        {/* Left side cards and button */}
        <Stack spacing={2} sx={{ width: "237px" }}>
          {/* First balance card */}
          <Card
            sx={{
              height: "98px",
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
            <CardContent
              sx={{
                p: 2,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Box sx={{ position: "relative" }}>
                <Typography
                  sx={{
                    fontFamily: "Sora, Helvetica",
                    fontWeight: 400,
                    color: "#d2e0f5",
                    fontSize: "12px",
                  }}
                >
                  Total Balance
                </Typography>
                <Box
                  sx={{
                    width: "16px",
                    height: "2px",
                    borderRadius: "5px",
                    background:
                      "linear-gradient(38deg, rgba(54,217,255,1) 0%, rgba(74,0,197,1) 100%)",
                    mt: 0.5,
                  }}
                />
              </Box>
              <Typography
                sx={{
                  fontFamily: "Manrope, Helvetica",
                  fontWeight: 800,
                  color: "white",
                  fontSize: "32px",
                  lineHeight: "normal",
                }}
              >
                $25,369
              </Typography>
            </CardContent>
          </Card>

          {/* Second balance card */}
          <Card
            sx={{
              height: "88px",
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
            <CardContent
              sx={{
                p: 2,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Box sx={{ position: "relative" }}>
                <Typography
                  sx={{
                    fontFamily: "Sora, Helvetica",
                    fontWeight: 400,
                    color: "#d2e0f5",
                    fontSize: "12px",
                  }}
                >
                  Total Balance
                </Typography>
                <Box
                  sx={{
                    width: "16px",
                    height: "2px",
                    borderRadius: "5px",
                    background:
                      "linear-gradient(38deg, rgba(54,217,255,1) 0%, rgba(74,0,197,1) 100%)",
                    mt: 0.5,
                  }}
                />
              </Box>
              <Typography
                sx={{
                  fontFamily: "Manrope, Helvetica",
                  fontWeight: 700,
                  color: "white",
                  fontSize: "24px",
                  opacity: 0.8,
                }}
              >
                $25,369
              </Typography>
            </CardContent>
          </Card>

          {/* Make payment button */}
          <Button
            sx={{
              width: "100%",
              height: "35px",
              borderRadius: "10px",
              background:
                "linear-gradient(90deg, rgba(62,121,229,1) 0%, rgba(1,184,227,1) 100%)",
              fontFamily: "Sora, Helvetica",
              fontWeight: 400,
              fontSize: "12px",
              color: "white",
              textTransform: "none",
              "&:hover": {
                background:
                  "linear-gradient(90deg, rgba(62,121,229,0.8) 0%, rgba(1,184,227,0.8) 100%)",
              },
            }}
          >
            Make a paymant
          </Button>
        </Stack>

        {/* Chart area */}
        <Box
          sx={{
            width: "535px",
            height: "277px",
            backgroundImage:
              "url(https://c.animaapp.com/ZlWxrohe/img/rectangle-5691.svg)",
            backgroundSize: "100% 100%",
            position: "relative",
          }}
        >
          <Box sx={{ p: 2, width: "505px", height: "245px" }}>
            {/* Chart title */}
            <Typography
              sx={{
                fontFamily: "Sora, Helvetica",
                fontWeight: 400,
                color: "white",
                fontSize: "16px",
                mb: 2,
              }}
            >
              Money Flow
            </Typography>

            {/* Chart header with percentage and dropdown */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Box
                  component="img"
                  src="https://c.animaapp.com/ZlWxrohe/img/icon-14@2x.png"
                  alt="Icon"
                  sx={{ width: "10.84px", height: "6.61px" }}
                />
                <Typography
                  sx={{
                    fontFamily: "Manrope, Helvetica",
                    fontWeight: 700,
                    color: "#01b8e3",
                    fontSize: "10.2px",
                  }}
                >
                  +6,79%
                </Typography>
              </Stack>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  p: 1,
                  borderRadius: "8px",
                  border: "1px solid #4b6eac",
                }}
              >
                <Box
                  component="img"
                  src="https://c.animaapp.com/ZlWxrohe/img/frame-1.svg"
                  alt="Frame"
                  sx={{ width: "12px", height: "12px" }}
                />
                <Typography
                  sx={{
                    fontFamily: "Sora, Helvetica",
                    fontWeight: 400,
                    color: "#d3e1f5",
                    fontSize: "8px",
                  }}
                >
                  Week
                </Typography>
                <Box
                  component="img"
                  src="https://c.animaapp.com/ZlWxrohe/img/vector-4.svg"
                  alt="Vector"
                  sx={{ width: "5.9px", height: "3.8px" }}
                />
              </Box>
            </Stack>

            {/* Chart container */}
            <Box sx={{ position: "relative", width: "503px", height: "185px" }}>
              {/* Y-axis labels */}
              <Stack
                spacing={3.5}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "160px",
                }}
              >
                {yAxisLabels.map((label, index) => (
                  <Typography
                    key={index}
                    sx={{
                      fontFamily: "Manrope, Helvetica",
                      fontWeight: 600,
                      color: "#d2e0f5",
                      fontSize: "7.3px",
                    }}
                  >
                    {label}
                  </Typography>
                ))}
              </Stack>

              {/* Chart images and tooltip */}
              <Box
                sx={{
                  position: "absolute",
                  top: "8px",
                  left: "30px",
                  width: "473px",
                  height: "164px",
                }}
              >
                <Box
                  component="img"
                  src="https://c.animaapp.com/ZlWxrohe/img/line@2x.png"
                  alt="Line"
                  sx={{
                    position: "absolute",
                    width: "472px",
                    height: "114px",
                    top: 0,
                    left: 0,
                  }}
                />
                <Box
                  component="img"
                  src="https://c.animaapp.com/ZlWxrohe/img/chart@2x.png"
                  alt="Chart"
                  sx={{
                    position: "absolute",
                    width: "473px",
                    height: "156px",
                    top: "8px",
                    left: 0,
                  }}
                />

                {/* Tooltip */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "59px",
                    left: "111px",
                    width: "58px",
                    height: "41px",
                  }}
                >
                  <Box
                    sx={{
                      width: "56px",
                      height: "29px",
                      backgroundImage:
                        "url(https://c.animaapp.com/ZlWxrohe/img/union.svg)",
                      backgroundSize: "100% 100%",
                      position: "relative",
                    }}
                  >
                    <Typography
                      sx={{
                        position: "absolute",
                        top: "5px",
                        left: "10px",
                        fontFamily: "Manrope, Helvetica",
                        fontWeight: 700,
                        color: "white",
                        fontSize: "10px",
                      }}
                    >
                      $ 2.600
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      top: "32px",
                      left: "24px",
                      width: "10px",
                      height: "10px",
                      borderRadius: "5px",
                      border: "2px solid #393a52",
                      background:
                        "linear-gradient(90deg, rgba(62,121,229,1) 0%, rgba(1,184,227,1) 100%)",
                    }}
                  />
                </Box>
              </Box>

              {/* X-axis date labels */}
              <Stack
                direction="row"
                spacing={2.75}
                sx={{
                  position: "absolute",
                  top: "177px",
                  left: "31px",
                }}
              >
                {chartDates.map((date, index) => (
                  <Typography
                    key={index}
                    sx={{
                      fontFamily: "Manrope, Helvetica",
                      fontWeight: 700,
                      color: date.active ? "#3d7ae5" : "#d2e0f5",
                      fontSize: "7.3px",
                      minWidth: "21px",
                    }}
                  >
                    {date.label}
                  </Typography>
                ))}
              </Stack>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};
