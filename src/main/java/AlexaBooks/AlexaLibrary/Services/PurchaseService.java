package AlexaBooks.AlexaLibrary.Services;

import AlexaBooks.AlexaLibrary.Entities.Book;
import AlexaBooks.AlexaLibrary.Entities.Client;
import AlexaBooks.AlexaLibrary.Entities.Purchase;
import AlexaBooks.AlexaLibrary.Repositories.BookRepository;
import AlexaBooks.AlexaLibrary.Repositories.ClientRepository;
import AlexaBooks.AlexaLibrary.Repositories.PurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;


@Service
    public class PurchaseService {

    @Autowired
    private PurchaseRepository purchaseRepo;

    @Autowired
    private ClientRepository clientRepo;

    @Autowired
    private BookRepository bookRepo;

    @Transactional
    public Purchase createPurchase(Long clientId, Long bookId, int quantity) {
        Client client = clientRepo.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Client not found"));

        Book book = bookRepo.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        if (book.getQuantityAvailable() < quantity) {
            throw new RuntimeException("Not enough books in stock");
        }

        double totalPrice = quantity * book.getPrice();

        Purchase purchase = new Purchase();
        purchase.setClient(client);
        purchase.setBook(book);
        purchase.setQuantity(quantity);
        purchase.setTotalPrice(totalPrice);
        purchase.setPurchaseDate(LocalDate.now()); // ✅ add this line

        book.setQuantityAvailable(book.getQuantityAvailable() - quantity);
        bookRepo.save(book); // optional but good for consistency

        return purchaseRepo.save(purchase);
    }

    public List<Purchase> getPurchasesByClientId(Long id) {
        return purchaseRepo.findByClientId(id);
    }
}




