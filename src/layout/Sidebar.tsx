import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const sidebarItems = [
  { name: "Dashboard", path: "/admin/dashbaord" },
  { name: "News", path: "/admin/news" },
  { name: "Category", path: "/admin/category" },
  { name: "Users", path: "/admin/users" },
];
const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "20%",
        height: "90vh",
        backgroundColor: "yellow",
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      {sidebarItems?.map((item) => (
        <Typography
        key={item.name}
          sx={{ cursor: "pointer", fontSize: "20px", fontWeight: "bold" }}
          onClick={() => navigate(`${item.path}`)}
        >
          {item.name}
        </Typography>
      ))}
    </Box>
  );
};

export default Sidebar;
