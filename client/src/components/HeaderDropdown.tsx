import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../assets/css/HeaderDropdown.css";
import "../assets/css/global.css";
import { useCategory } from "../contexts/CategoryContext"; // Use the updated import

const HeaderDropdown = () => {
  const { categories } = useCategory(); // Destructure to get categories from the context
  const navigate = useNavigate(); // Instantiate the navigate function

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/categories/${categoryName}`); // Navigate programmatically
  };

  return (
    <div className="header-dropdown">
      <button className="categories-button-style">
        <i className="fa fa-bars hamburger-icon"></i>
        <i className="fa fa-times cross-icon"></i>
      </button>
      <ul className="categories-element">
        {categories.map((item) => (
          <li
            key={item.categoryId}
            className="category-link-second" // Move the styling to li
            onClick={() => handleCategoryClick(item.name)} // Add onClick event to li
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeaderDropdown;
