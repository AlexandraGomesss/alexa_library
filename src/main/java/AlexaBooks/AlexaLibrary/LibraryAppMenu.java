package AlexaBooks.AlexaLibrary;

import AlexaBooks.AlexaLibrary.Entities.Book;
import AlexaBooks.AlexaLibrary.Entities.Client;
import AlexaBooks.AlexaLibrary.Services.BookService;
import AlexaBooks.AlexaLibrary.Services.ClientService;
import org.springframework.stereotype.Component;

import java.util.Scanner;

@Component
public class LibraryAppMenu {

    private final Scanner scanner = new Scanner(System.in);
    private final BookService bookService;
    private final ClientService clientService;
    private boolean running = true;
    private Client client;

    public LibraryAppMenu(BookService bookService, ClientService clientService) {
        this.bookService = bookService;
        this.clientService = clientService;
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
    System.out.println("📗 Rent a book feature coming soon...");
    // TODO: Ask for book ID and client ID, then call RentalService
}

private void purchaseBook() {
    System.out.println("📘 Purchase a book feature coming soon...");
    // TODO: Ask for book ID and client ID, then call PurchaseService
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