import React, { useEffect, useContext } from 'react';
import '../assets/css/CategoryNav.css';
import '../assets/css/global.css';
import { Link, useNavigate } from "react-router-dom";
import { useCategory } from "../contexts/CategoryContext"; // Import useCategory hook

interface CategoryNavProps {
    selectedCategoryName: string;
}

function CategoryNav({ selectedCategoryName }: CategoryNavProps) {
    const { categories, currentCategory, setCurrentCategory } = useCategory(); // Destructure needed context values
    const navigate = useNavigate();

    useEffect(() => {
        if (categories.length > 0 && categories.some(cat => cat.name === selectedCategoryName)) {
            setCurrentCategory(selectedCategoryName); // Update the context's current category
        }
    }, [categories, selectedCategoryName, setCurrentCategory]);

    const handleCategoryClick = (categoryName: string) => {
        setCurrentCategory(categoryName); // Update the context's current category
        navigate(`/categories/${categoryName}`);
    };

    return (
        <nav className="category-nav">
            <ul className="category-buttons">
                {categories.map((item) => (
                    <li
                        key={item.categoryId}
                        className={`button category-link ${currentCategory === item.name ? 'selected-category-button' : 'unselected-category-button'}`}
                        onClick={() => handleCategoryClick(item.name)}
                    >
                        {item.name}
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default CategoryNav;
