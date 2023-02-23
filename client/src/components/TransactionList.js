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
import dayjs from "dayjs";

export default function TransactionList({
  transactions,
  fetchTransactions,
  setEditTransaction,
}) {
  function formatDate(date) {
    return dayjs(date).format("DD MMM, YYYY");
  }
  async function deleteTransaction(id) {
    if (!window.confirm("Are you sure you want to delete this transaction?"))
      return;
    const res = await fetch(
      process.env.REACT_APP_API_URL +
        "/transactions/" +
        id,
      {
        method: "DELETE",
      }
    );
    if (res.ok) {
      window.alert("Transaction deleted successfully!");
      fetchTransactions();
    }
  }
  return (
    <Stack spacing={2}>
      <Typography variant="h6">All Transactions</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Transaction Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow
                key={transaction._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="transaction">
                  {transaction._id}
                </TableCell>
                <TableCell align="right">{transaction.amount}</TableCell>
                <TableCell align="right">{transaction.description}</TableCell>
                <TableCell align="right">
                  {formatDate(transaction.date)}
                </TableCell>
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
                        onClick={() => setEditTransaction(transaction)}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        aria-label="delete button"
                        component="label"
                        onClick={() => deleteTransaction(transaction._id)}
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
