// src/contexts/CategoryContext.tsx
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { CategoryItem } from "../types"; // Adjust the import path as needed
import { buildApiUrl } from "../utils";

const CategoryContext = createContext({
  categories: [] as CategoryItem[],
  currentCategory: "",
  setCurrentCategory: (categoryName: string) => {},
});

export const useCategory = () => useContext(CategoryContext);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [currentCategory, setCurrentCategory] = useState("Fiction");

  useEffect(() => {
    axios
      .get(
        buildApiUrl('categories'),
      )
      .then((result) => {
        setCategories(result.data);
      })
      .catch(console.error);
  }, []);

  return (
    <CategoryContext.Provider
      value={{ categories, currentCategory, setCurrentCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
