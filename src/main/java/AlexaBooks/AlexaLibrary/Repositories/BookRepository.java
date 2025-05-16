package AlexaBooks.AlexaLibrary.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import AlexaBooks.AlexaLibrary.Book;


public interface BookRepository extends JpaRepository<Book, Long> {

}
