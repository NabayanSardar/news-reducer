import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const AdminWrapper = () => {
  return (
    <Stack sx={{display: "flex", flexDirection: "column", overflow: "hidden"}}>
      <Navbar />
      <Box sx={{display: "flex", flexDirection: "row"}}>
        <Sidebar />
        <Box sx={{p:4, width: "100%", overflow: "auto"}}>
          <Outlet />
        </Box>
      </Box>
    </Stack>
  );
};

export default AdminWrapper;
