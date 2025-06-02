package AlexaBooks.AlexaLibrary;

import AlexaBooks.AlexaLibrary.Entities.Book;
import AlexaBooks.AlexaLibrary.Entities.Client;
import AlexaBooks.AlexaLibrary.Entities.Purchase;
import AlexaBooks.AlexaLibrary.Entities.Rental;
import AlexaBooks.AlexaLibrary.Exceptions.BookNotFoundException;
import AlexaBooks.AlexaLibrary.Exceptions.InsufficientStockException;
import AlexaBooks.AlexaLibrary.Services.BookService;
import AlexaBooks.AlexaLibrary.Services.ClientService;
import AlexaBooks.AlexaLibrary.Services.PurchaseService;
import AlexaBooks.AlexaLibrary.Services.RentalService;
import org.springframework.stereotype.Component;

import java.util.Scanner;

@Component
public class LibraryAppMenu {

    private final Scanner scanner = new Scanner(System.in);
    private final BookService bookService;
    private final ClientService clientService;
    private final RentalService rentalService;
    private final PurchaseService purchaseService;
    private boolean running = true;
    private Client client;


    public LibraryAppMenu(BookService bookService, ClientService clientService, RentalService rentalService, PurchaseService purchaseService, PurchaseService purchaseService1) {
        this.bookService = bookService;
        this.clientService = clientService;
        this.rentalService = rentalService;
        this.purchaseService = purchaseService1;
    }


    public void showMenu() {
        askClientId();
        while (running) {
            printMenu();

            int choice = readChoice();

            switch (choice) {
                case 1 -> viewAvailableBooks();
                case 2 -> rentBook();
                case 3 -> purchaseBook();
                case 4 -> viewMyRentalsPurchases();
                case 5 -> exit();
                default -> System.out.println("Invalid choice, please try again.");
            }

            System.out.println(); // Add space between iterations
        }
    }

    private void askClientId() {
        while (true) {
            System.out.print("🆔 Please enter your client ID: ");
            while (!scanner.hasNextLong()) {
                System.out.println("❌ Invalid input. Please enter a numeric client ID.");
                scanner.next();
                System.out.print("🆔 Please enter your client ID: ");
            }

            long inputId = scanner.nextLong();

            try {
                client = clientService.getClientById(inputId);  // ✅ Fetch and store client
                System.out.printf("✅ Welcome, %s!%n%n", client.getName());  // 👋 Use client name
                break;
            } catch (ClientService.NotFoundException e) {
                System.out.println("🚫 Client not found. Please try again.");
            }
        }
    }


    private void printMenu() {
        System.out.println("📚 Welcome to AlexaLibrary 📚");
        System.out.println("What would you like to do?");
        System.out.println("1. View available books");
        System.out.println("2. Rent a book");
        System.out.println("3. Purchase a book");
        System.out.println("4. View my rentals/purchases");
        System.out.println("5. Exit");
        System.out.print("Enter your choice: ");
    }

    private int readChoice() {
        while (!scanner.hasNextInt()) {
            System.out.println("❌ Please enter a valid number.");
            scanner.next(); // Skip invalid input
            System.out.print("Enter your choice: ");
        }
        return scanner.nextInt();
    }

    private void viewAvailableBooks() {
        System.out.println("📖 Displaying available books...");
        // TODO: Call BookService to display available books
        var availableBooks = bookService.getAvailableBooks();

        if (availableBooks.isEmpty()) {
            System.out.println("🚫 No books are currently available.");
        } else {
            System.out.println("✅ The following books are available:");
            for (Book book : availableBooks) {
                System.out.printf("ID: %d | Title: %s | Author: %s | Genre: %s | Year: %d | Available: %d | Price: %.2f€%n",
                        book.getId(),
                        book.getTitle(),
                        book.getAuthor(),
                        book.getGenre(),
                        book.getPublicationYear(),
                        book.getQuantityAvailable(),
                        book.getPrice());
            }
        }
    }


    private void rentBook() {
        try {
            System.out.print("👤 Enter your Client ID: ");
            Long clientId = scanner.nextLong();

            System.out.print("📘 Enter the Book ID to rent: ");
            Long bookId = scanner.nextLong();

            System.out.print("📅 Enter rental duration in days: ");
            int rentalDays = scanner.nextInt();

            Rental rental = rentalService.createRental(clientId, bookId, rentalDays);

            System.out.println("✅ Rental created successfully!");
            System.out.printf("📚 Book: %s | Return by: %s%n",
                    rental.getBook().getTitle(), rental.getReturnDate());

        } catch (RuntimeException e) {
            System.out.println("❌ Error: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("❌ Unexpected error occurred. Please try again.");
            scanner.nextLine(); // Clear scanner buffer in case of mismatch
        }
    }
    public void purchaseBook() {
        // 1. Show available books (reuse your existing method)
        viewAvailableBooks();

        System.out.println("Enter the ID of the book you want to purchase:");
        Long bookId = scanner.nextLong();
        scanner.nextLine(); // consume leftover newline

        System.out.println("Enter the quantity you want to purchase:");
        int quantity = scanner.nextInt();
        scanner.nextLine(); // consume leftover newline

        try {
            // Assuming you have a method to get the current client
            Client currentClient = getCurrentClient();

            // Call your purchase service method
            Purchase purchase = purchaseService.createPurchase(client.getId(), bookId, quantity);

            System.out.println("Purchase successful!");
            System.out.println("Book: " + purchase.getBook().getTitle());
            System.out.println("Quantity: " + purchase.getQuantity());
            System.out.println("Total Price: " + purchase.getTotalPrice());
            System.out.println("Purchase Date: " + purchase.getPurchaseDate());

        } catch (BookNotFoundException e) {
            System.out.println("Error: Book not found.");
        } catch (InsufficientStockException e) {
            System.out.println("Error: Not enough stock available.");
        } catch (Exception e) {
            System.out.println("An error occurred during purchase: " + e.getMessage());
        }
    }

    private Client getCurrentClient() {
        return client;
    }


    private void viewMyRentalsPurchases() {
    System.out.println("📒 Viewing your rentals and purchases...");
    // TODO: Ask for client ID and fetch data from RentalService and PurchaseService
}

private void exit() {
    System.out.println("👋 Goodbye and thank you for using AlexaLibrary!");
    running = false;
}
}