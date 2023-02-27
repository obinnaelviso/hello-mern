import CategoryForm from "../components/CategoryForm.jsx";
import CategoryList from "../components/CategoryList.jsx";
import { useState } from "react";

function Home() {
  const [editCategory, setEditCategory] = useState({});

  return (
    <>
      <CategoryForm
        editCategory={editCategory}
        setEditCategory={setEditCategory}
      />
      <br />
      <CategoryList
        setEditCategory={setEditCategory}
      />
    </>
  );
}

export default Home;
