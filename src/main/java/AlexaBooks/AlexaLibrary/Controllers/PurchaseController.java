package AlexaBooks.AlexaLibrary.Controllers;

import AlexaBooks.AlexaLibrary.DTO.PurchaseDTO;
import AlexaBooks.AlexaLibrary.Entities.Purchase;
import AlexaBooks.AlexaLibrary.DTO.PurchaseRequestDTO;
import AlexaBooks.AlexaLibrary.Services.PurchaseService;


import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;

import java.util.List;


@RestController
@RequestMapping("/api/purchases")
public class PurchaseController {

    @Autowired
    private PurchaseService purchaseService;

    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<PurchaseDTO>> getPurchasesByClient(@PathVariable Long clientId) {
        List<PurchaseDTO> purchases = purchaseService.getPurchasesByClientId(clientId);
        return ResponseEntity.ok(purchases);
    }

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
