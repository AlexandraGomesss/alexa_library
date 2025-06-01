package AlexaBooks.AlexaLibrary.Services;

import AlexaBooks.AlexaLibrary.Repositories.BookRepository;
import org.springframework.stereotype.Service;
import AlexaBooks.AlexaLibrary.Entities.Book;
import java.util.List;

@Service
public class BookService {
    private final BookRepository bookRepo;

    public BookService(BookRepository bookRepo) {
        this.bookRepo = bookRepo;
    }

    public List<Book> getAllBooks() {
        return bookRepo.findAll();
    }

    public Book getBookById(Long id) {
        return bookRepo.findById(id).orElseThrow(() ->new RuntimeException("Book not found"));
    }

    public Book createBook(Book book) {
        return bookRepo.save(book);
    }
    public void deleteBook(Long id) {
        bookRepo.deleteById(id);
    }
    public Book updateBook(Long id, Book updatedBook) {
        Book book = getBookById(id);
        book.setTitle(updatedBook.getTitle());
        book.setAuthor(updatedBook.getAuthor());
        book.setIsbn(updatedBook.getIsbn());
        book.setGenre(updatedBook.getGenre());
        book.setPublicationYear(updatedBook.getPublicationYear());
        book.setQuantityAvailable(updatedBook.getQuantityAvailable());
        book.setPrice(updatedBook.getPrice());
        return bookRepo.save(book);
    }

    public List<Book> getAvailableBooks() {
        return bookRepo.findByQuantityAvailableGreaterThan(0)
                .stream()
                .filter(book -> book.getQuantityAvailable() > 0)
                .toList();

    }
}

