import {
  Button,
  Box,
  Stack,
  Typography,
  TextField,
  Card,
  Autocomplete,
  CardContent,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store/auth.js";
import Cookie from "js-cookie";

export default function CategoryForm({ editCategory, setEditCategory }) {
  const token = Cookie.get("token");
  const initialForm = {
    label: "",
    icon: "",
  };
  const icons = [{ label: "user" }];
  const [form, setForm] = useState(initialForm);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (editCategory._id !== undefined) setForm(editCategory);
  }, [editCategory]);

  async function handleSubmit(e) {
    e.preventDefault();
    const res = !editCategory._id
      ? await createCategory()
      : await updateCategory();
    if (res.ok) {
      if (!editCategory._id) {
        setForm(initialForm);
        const _user = {
          ...user,
          categories: [...user.categories, { ...form }],
        };
        dispatch(setUser({ user: _user }));
      } else {
        const _user = {
          ...user,
          categories: user.categories.map((category) =>
            editCategory._id === category._id ? form : category
          ),
        };
        dispatch(setUser({ user: _user }));
      }
    }
  }

  async function createCategory() {
    return await fetch(process.env.REACT_APP_API_URL + "/categories", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        authorization: "Bearer " + token,
      },
    });
  }

  async function updateCategory() {
    const res = await fetch(
      process.env.REACT_APP_API_URL + "/transactions/" + editCategory._id,
      {
        method: "PATCH",
        body: JSON.stringify(form),
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          authorization: "Bearer " + token,
        },
      }
    );
    setEditCategory({});
    return res;
  }

  function handleInput(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }
  return (
    <Card sx={{ minWidth: 275, marginTop: 10 }}>
      <CardContent>
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Typography variant="h6">Add Category</Typography>
            <Stack direction="row" spacing={2}>
              <TextField
                id="outlined-basic"
                value={form.label}
                size="small"
                name="label"
                label="Label"
                variant="outlined"
                onChange={handleInput}
              />
              <Autocomplete
                value={form.icon}
                isOptionEqualToValue={(option, value) =>
                  value === undefined ||
                  value === "" ||
                  option.icon === value.icon
                }
                onChange={(event, newValue) => {
                  setForm({
                    ...form,
                    icon: newValue.label,
                  });
                }}
                id="controllable-states-demo"
                options={icons}
                sx={{ width: 200 }}
                renderInput={(params) => (
                  <TextField {...params} size="small" label="Icon" />
                )}
              />
              {editCategory._id === undefined ? (
                <Button type="submit" variant="contained">
                  Add
                </Button>
              ) : (
                <Button type="submit" variant="contained" color="warning">
                  Update
                </Button>
              )}
            </Stack>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
