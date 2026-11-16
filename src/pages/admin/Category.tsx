import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useContext, useEffect } from "react";
import CategoryDialog from "../../components/CategoryDialog";
import type { Category } from "../../types/interface/category.interface";
import CategoryContext from "../../context/category/CreateCategoryContext";
import { toast } from "sonner";

const Category = () => {
  const categoryContext = useContext(CategoryContext);
  if (!categoryContext) {
    throw new Error("Ctageory Context is not provided!!");
  }

  useEffect(() => {
    categoryContext.fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    const response = await categoryContext.deleCategory(id);
    console.log("delete in category page", response);
    if(response.data){
      toast.success(response.data.message);
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
          Category Panel
        </Typography>

        <Button
          variant="contained"
          onClick={() => categoryContext.handleDailogOpen()}
        >
          Add
        </Button>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          {categoryContext?.categoryState?.isError ? (
            <Typography sx={{ fontSize: "10px", color: "red", mb: 2, mt: 2 }}>
              {categoryContext?.categoryState?.isError}
            </Typography>
          ) : (
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={"medium"}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categoryContext?.categoryState?.isLoading ? (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  ) : (
                    categoryContext?.categoryState?.categories?.map(
                      (category) => (
                        <TableRow key={category._id}>
                          <TableCell>{category.name}</TableCell>
                          <TableCell>{category.description}</TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              color="primary"
                              sx={{ mr: 1 }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => handleDelete(category._id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ),
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Box>
      <CategoryDialog />
    </Container>
  );
};

export default Category;
