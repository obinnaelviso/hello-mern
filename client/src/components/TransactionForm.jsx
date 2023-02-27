import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Button, Autocomplete, Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Cookie from "js-cookie";

export default function TransactionForm({
  fetchTransactions,
  editTransaction,
  setEditTransaction,
}) {
  const token = Cookie.get("token");
  const { categories } = useSelector((state) => state.auth.user);
  const initialForm = {
    amount: 0,
    description: "",
    date: new Date(),
    category_id: "",
  };
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (editTransaction.amount !== undefined) setForm(editTransaction);
  }, [editTransaction]);

  function getCategoryById() {
    return (
      categories.find((category) => category._id === form.category_id) ?? ""
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = !editTransaction.amount
      ? await createTransaction()
      : await updateTransaction();
    if (res.ok) {
      await fetchTransactions();
      setForm(initialForm);
    }
  }

  async function createTransaction() {
    return await fetch(process.env.REACT_APP_API_URL + "/transactions", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        authorization: "Bearer " + token,
      },
    });
  }

  async function updateTransaction() {
    const res = await fetch(
      process.env.REACT_APP_API_URL + "/transactions/" + editTransaction._id,
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
    setEditTransaction({});
    return res;
  }

  function handleInput(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleDate(dateValue) {
    setForm({
      ...form,
      date: dateValue,
    });
  }
  return (
    <Card sx={{ minWidth: 275, marginTop: 10 }}>
      <CardContent>
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Typography variant="h6">Add Transaction</Typography>
            <Stack direction="row" spacing={2}>
              <TextField
                id="outlined-basic"
                value={form.amount}
                size="small"
                name="amount"
                label="Amount"
                variant="outlined"
                onChange={handleInput}
              />
              <TextField
                id="outlined-basic"
                value={form.description}
                size="small"
                name="description"
                label="Description"
                variant="outlined"
                onChange={handleInput}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Transaction Date"
                  inputFormat="MM/DD/YYYY"
                  value={form.date}
                  onChange={handleDate}
                  renderInput={(params) => (
                    <TextField size="small" {...params} />
                  )}
                />
              </LocalizationProvider>
              <Autocomplete
                value={getCategoryById()}
                isOptionEqualToValue={(option, value) =>
                  value === undefined ||
                  value === "" ||
                  option._id === value._id
                }
                onChange={(event, newValue) => {
                  setForm({
                    ...form,
                    category_id: newValue._id,
                  });
                }}
                id="controllable-states-demo"
                options={categories}
                sx={{ width: 200 }}
                renderInput={(params) => (
                  <TextField {...params} size="small" label="Category" />
                )}
              />
              {editTransaction.amount === undefined ? (
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
