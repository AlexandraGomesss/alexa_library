package AlexaBooks.AlexaLibrary.Controllers;

import AlexaBooks.AlexaLibrary.Purchase;
import AlexaBooks.AlexaLibrary.DTO.PurchaseRequestDTO;
import AlexaBooks.AlexaLibrary.Services.PurchaseService;


import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import jakarta.validation.Valid;



@RestController
@RequestMapping("/purchases")
public class PurchaseController {

    @Autowired
    private PurchaseService purchaseService;

    @PostMapping
    public ResponseEntity<Purchase> createPurchase(@RequestBody @Valid PurchaseRequestDTO dto) {
        Purchase purchase = purchaseService.createPurchase(dto.getClientId(), dto.getBookId(), dto.getQuantity());
        return ResponseEntity.ok(purchase);
    }
}

    /*@GetMapping
    public List<Purchase> getAllPurchases() {
            return purchaseService.getAllPurchases();
    }
}*/
