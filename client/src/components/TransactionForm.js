import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Stack } from "@mui/material";
import { useState, useEffect } from "react";

export default function TransactionForm({
  fetchTransactions,
  editTransaction,
  setEditTransaction,
}) {
  const initialForm = {
    amount: 0,
    description: "",
    date: new Date(),
  };
  useEffect(() => {
    if (editTransaction.amount !== undefined) setForm(editTransaction);
  }, [editTransaction]);

  const [form, setForm] = useState(initialForm);

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
        <form onSubmit={handleSubmit}>
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
        </form>
      </CardContent>
    </Card>
  );
}
