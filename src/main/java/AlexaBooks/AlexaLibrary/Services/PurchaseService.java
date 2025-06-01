package AlexaBooks.AlexaLibrary.Services;

import AlexaBooks.AlexaLibrary.Entities.Book;
import AlexaBooks.AlexaLibrary.Entities.Client;
import AlexaBooks.AlexaLibrary.Entities.Purchase;
import AlexaBooks.AlexaLibrary.Repositories.BookRepository;
import AlexaBooks.AlexaLibrary.Repositories.ClientRepository;
import AlexaBooks.AlexaLibrary.Repositories.PurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
    public class PurchaseService {


        @Autowired
        private PurchaseRepository purchaseRepo;

        @Autowired
        private ClientRepository clientRepo;

        @Autowired
        private BookRepository bookRepo;

        public Purchase createPurchase(Long clientId, Long bookId, int quantity) {
            Client client = (Client) clientRepo.findById(clientId)
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

            book.setQuantityAvailable(book.getQuantityAvailable() - quantity);
            return purchaseRepo.save(purchase);

        }
    }




