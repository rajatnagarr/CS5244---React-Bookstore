import "../types";
import "../assets/css/CategoryBookList.css";
import CategoryBookListItem from "./CategoryBookListItem";
import CategoryNav from "./CategoryNav";
import "../types";
// import {bookList,BookItem} from "../types";
import { BookItem } from "../types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface CategoryBookListProps {
  catList: any[];
}

const CategoryBookList = () => {
  const [bookList, setBookList] = useState<BookItem[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const baseUrl =
      "http://webdev.cs.vt.edu:8080/RajatBookstoreReactTransact/api/categories/name";
    axios
      .get(`${baseUrl}/${id}/books`)
      .then((result) => {
        setBookList(result.data); // Update the state with the fetched books
      })
      .catch(console.error);
  }, [id]);

  return (
    <>
      <CategoryNav selectedCategoryName={id || ""} /> {/* Update this line */}
      <ul className="book-lists">
        {bookList.map((book: BookItem) => (
          <CategoryBookListItem
            key={book.bookId}
            bookId={book.bookId}
            isPublic={book.isPublic}
            price={book.price}
            title={book.title}
            author={book.author}
            categoryId={book.categoryId}
          />
        ))}
      </ul>
    </>
  );
};

export default CategoryBookList;
