package com.example.rajatbookstorerest.controller;

import business.ApplicationContext;
import business.book.Book;
import business.book.BookDao;
import business.category.Category;
import business.category.CategoryDao;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryDao categoryDao = ApplicationContext.INSTANCE.getCategoryDao();
    private final BookDao bookDao = ApplicationContext.INSTANCE.getBookDao();

    @GetMapping
    public List<Category> getAllCategories() {
        System.out.println("CategoryController.getAllCategories() called");
        return categoryDao.findAll();
    }

    @GetMapping("/{categoryId}")
    public Category getCategoryById(@PathVariable("categoryId") long categoryId) {
        Category category = categoryDao.findByCategoryId(categoryId);
        if (category == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found");
        }
        return category;
    }

    @GetMapping("/{categoryId}/books")
    public List<Book> getBooksByCategoryId(@PathVariable("categoryId") long categoryId) {
        Category category = categoryDao.findByCategoryId(categoryId);
        if (category == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found");
        }
        return bookDao.findByCategoryId(categoryId);
    }

    @GetMapping("/name/{categoryName}")
    public Category getCategoryByName(@PathVariable("categoryName") String categoryName) {
        Category category = categoryDao.findByName(categoryName);
        if (category == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found");
        }
        return category;
    }

    @GetMapping("/name/{categoryName}/books")
    public List<Book> getBooksByCategoryName(@PathVariable("categoryName") String categoryName) {
        Category category = categoryDao.findByName(categoryName);
        if (category == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found");
        }
        return bookDao.findByCategoryId(category.categoryId());
    }

    @GetMapping("/{categoryId}/suggested-books")
    public List<Book> getSuggestedBooks(@PathVariable("categoryId") long categoryId, 
                                        @RequestParam(value = "limit", defaultValue = "3") int limit) {
        return bookDao.findRandomByCategoryId(categoryId, limit);
    }

    @GetMapping("/name/{categoryName}/suggested-books")
    public List<Book> getSuggestedBooksByCategoryName(@PathVariable("categoryName") String categoryName,
                                                     @RequestParam(value = "limit", defaultValue = "3") int limit) {
        Category category = categoryDao.findByName(categoryName);
        if (category == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found");
        }
        return bookDao.findRandomByCategoryId(category.categoryId(), limit);
    }
}
