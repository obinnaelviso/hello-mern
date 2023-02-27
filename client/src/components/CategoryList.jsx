import * as React from "react";
import {
  Stack,
  Paper,
  Typography,
  TableHead,
  TableCell,
  TableRow,
  TableContainer,
  Table,
  TableBody,
  IconButton,
  Divider,
  Tooltip,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import Cookie from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store/auth.js";

export default function CategoryList({ setEditCategory }) {
  const token = Cookie.get("token");
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  async function deleteCategory(id) {
    if (!window.confirm("Are you sure you want to delete this transaction?"))
      return;
    const res = await fetch(
      process.env.REACT_APP_API_URL + "/categories/" + id,
      {
        method: "DELETE",
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
    if (res.ok) {
      const _user = {
        ...user,
        categories: user.categories.filter((category) => category._id !== id),
      };
      dispatch(setUser({ user: _user }));
      window.alert("Category deleted successfully!");
      // fetchCategories();
    }
  }
  return (
    <Stack spacing={2}>
      <Typography variant="h6">All Categories</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Label</TableCell>
              <TableCell align="center">Icon</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.categories.map((category) => (
              <TableRow
                key={category._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{category.label}</TableCell>
                <TableCell align="center">{category.icon}</TableCell>
                <TableCell align="right">
                  <Stack
                    direction="row"
                    spacing={1}
                    divider={<Divider orientation="vertical" flexItem />}
                  >
                    <Tooltip title="Edit">
                      <IconButton
                        color="primary"
                        aria-label="edit button"
                        component="label"
                        onClick={() => setEditCategory(category)}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        aria-label="delete button"
                        component="label"
                        onClick={() => deleteCategory(category._id)}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
