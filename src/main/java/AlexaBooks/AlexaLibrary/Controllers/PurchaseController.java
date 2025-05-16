package AlexaBooks.AlexaLibrary.Controllers;
import AlexaBooks.AlexaLibrary.Purchase;
import AlexaBooks.AlexaLibrary.Services.PurchaseService;
import AlexaBooks.AlexaLibrary.Book;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;



@RestController
@RequestMapping("/purchases")
public class PurchaseController {

    @Autowired
    private PurchaseService purchaseService;

    @PostMapping
    public ResponseEntity<Purchase> createPurchase
            (@RequestParam Long clientId,
             @RequestParam Long bookId,
             @RequestParam int quantity
            ) {
        Purchase purchase = purchaseService.createPurchase(clientId, bookId, quantity);
        return new ResponseEntity<>(purchase, HttpStatus.CREATED);

    }

    @GetMapping
    public List<Purchase> getAllPurchases() {
            return purchaseService.getAllPurchases();
    }
}
