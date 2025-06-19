package AlexaBooks.AlexaLibrary.Controllers;

import AlexaBooks.AlexaLibrary.DTO.RentalDTO;
import AlexaBooks.AlexaLibrary.DTO.RentalRequestDTO;
import AlexaBooks.AlexaLibrary.Entities.Rental;
import AlexaBooks.AlexaLibrary.Services.RentalService;


import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/rentals")
public class RentalController {

    @Autowired
    private RentalService rentalService;

    @GetMapping("/active/{clientId}")
    public List<RentalDTO> getActiveRentals(@PathVariable Long clientId) {
        List<Rental> rentals = rentalService.getActiveRentalsByClientId(clientId);
        return rentals.stream()
                .map(rental -> new RentalDTO(
                        rental.getId(),
                        rental.getBook().getTitle(),
                        rental.getDueDate()
                ))
                .toList();
    }

    @PostMapping("/rent")
        public ResponseEntity<RentalRequestDTO.RentalResponseDTO> rentBook(@Valid @RequestBody RentalRequestDTO rentalRequestDTO) {
            Rental rental = rentalService.rentBook(rentalRequestDTO);
            String bookTitle = rental.getBook().getTitle();
            LocalDate dueDate = rental.getDueDate();
        return ResponseEntity.ok(new RentalRequestDTO.RentalResponseDTO(rental.getId(), bookTitle, dueDate));
        }

    @PostMapping("/return/{rentalId}")
    public ResponseEntity<String> returnBook(@PathVariable Long rentalId) {
        rentalService.returnBook(rentalId);
        return ResponseEntity.ok("Book returned successfully");
    }

    @PostMapping("/extend/{rentalId}")
    public ResponseEntity<String> extendRental(@PathVariable Long rentalId) {
        rentalService.extendRental(rentalId);
        return ResponseEntity.ok("Rental extended successfully");
    }

}

