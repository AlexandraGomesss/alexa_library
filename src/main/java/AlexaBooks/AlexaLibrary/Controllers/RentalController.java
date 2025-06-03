package AlexaBooks.AlexaLibrary.Controllers;

import AlexaBooks.AlexaLibrary.DTO.RentalRequestDTO;
import AlexaBooks.AlexaLibrary.Entities.Rental;
import AlexaBooks.AlexaLibrary.Services.RentalService;


import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rentals")
public class RentalController {

    @Autowired
    private RentalService rentalService;

    @GetMapping("/active/{clientId}")
    public List<Rental> getActiveRentals(@PathVariable Long clientId) {
        return rentalService.getActiveRentalsByClientId(clientId);
    }

    @PostMapping("/return/{rentalId}")
    public ResponseEntity<String> returnBook(@PathVariable Long rentalId) {
        rentalService.returnBook(rentalId);
        return ResponseEntity.ok("Book returned successfully");
    }
}
