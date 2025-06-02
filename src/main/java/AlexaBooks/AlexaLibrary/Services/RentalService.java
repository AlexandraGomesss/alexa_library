package AlexaBooks.AlexaLibrary.Services;


import AlexaBooks.AlexaLibrary.Repositories.BookRepository;
import AlexaBooks.AlexaLibrary.Repositories.ClientRepository;
import AlexaBooks.AlexaLibrary.Repositories.RentalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import AlexaBooks.AlexaLibrary.Entities.Book;
import AlexaBooks.AlexaLibrary.Entities.Rental;
import AlexaBooks.AlexaLibrary.Entities.Client;
import java.time.LocalDate;
import java.util.List;

@Service
public class RentalService {

    @Autowired
    private RentalRepository rentalRepo;

    @Autowired
    private ClientRepository clientRepo;

    @Autowired
    private BookRepository bookRepo;

    @Transactional
    public Rental createRental(Long clientId, Long bookId, int rentalDays) {
        Client client = clientRepo.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Client not found"));

        Book book = bookRepo.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        if (book.getQuantityAvailable() <= 0) {
            throw new RuntimeException("No copies of the book are available");
        }

        if (rentalDays <= 0) {
            throw new IllegalArgumentException("Rental duration must be at least 1 day");
        }

        List<Rental> existingRentals = rentalRepo.findByClientIdAndBookId(clientId, bookId);
        for (Rental r : existingRentals) {
            if (r.getReturnDate().isAfter(LocalDate.now())) {
                throw new RuntimeException("Client already has this book rented");
            }
        }

        Rental rental = new Rental();
        rental.setClient(client);
        rental.setBook(book);
        rental.setRentalDate(LocalDate.now());
        rental.setReturnDate(LocalDate.now().plusDays(rentalDays));

        book.setQuantityAvailable(book.getQuantityAvailable() - 1);
        bookRepo.save(book);

        return rentalRepo.save(rental);
    }

    public List<Rental> getRentalsByClientId(Long clientId) {
        return rentalRepo.findByClientId(clientId);
    }

    // ✅ ADD THIS METHOD
    public List<Rental> getAllRentals() {
        return rentalRepo.findAll();
    }
}


