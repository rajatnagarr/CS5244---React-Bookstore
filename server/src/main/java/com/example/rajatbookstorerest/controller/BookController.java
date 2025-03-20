package com.example.rajatbookstorerest.controller;

import business.ApplicationContext;
import business.book.Book;
import business.book.BookDao;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/books")
public class BookController {

    private final BookDao bookDao = ApplicationContext.INSTANCE.getBookDao();

    @GetMapping("/{bookId}")
    public Book getBookById(@PathVariable("bookId") long bookId) {
        Book book = bookDao.findByBookId(bookId);
        if (book == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found");
        }
        return book;
    }
}
