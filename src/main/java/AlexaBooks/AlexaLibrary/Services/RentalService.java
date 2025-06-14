package AlexaBooks.AlexaLibrary.Services;

import AlexaBooks.AlexaLibrary.DTO.RentalRequestDTO;
import AlexaBooks.AlexaLibrary.Repositories.BookRepository;
import AlexaBooks.AlexaLibrary.Repositories.ClientRepository;
import AlexaBooks.AlexaLibrary.Repositories.RentalRepository;
import AlexaBooks.AlexaLibrary.Entities.Book;
import AlexaBooks.AlexaLibrary.Entities.Rental;
import AlexaBooks.AlexaLibrary.Entities.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

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
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Client not found"));

        Book book = bookRepo.findById(bookId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found"));

        if (book.getQuantityAvailable() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No copies of the book are available");
        }

        List<Rental> existingRentals = rentalRepo.findByClientIdAndBookId(clientId, bookId);
        for (Rental r : existingRentals) {
            if (r.getIsReturned() == null || !r.getIsReturned()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You already have this book rented");
            }
        }

        Rental rental = new Rental();
        rental.setClient(client);
        rental.setBook(book);
        rental.setRentalDate(LocalDate.now());
        rental.setDueDate(LocalDate.now().plusDays(14));

        book.setQuantityAvailable(book.getQuantityAvailable() - 1);
        bookRepo.save(book);

        return rentalRepo.saveAndFlush(rental);
    }

    @Transactional
    public Rental rentBook(RentalRequestDTO rentalRequestDTO) {
        Long clientId = rentalRequestDTO.getClientId();
        Long bookId = rentalRequestDTO.getBookId();
        return createRental(clientId, bookId);
    }

    @Transactional
    public Rental extendRental(Long rentalId, int extraDays) {
        Rental rental = rentalRepo.findById(rentalId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Rental not found"));

        if (rental.getIsReturned()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cannot extend a returned rental");
        }

        if (extraDays <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Extension days must be greater than 0");
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
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Rental not found"));

        if (rental.getIsReturned() != null && rental.getIsReturned()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This book has already been returned.");
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
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Rental not found"));

        if (rental.getIsReturned() != null && rental.getIsReturned()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cannot extend a returned rental.");
        }

        if (rental.getDueDate() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cannot extend rental without a due date.");
        }

        rental.setDueDate(rental.getDueDate().plusDays(14));
        rentalRepo.save(rental);
    }
}
