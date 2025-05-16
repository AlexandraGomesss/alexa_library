package AlexaBooks.AlexaLibrary.Controllers;

import AlexaBooks.AlexaLibrary.Book;
import AlexaBooks.AlexaLibrary.Services.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {
    private final BookService bookservice;
    private final BookService bookService;

    public BookController(BookService bookservice, BookService bookService) {
        this.bookservice = bookservice;
        this.bookService = bookService;
    }

    @GetMapping("/")
    public List<Book> getBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("/{id}")
    public Book getBook(@PathVariable Long id) {
        return bookService.getBookById(id);
    }
    @PostMapping
    public ResponseEntity<Book> createBook(@RequestBody Book book) {
        Book created = bookService.createBook(book);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }
}
