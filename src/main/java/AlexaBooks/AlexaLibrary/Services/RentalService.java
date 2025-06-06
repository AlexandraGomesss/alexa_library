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
    public Rental createRental(Long clientId, Long bookId) {
        Client client = clientRepo.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Client not found"));

        Book book = bookRepo.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        if (book.getQuantityAvailable() <= 0) {
            throw new RuntimeException("No copies of the book are available");
        }


        List<Rental> existingRentals = rentalRepo.findByClientIdAndBookId(clientId, bookId);
        for (Rental r : existingRentals) {
            if (r.getIsReturned() == null || !r.getIsReturned()) {
                // Rental is still active (not returned yet)
                throw new RuntimeException("Client already has this book rented");
            }
        }


        Rental rental = new Rental();
        rental.setClient(client);
        rental.setBook(book);
        rental.setRentalDate(LocalDate.now());
        rental.setDueDate(LocalDate.now().plusDays(14));

        book.setQuantityAvailable(book.getQuantityAvailable() - 1);
        bookRepo.save(book);

        Rental savedRental = rentalRepo.saveAndFlush(rental); // << HERE
        return savedRental;
    }

    @Transactional
    public Rental extendRental(Long rentalId, int extraDays) {
        Rental rental = rentalRepo.findById(rentalId)
                .orElseThrow(() -> new RuntimeException("Rental not found"));

        if (rental.getIsReturned()) {
            throw new RuntimeException("Cannot extend a returned rental");
        }

        if (extraDays <= 0) {
            throw new IllegalArgumentException("Extension days must be greater than 0");
        }

        rental.setDueDate(rental.getDueDate().plusDays(extraDays));
        return rentalRepo.save(rental);
    }

    public List<Rental> getRentalsByClientId(Long clientId) {
        return rentalRepo.findByClientId(clientId);
    }


    public List<Rental> getActiveRentalsByClientId(Long clientId) {
        return rentalRepo.findByClientIdAndIsReturnedFalse(clientId);
    }


    @Transactional
    public void returnBook(Long rentalId) {
        Rental rental = rentalRepo.findById(rentalId)
                .orElseThrow(() -> new RuntimeException("Rental not found"));

        if (rental.getIsReturned() != null && rental.getIsReturned()) {
            throw new RuntimeException("This book has already been returned.");
        }

        rental.setReturnDate(LocalDate.now());
        rental.setIsReturned(true);

        Book book = rental.getBook();
        book.setQuantityAvailable(book.getQuantityAvailable() + 1);
        bookRepo.save(book);

        rentalRepo.save(rental);
    }

    @Transactional
    public void extendRental(Long rentalId) {
        Rental rental = rentalRepo.findById(rentalId)
                .orElseThrow(() -> new RuntimeException("Rental not found"));

        if (rental.getIsReturned() != null && rental.getIsReturned()) {
            throw new RuntimeException("Cannot extend a returned rental.");
        }

        if (rental.getDueDate() == null) {
            throw new RuntimeException("Cannot extend rental without a due date.");
        }

        // Add 14 days to current due date
        LocalDate newDueDate = rental.getDueDate().plusDays(14);
        rental.setDueDate(newDueDate);

        rentalRepo.save(rental);
    }
}



