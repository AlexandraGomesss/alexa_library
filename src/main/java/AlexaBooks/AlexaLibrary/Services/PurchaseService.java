

package AlexaBooks.AlexaLibrary.Services;

import AlexaBooks.AlexaLibrary.Book;
import AlexaBooks.AlexaLibrary.Client;
import AlexaBooks.AlexaLibrary.Purchase;
import AlexaBooks.AlexaLibrary.Repositories.BookRepository;
import AlexaBooks.AlexaLibrary.Repositories.ClientRepository;
import AlexaBooks.AlexaLibrary.Repositories.PurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;



    @Service
    public class PurchaseService {


        @Autowired
        private PurchaseRepository purchaseRepository;

        @Autowired
        private ClientRepository clientRepository;

        @Autowired
        private BookRepository bookRepository;

        public Purchase createPurchase(Long clientId, Long bookId, int quantity) {
            Client client = (Client) clientRepository.findById(clientId)
                    .orElseThrow(() -> new RuntimeException("Client not found"));

            Book book = bookRepository.findById(bookId)
                    .orElseThrow(() -> new RuntimeException("Book not found"));

            if (book.getQuantityAvailable() < quantity) {
                throw new RuntimeException("Not enough books in stock");
            }
            double totalPrice = quantity * book.getPrice();

            book.setQuantityAvailable(book.getQuantityAvailable() - quantity);
            bookRepository.save(book);

            Purchase purchase = new Purchase();
            purchase.setClient(client);
            purchase.setBook(book);
            purchase.setQuantity(quantity);
            purchase.setTotalPrice(totalPrice);

            return purchaseRepository.save(purchase);
        }

        public List<Purchase> getAllPurchases() {
            return purchaseRepository.findAll();
        }
    }

