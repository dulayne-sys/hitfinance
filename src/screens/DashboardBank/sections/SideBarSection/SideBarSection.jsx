import AddIcon from "@mui/icons-material/Add";
import ReceiveIcon from "@mui/icons-material/CallReceived";
import MoreIcon from "@mui/icons-material/MoreHoriz";
import InvoicingIcon from "@mui/icons-material/Receipt";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const actionButtons = [
  { icon: SendIcon, label: "Send" },
  { icon: ReceiveIcon, label: "Receive" },
  { icon: InvoicingIcon, label: "Invoicing" },
  { icon: MoreIcon, label: "More" },
];

const contacts = [
  { id: 1, avatar: "https://c.animaapp.com/ZlWxrohe/img/images@2x.png" },
  { id: 2, avatar: "https://c.animaapp.com/ZlWxrohe/img/images@2x.png" },
  { id: 3, avatar: "https://c.animaapp.com/ZlWxrohe/img/images@2x.png" },
  { id: 4, avatar: "https://c.animaapp.com/ZlWxrohe/img/images@2x.png" },
  { id: 5, avatar: "https://c.animaapp.com/ZlWxrohe/img/images@2x.png" },
];

export const SideBarSection = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("$1,24");
  const [searchValue, setSearchValue] = useState("");

  return (
    <Box
      sx={{
        width: "317px",
        height: "774px",
        backgroundColor: "rgba(61, 122, 229, 0.1)",
        position: "relative",
        p: 4,
      }}
    >
      <Stack spacing={4} sx={{ height: "100%" }}>
        {/* Search and Menu */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Autocomplete
            options={[]}
            value={searchValue}
            onInputChange={(event, newValue) => setSearchValue(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search"
                size="small"
                sx={{
                  width: "187px",
                  height: "26px",
                  "& .MuiOutlinedInput-root": {
                    height: "26px",
                    fontSize: "10px",
                    fontWeight: 600,
                    color: "#d3e1f5",
                    paddingLeft: "27px",
                  },
                }}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <SearchIcon
                      sx={{
                        width: "12px",
                        height: "12px",
                        position: "absolute",
                        left: "7px",
                        color: "#d3e1f5",
                      }}
                    />
                  ),
                }}
              />
            )}
          />
          <Box
            component="img"
            src="https://c.animaapp.com/ZlWxrohe/img/menu@2x.png"
            alt="Menu"
            sx={{ width: "60px", height: "24px" }}
          />
        </Stack>

        {/* Wallet Section */}
        <Stack spacing={2}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Manrope",
              fontWeight: 800,
              fontSize: "16px",
              color: "white",
            }}
          >
            Wallet
          </Typography>
          <Card
            sx={{
              width: "252px",
              height: "133px",
              borderRadius: "9.77px",
              background:
                "url(https://c.animaapp.com/ZlWxrohe/img/bg-1@2x.png)",
              backgroundSize: "100% 100%",
              boxShadow:
                "inset 0px 0.98px 0.98px rgba(255, 255, 255, 0.15), inset -0.49px -0.49px 0.98px rgba(0, 0, 0, 0.04), 0px 4px 3px rgba(250, 251, 252, 0.1)",
              position: "relative",
              overflow: "visible",
            }}
          >
            <Box
              component="img"
              src="https://c.animaapp.com/ZlWxrohe/img/raio-lit@4x.png"
              alt="Raio LIT"
              sx={{
                width: "22px",
                height: "22px",
                position: "absolute",
                top: "15px",
                left: "14px",
              }}
            />
            <Box
              component="img"
              src="https://c.animaapp.com/ZlWxrohe/img/paypass---solid.svg"
              alt="Paypass solid"
              sx={{
                width: "16px",
                height: "16px",
                position: "absolute",
                top: "19px",
                right: "22px",
              }}
            />
            <Box
              component="img"
              src="https://c.animaapp.com/ZlWxrohe/img/payment---mastercard---color.svg"
              alt="Payment mastercard"
              sx={{
                width: "31px",
                height: "20px",
                position: "absolute",
                bottom: "37px",
                right: "22px",
              }}
            />
            <Box sx={{ position: "absolute", bottom: "25px", left: "14px" }}>
              <Box
                component="img"
                src="https://c.animaapp.com/ZlWxrohe/img/2320-3000-0000-1.svg"
                alt="Card number"
                sx={{ width: "165px", height: "10px", mb: "17px" }}
              />
              <Stack direction="row" spacing={3}>
                <Typography
                  sx={{
                    fontFamily: "Montserrat",
                    fontWeight: 600,
                    fontSize: "5.9px",
                    color: "#d2e0f5",
                    textShadow: "0px 0.49px 0.24px rgba(255, 255, 255, 0.21)",
                  }}
                >
                  RAI H OLIVEIRA
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Montserrat",
                    fontWeight: 600,
                    fontSize: "5.9px",
                    color: "#d2e0f5",
                    textShadow: "0px 0.49px 0.24px rgba(255, 255, 255, 0.21)",
                  }}
                >
                  05 / 24
                </Typography>
              </Stack>
            </Box>
          </Card>
        </Stack>

        {/* Quick Transfer Section */}
        <Stack spacing={2}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Manrope",
              fontWeight: 800,
              fontSize: "16px",
              color: "white",
            }}
          >
            Quick transfer
          </Typography>
          <Card
            sx={{
              width: "253px",
              height: "211px",
              backgroundColor: "rgba(210, 224, 245, 0.15)",
              borderRadius: "10px",
              p: 2,
            }}
          >
            <Stack spacing={2}>
              {/* Account Number Input */}
              <Stack direction="row" spacing={1} alignItems="center">
                <TextField
                  placeholder="Account number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  size="small"
                  sx={{
                    width: "187px",
                    height: "26px",
                    "& .MuiOutlinedInput-root": {
                      height: "26px",
                      fontSize: "10px",
                      fontWeight: 600,
                      color: "#d3e1f5",
                      backgroundColor: "rgba(255, 255, 255, 0.22)",
                      border: "1px solid #4b6eac",
                    },
                  }}
                />
                <Box
                  component="img"
                  src="https://c.animaapp.com/ZlWxrohe/img/button@2x.png"
                  alt="Button"
                  sx={{ width: "26px", height: "26px" }}
                />
              </Stack>

              {/* Debit Selection */}
              <FormControl
                size="small"
                sx={{
                  width: "221px",
                  height: "26px",
                  "& .MuiOutlinedInput-root": {
                    height: "26px",
                    borderRadius: "6.8px",
                    border: "0.57px solid #d2e0f5",
                    backgroundColor: "transparent",
                  },
                }}
              >
                <Select
                  value="debit"
                  displayEmpty
                  sx={{
                    fontSize: "10.1px",
                    fontWeight: 600,
                    color: "white",
                    "& .MuiSelect-select": {
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      py: "5px",
                      px: "7px",
                    },
                  }}
                >
                  <MenuItem value="debit">
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      sx={{ width: "100%" }}
                    >
                      <Box
                        component="img"
                        src="https://c.animaapp.com/ZlWxrohe/img/xmlid-328@2x.png"
                        alt="Debit icon"
                        sx={{ width: "14.74px", height: "9.11px" }}
                      />
                      <Typography
                        sx={{
                          fontSize: "10.1px",
                          fontWeight: 600,
                          color: "white",
                          flexGrow: 1,
                        }}
                      >
                        Debit
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "10.1px",
                          fontWeight: 700,
                          color: "white",
                        }}
                      >
                        $10,432
                      </Typography>
                    </Stack>
                  </MenuItem>
                </Select>
              </FormControl>

              {/* Amount Input */}
              <Card
                sx={{
                  width: "220px",
                  height: "51px",
                  backgroundColor: "rgba(250, 251, 252, 0.23)",
                  border: "0.5px solid #d2e0f5",
                  borderRadius: "8px",
                  p: 1,
                }}
              >
                <Stack spacing={0.5}>
                  <Typography
                    sx={{
                      fontFamily: "Manrope",
                      fontWeight: 600,
                      fontSize: "10px",
                      color: "#a4b4cb",
                    }}
                  >
                    Enter amount
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Manrope",
                      fontWeight: 700,
                      fontSize: "14px",
                      color: "white",
                    }}
                  >
                    {amount}
                  </Typography>
                </Stack>
              </Card>

              {/* Action Buttons */}
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  sx={{
                    width: "107px",
                    height: "32px",
                    borderRadius: "8px",
                    background:
                      "linear-gradient(90deg, rgba(62,121,229,1) 0%, rgba(1,184,227,1) 100%)",
                    fontSize: "8px",
                    fontFamily: "Sora",
                    fontWeight: 400,
                    color: "#fafbfc",
                    textTransform: "none",
                  }}
                >
                  Send money
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    width: "107px",
                    height: "32px",
                    borderRadius: "8px",
                    background:
                      "linear-gradient(0deg, rgba(250,251,252,1) 0%, rgba(250,251,252,1) 100%), linear-gradient(90deg, rgba(240,240,240,0.2) 0%, rgba(240,240,240,0) 100%)",
                    fontSize: "8px",
                    fontFamily: "Sora",
                    fontWeight: 400,
                    color: "#3d7ae5",
                    textTransform: "none",
                    border: "none",
                  }}
                >
                  Save as draft
                </Button>
              </Stack>
            </Stack>
          </Card>
        </Stack>

        {/* Action Buttons */}
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          sx={{ width: "252px" }}
        >
          {actionButtons.map((button, index) => (
            <Stack key={index} alignItems="center" spacing={1}>
              <IconButton
                sx={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "7.31px",
                  background:
                    "linear-gradient(90deg, rgba(62,121,229,1) 0%, rgba(1,184,227,1) 100%)",
                  "&:hover": {
                    background:
                      "linear-gradient(90deg, rgba(62,121,229,0.8) 0%, rgba(1,184,227,0.8) 100%)",
                  },
                }}
              >
                <button.icon
                  sx={{ width: "18px", height: "18px", color: "white" }}
                />
              </IconButton>
              <Typography
                sx={{
                  fontFamily: "Manrope",
                  fontWeight: 700,
                  fontSize: "9.5px",
                  color: "#798ba3",
                }}
              >
                {button.label}
              </Typography>
            </Stack>
          ))}
        </Stack>

        {/* Contacts Section */}
        <Stack spacing={2} sx={{ mt: "auto" }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Manrope",
              fontWeight: 800,
              fontSize: "16px",
              color: "white",
            }}
          >
            Contacts
          </Typography>
          <Card
            sx={{
              width: "253px",
              height: "61px",
              background: "url(https://c.animaapp.com/ZlWxrohe/img/bg@2x.png)",
              backgroundSize: "100% 100%",
              position: "relative",
              display: "flex",
              alignItems: "center",
              px: 1,
            }}
          >
            <AddIcon
              sx={{ width: "28px", height: "28px", color: "white", mr: 1 }}
            />
            <Box
              component="img"
              src="https://c.animaapp.com/ZlWxrohe/img/images@2x.png"
              alt="Contact avatars"
              sx={{ width: "165px", height: "42px" }}
            />
            <Typography
              sx={{
                position: "absolute",
                right: "12px",
                fontFamily: "Manrope",
                fontWeight: 500,
                fontSize: "12px",
                color: "white",
              }}
            >
              +35
            </Typography>
          </Card>
        </Stack>
      </Stack>
    </Box>
  );
};
