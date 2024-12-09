import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main CSS file
import "react-date-range/dist/theme/default.css"; // Default theme CSS file
import { Box, Button, Typography } from "@mui/material"; // MUI Components

const DateRangePickerComponent = () => {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Helper functions to calculate date ranges
  const getTodayRange = () => {
    const today = new Date();
    return { startDate: today, endDate: today };
  };

  const getThisWeekRange = () => {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    return { startDate: startOfWeek, endDate: endOfWeek };
  };

  const getNextWeekRange = () => {
    const today = new Date();
    const startOfNextWeek = new Date(today.setDate(today.getDate() + (7 - today.getDay())));
    const endOfNextWeek = new Date(startOfNextWeek);
    endOfNextWeek.setDate(endOfNextWeek.getDate() + 6);
    return { startDate: startOfNextWeek, endDate: endOfNextWeek };
  };

  const getThisMonthRange = () => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return { startDate: startOfMonth, endDate: endOfMonth };
  };

  const handleSidebarClick = (option) => {
    let newRange;
    switch (option) {
      case "Today":
        newRange = getTodayRange();
        break;
      case "This Week":
        newRange = getThisWeekRange();
        break;
      case "Next Week":
        newRange = getNextWeekRange();
        break;
      case "This Month":
        newRange = getThisMonthRange();
        break;
      default:
        newRange = { startDate: new Date(), endDate: new Date() };
    }
    setRange([{ ...newRange, key: "selection" }]);
  };

  // Custom month navigation handler
  const handlePrevClick = () => {
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1
    );
    setCurrentMonth(newDate);
  };

  const handleNextClick = () => {
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1
    );
    setCurrentMonth(newDate);
  };

  // const [currentMonth, setCurrentMonth] = useState(new Date()); // Tracks the displayed month

  // Function to navigate months
  const handleMonthNavigation = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(
      currentMonth.getMonth() + (direction === "forward" ? 1 : -1)
    );
    setCurrentMonth(newMonth);
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      border="1px solid #ccc"
      borderRadius="8px"
      bgcolor="#fff"
      boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
      width="fit-content"
    >
      {/* Sidebar */}
      <Box
        padding="16px"
        borderRight="1px solid #ccc"
        display="flex"
        alignItems="flex-start"
        flexDirection="column"
        gap="8px"
      >
        {["Today", "This Week", "Next Week", "This Month", "Custom"].map(
          (label) => (
            <Button
              key={label}
              variant="text"
              onClick={() => handleSidebarClick(label)} // Handle click event
              sx={{
                fontSize: "12px",
                fontWeight: "500",
                color: "#333",
                padding: "8px 16px",
                "&:hover": { backgroundColor: "#2ef2ff" },
              }}
            >
              {label}
            </Button>
          )
        )}
      </Box>

      {/* Calendar Container */}
      <Box
        display="flex"
        flexDirection="column"
        padding="16px"
        // sx={{
        //   // Hide the `rdrDateDisplayWrapper` using CSS-in-JS
        //   "& .rdrDateDisplayWrapper": {
        //     display: "none",
        //   },
        //   "& .rdrDefinedRangesWrapper": {
        //     display: "none",
        //   },
        //   "& .rdrMonthAndYearWrapper": {
        //     // display: "none",
            
        //   },

          
        //   "& .rdrMonthName": {
        //     display: "none",
            
        //   },
        //   "& .rdrDayNumber": {
        //     fontSize: "16px",
        //   },
        //   "& .rdrDay": {
        //     padding: "7px 0px",
        //   },
        //   "& .rdrWeekDay": {
        //     fontSize: "16px",
        //   },
        // }}

        sx={{
          "& .rdrDateDisplayWrapper": {
      display: "none",
    },
    "& .rdrDefinedRangesWrapper": {
      display: "none",
    },
    "& .rdrMonthAndYearWrapper": {
      display: "flex", // Make it visible
      alignItems: "center",
      justifyContent: "space-between",
      cursor: "pointer",
      padding: "0 16px",
    },
    "& .rdrMonthName": {
      display: "inline-block", // Display side by side
      fontSize: "16px",
      fontWeight: "bold",
      color: "#333",
      margin: "0 16px",
    },
    "& .rdrDayNumber": {
      fontSize: "16px",
    },
    "& .rdrDay": {
      padding: "7px 0px",
    },
    "& .rdrWeekDay": {
      fontSize: "16px",
    },
    "& .customMonthNavigator": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "8px",
    },
    "& .customMonthButton": {
      background: "none",
      border: "none",
      fontSize: "16px",
      cursor: "pointer",
      color: "#2563eb",
      "&:hover": {
        color: "#004aad",
      },
    },
        }}





      >
        {/* Custom Header */}
        <Box
          display="flex"
          justifyContent="space-evenly"
          alignItems="center"
          marginBottom="16px"
        >
          <Button
            // onClick={handlePrevClick}
            onClick={() => handleMonthNavigation("backward")}
            sx={{
              background: "none",
              border: "none",
              fontSize: "16px",
              cursor: "pointer",
              color: "#2563eb",
              "&:hover": { color: "#004aad" },
            }}
          >
            ❮
          </Button>
          <Typography
          className="rdrMonthName"
            sx={{
              fontSize: "16px",
              fontWeight: "bold",
              margin: "0 16px",
              color: "#333",
            }}
          >
          <div className="rdrMonthName"></div>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              margin: "0 16px",
              color: "#333",
            }}
          >
            {new Date(
              currentMonth.getFullYear(),
              currentMonth.getMonth() + 1
            ).toLocaleString("default", { month: "long" })}{" "}
            {new Date(
              currentMonth.getFullYear(),
              currentMonth.getMonth() + 1
            ).getFullYear()}
          </Typography>
          <Button
            // onClick={handleNextClick}

            className="rdrNextPrevButton rdrNextButton"
            onClick={() => handleMonthNavigation("forward")}
            sx={{
              background: "none",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
              color: "#2563eb",
              "&:hover": { color: "#004aad" },
            }}
          >
            ❯
          </Button>
        </Box>

        {/* Date Range Picker */}
        <DateRangePicker
          ranges={range}
          onChange={(item) => setRange([item.selection])}
          months={2}
          direction="horizontal"
          showMonthAndYearPickers={false}
          rangeColors={["#2563eb"]}
          shownDate={currentMonth}
          onShownDateChange={(date) => {
            console.log("xoxox",date);
            
            setCurrentMonth(date)}} // Updates the month when user manually navigates
           
     
        />
      </Box>
    </Box>
  );
};

export default DateRangePickerComponent;
