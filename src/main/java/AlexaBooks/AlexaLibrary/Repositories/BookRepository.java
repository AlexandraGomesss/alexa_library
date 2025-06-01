package AlexaBooks.AlexaLibrary.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import AlexaBooks.AlexaLibrary.Entities.Book;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findByQuantityAvailableGreaterThan(int quantity);
}
