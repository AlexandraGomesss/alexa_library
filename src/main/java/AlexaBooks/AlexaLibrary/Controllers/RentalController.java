package AlexaBooks.AlexaLibrary.Controllers;

import AlexaBooks.AlexaLibrary.DTO.RentalRequestDTO;
import Entities.Rental;
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

    @PostMapping
    public ResponseEntity<Rental> createRental(@RequestBody @Valid RentalRequestDTO dto) {
        Rental rental = rentalService.createRental(dto.getClientId(),
                dto.getBookId(), dto.getRentalDays());
        return ResponseEntity.ok(rental);
    }


    @GetMapping
    public List<Rental> getAllRentals() {
        return rentalService.getAllRentals();

    }
}
