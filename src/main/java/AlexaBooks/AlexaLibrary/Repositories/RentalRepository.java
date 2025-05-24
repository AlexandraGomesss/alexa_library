package AlexaBooks.AlexaLibrary.Repositories;

import AlexaBooks.AlexaLibrary.Entities.Rental;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RentalRepository extends JpaRepository <Rental, Long> {

    List<Rental> findByClientIdAndBookId(Long clientId, Long bookId);

}


