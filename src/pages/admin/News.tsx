import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import NewsDialog from "../../components/NewsDialog";
import type { ArticlePaylod, News } from "../../types/interface/news.interface";
import { toast } from "sonner";
import API from "../../api/api.instance";
import { Endpoint } from "../../services/helper/endpoint";
import type { Category } from "../../types/interface/category.interface";
import { ArticleInputField } from "../../services/json/input-fileds/article.inputs";
import DynamicInput from "../../components/DynamicInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { articleSchema } from "../../services/validation/article.validation";
import { Controller, useForm } from "react-hook-form";

const News = () => {
  const [openAddNewsDialog, setOpenAddNewsDialog] = useState(false);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [newsList, setNewsList] = useState<News[]>([]);
  const [isCategoryLoading, setIsCategoryloading] = useState<boolean>(false);
  const [isCategoryError, setIsCategoryError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newpagination, setNewspagination] = useState({
    page: 1,
    limit: 5,
    totalPages: 0,
    totalResults: 0,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
   const [isAddLoading, setIsAddloading] = useState<boolean>(false);
  const [isAddError, setIsAddError] = useState<string | null>(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
    setValue,
  } = useForm<ArticlePaylod>({
    resolver: yupResolver(articleSchema),
  });

  const onSubmit = async(data: ArticlePaylod) => {
    setIsAddloading(true);
    const formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("content",data.content)
    formdata.append("category", data.category);
    if(data.image){
       formdata.append("image", data.image);
    }
  try {
    const response = await API.post(`${Endpoint.admin.news.global}`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    console.log("response add", response);
    if(response.status === 201){
      toast.success(response.data.message);
      setNewsList((prev)=>[response.data.data, ...prev]);
      reset();
      setImagePreview(null);
      setOpenAddNewsDialog(false)
    }
   } catch (error) {
        const errMessage: string = error?.response?.data?.message;
        toast.error(errMessage);
        setIsAddError(errMessage);
      } finally {
        setIsAddloading(false);
      }
  };

  //to get news limit
  useEffect(() => {
    const fetchNewsData = async () => {
      setIsloading(true);
      try {
        const response = await API.get(`${Endpoint.admin.news.adminNews}`, {
          params: {
            page: newpagination.page,
            limit: newpagination.limit,
          },
        });
        // console.log("response news", response);
        setNewsList(response?.data?.data);
        setNewspagination((prev) => ({
          ...prev,
          page: response.data.pagination.page,
          limit: response.data.pagination.limit,
          totalPages: response.data.pagination.totalPages,
          totalResults: response.data.pagination.totalResults,
        }));
      } catch (error) {
        const errMessage: string = error?.response?.data?.message;
        toast.error(errMessage);
        setIsError(errMessage);
      } finally {
        setIsloading(false);
      }
    };
    fetchNewsData();
  }, [newpagination.page, newpagination.limit]);

  //to get category list
  useEffect(() => {
    const fetchCategoryData = async () => {
      setIsCategoryloading(true);
      try {
        const response = await API.get(`${Endpoint.admin.category.global}`);
        // console.log("response categories", response);
        setCategories(response.data.data);
      } catch (error) {
        const errMessage: string = error?.response?.data?.message;
        toast.error(errMessage);
        setIsCategoryError(errMessage);
      } finally {
        setIsCategoryloading(false);
      }
    };
    fetchCategoryData();
  }, []);

  console.log("data new section", newsList, newpagination);
  return (
    <Container
      maxWidth="xl"
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
          News Pannel
        </Typography>
        <Button variant="contained" onClick={() => setOpenAddNewsDialog(true)}>
          Add
        </Button>
      </Box>
      <Dialog
        open={openAddNewsDialog}
        onClose={() => setOpenAddNewsDialog(false)}
        maxWidth="md"
      >
        <DialogTitle>Add Article</DialogTitle>
        <DialogContent>
          <Box
            onSubmit={handleSubmit(onSubmit)}
            component="form"
            sx={{
              width: "400px",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {ArticleInputField?.map((field: any) => (
              <div key={field.label}>
                <DynamicInput
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  register={register}
                  errors={errors}
                />
              </div>
            ))}

            <FormControl error={!!errors.category}>
              <FormLabel>Category</FormLabel>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onChange={field.onChange}>
                    {categories?.map((category) => (
                      <MenuItem value={category._id}>{category.name}</MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText>{errors?.category?.message}</FormHelperText>
            </FormControl>
            <Box
              sx={{
                border: "1px dotted black",
                height: "150px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyItems: "center",
              }}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="img"
                  style={{ width: "120px", height: "100px", objectFit: "cover" }}
                />
              ) : (
                <Typography sx={{ fontWeight: "bold" }}>
                  Upload Article Image
                </Typography>
              )}
              <Button
                variant="contained"
                onClick={() => document.getElementById("upload")?.click()}
              >
                {imagePreview ? "Change" : "upload"}{" "}
                <input
                  id="upload"
                  type="file"
                  hidden
                  onChange={(e) => {
                    const file = e?.target?.files?.[0] as File;
                    setImagePreview(URL.createObjectURL(file));
                    setValue("image", file);
                  }}
                />
              </Button>
            </Box>
            <DialogActions sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                onClick={() => setOpenAddNewsDialog(false)}
              >
                close
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ bgcolor: "green" }}
              >
                Add
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
      {/* <NewsDialog
        open={openAddNewsDialog}
        onClose={() => setOpenAddNewsDialog(false)}
      /> */}
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2, p: 2 }}>
          {isError ? (
            <Typography sx={{ fontSize: "10px", color: "red", mb: 2, mt: 2 }}>
              {isError}
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
                    <TableCell>Category</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  ) : (
                    newsList?.map((news) => (
                      <TableRow key={news._id}>
                        <TableCell>{news.title}</TableCell>
                        <TableCell>{news?.category?.name}</TableCell>
                        <TableCell sx={{ display: "flex", gap: 2 }}>
                          <Switch checked={news.isPublished} />
                          <Button
                            variant="outlined"
                            color="primary"
                            sx={{ mr: 1 }}
                          >
                            Edit
                          </Button>
                          <Button variant="outlined" color="error">
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Select
                value={newpagination?.limit}
                onChange={(e) =>
                  setNewspagination((prev) => ({
                    ...prev,
                    limit: e.target.value,
                  }))
                }
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
              </Select>
            </Box>
            <Typography>
              {newpagination?.page} of {newpagination?.totalPages} result:{" "}
              {newpagination?.totalResults}
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                disabled={newpagination.page === 1}
                onClick={() =>
                  setNewspagination((prev) => ({
                    ...prev,
                    page: newpagination.page - 1,
                  }))
                }
                variant="contained"
              >
                Prev
              </Button>
              <Button
                onClick={() =>
                  setNewspagination((prev) => ({
                    ...prev,
                    page: newpagination.page + 1,
                  }))
                }
                variant="contained"
              >
                Next
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
};

export default News;
