package AlexaBooks.AlexaLibrary.Controllers;

import AlexaBooks.AlexaLibrary.Rental;
import AlexaBooks.AlexaLibrary.Services.RentalService;
import AlexaBooks.AlexaLibrary.Book;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rentals")
public class RentalController {

    @Autowired
    private RentalService rentalService;

    @PostMapping
    public ResponseEntity<Rental> createRental(@RequestParam Long clientId,
                                               @RequestParam Long bookId,
                                               @RequestParam int days) {
        Rental rental = rentalService.createRental(clientId, bookId, days);
        return new ResponseEntity<>(rental, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Rental> getAllRentals() {
        return rentalService.getAllRentals();

    }
}
