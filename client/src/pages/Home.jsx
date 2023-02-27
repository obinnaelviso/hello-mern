import TransactionForm from "../components/TransactionForm.jsx";
import TransactionList from "../components/TransactionList.jsx";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";

function Home() {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});

  async function fetchTransactions() {
    const token = Cookie.get("token");
    const res = await fetch(process.env.REACT_APP_API_URL + "/transactions", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const { data } = await res.json();
    setTransactions(data);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);
  return (
    <>
      <TransactionForm
        fetchTransactions={fetchTransactions}
        editTransaction={editTransaction}
        setEditTransaction={setEditTransaction}
      />
      <br />
      <TransactionList
        transactions={transactions}
        fetchTransactions={fetchTransactions}
        setEditTransaction={setEditTransaction}
      />
    </>
  );
}

export default Home;
