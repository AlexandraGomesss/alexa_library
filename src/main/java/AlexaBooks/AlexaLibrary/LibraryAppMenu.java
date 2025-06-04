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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.time.format.DateTimeFormatter;


import java.util.List;
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


    @Autowired
    public LibraryAppMenu(
            RentalService rentalService,
            ClientService clientService,
            BookService bookService,
            PurchaseService purchaseService
    ) {
        this.rentalService = rentalService;
        this.clientService = clientService;
        this.bookService = bookService;
        this.purchaseService = purchaseService;

    }


    public void showMenu() {
        askClientId();
        while (running) {
            printMenu();

            int choice = readChoice();
            boolean canReturnBooks = hasActiveRentals();

            if (canReturnBooks) {
                switch (choice) {
                    case 1 -> viewAvailableBooks();
                    case 2 -> rentBook();
                    case 3 -> purchaseBook();
                    case 4 -> viewMyRentalsAndPurchases();
                    case 5 -> returnBook(); // ✅ new method
                    case 6 -> exit();
                    default -> System.out.println(" Invalid option. Please try again.");
                }
            } else {
                switch (choice) {
                    case 1 -> viewAvailableBooks();
                    case 2 -> rentBook();
                    case 3 -> purchaseBook();
                    case 4 -> viewMyRentalsAndPurchases();
                    case 5 -> exit();
                    default -> System.out.println(" Invalid option. Please try again.");
                }
            }

            System.out.println(); // Add space between iterations
        }
    }

    private void askClientId() {
        while (true) {
            System.out.print(" Please enter your client ID: ");
            while (!scanner.hasNextLong()) {
                System.out.println(" Invalid input. Please enter a numeric client ID.");
                scanner.next();
                System.out.print(" Please enter your client ID: ");
            }

            long inputId = scanner.nextLong();

            try {
                client = clientService.getClientById(inputId);  //  Fetch and store client
                System.out.printf(" Welcome, %s!%n%n", client.getName());  //  Use client name
                break;
            } catch (ClientService.NotFoundException e) {
                System.out.println(" Client not found. Please try again.");
            }
        }
    }


    private void printMenu() {
        System.out.println(" Welcome to AlexaLibrary ");
        System.out.println("What would you like to do?");
        System.out.println("1. View available books");
        System.out.println("2. Rent a book");
        System.out.println("3. Purchase a book");
        System.out.println("4. View my rentals/purchases");

        if (hasActiveRentals()) {
            System.out.println("5. Return a book");
            System.out.println("6. Exit");
        } else {
            System.out.println("5. Exit");
        }

        System.out.print("Enter your choice: ");
    }

    private int readChoice() {
        while (!scanner.hasNextInt()) {
            System.out.println(" Please enter a valid number.");
            scanner.next(); // Skip invalid input
            System.out.print("Enter your choice: ");
        }
        return scanner.nextInt();
    }

    private void viewAvailableBooks() {
        System.out.println(" Displaying available books...");
        var availableBooks = bookService.getAvailableBooks();

        if (availableBooks.isEmpty()) {
            System.out.println(" No books are currently available.");
        } else {
            System.out.println(" The following books are available:");
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

            Long bookId;
            while (true) {
                System.out.print(" Enter the Book ID to rent: ");
                if (scanner.hasNextLong()) {
                    bookId = scanner.nextLong();
                    scanner.nextLine(); // Clear buffer
                    if (bookService.getBookById(bookId) != null) break;
                    else System.out.println("Book ID not found. Try again.");
                } else {
                    System.out.println("Invalid input. Please enter a numeric Book ID.");
                    scanner.next(); // Clear invalid input
                }
            }


            System.out.print(" Enter rental duration in days: ");
            int rentalDays = scanner.nextInt();

            Rental rental = rentalService.createRental(client.getId(), bookId, rentalDays);

            System.out.println(" Rental created successfully!");
            System.out.printf(" Book: %s | Return by: %s%n",
                    rental.getBook().getTitle(), rental.getReturnDate());

        } catch (RuntimeException e) {
            System.out.println(" Error: " + e.getMessage());
        } catch (Exception e) {
            System.out.println(" Unexpected error occurred. Please try again.");
            scanner.nextLine(); // Clear scanner buffer in case of mismatch
        }

    }

    private boolean hasActiveRentals() {
        List<Rental> activeRentals = rentalService.getActiveRentalsByClientId(client.getId());
        return !activeRentals.isEmpty();
    }

    public void purchaseBook() {
        // 1. Show available books (reuse your existing method)
        viewAvailableBooks();

        Long bookId;
        while (true) {
            System.out.print("Enter the ID of the book you want to purchase: ");
            if (scanner.hasNextLong()) {
                bookId = scanner.nextLong();
                scanner.nextLine(); // clear buffer
                if (bookService.getBookById(bookId) != null) break;
                else System.out.println("Book ID not found. Try again.");
            } else {
                System.out.println("Invalid input. Please enter a numeric Book ID.");
                scanner.next(); // clear invalid input
            }
        }

        int quantity;
        while (true) {
            System.out.print("Enter the quantity you want to purchase: ");
            if (scanner.hasNextInt()) {
                quantity = scanner.nextInt();
                scanner.nextLine(); // clear buffer
                if (quantity > 0) break;
                else System.out.println("Quantity must be at least 1.");
            } else {
                System.out.println("Invalid input. Please enter a numeric quantity.");
                scanner.next(); // clear invalid input
            }
        }


        try {



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


    private void viewMyRentalsAndPurchases() {
        try {
            List<Rental> rentals = rentalService.getRentalsByClientId(client.getId());
            List<Purchase> purchases = purchaseService.getPurchasesByClientId(client.getId());

            System.out.println("\n Your Rentals:");
            if (rentals.isEmpty()) {
                System.out.println("You have no rentals.");
            } else {
                for (Rental rental : rentals) {
                    String returnDate = (rental.getReturnDate() != null) ? rental.getReturnDate().toString() : "N/A";
                    System.out.println("- " + rental.getBook().getTitle() +
                            " | Rented on: " + rental.getRentalDate() +
                            " | Return by: " + returnDate);

                }
            }

            System.out.println("\n Your Purchases:");
            if (purchases.isEmpty()) {
                System.out.println("You have no purchases.");
            } else {
                for (Purchase purchase : purchases) {
                    System.out.printf("- %s | Quantity: %d | Total: %.2f€ | Date: %s%n",
                            purchase.getBook().getTitle(),
                            purchase.getQuantity(),
                            purchase.getTotalPrice(),
                            purchase.getPurchaseDate());
                }
            }

        } catch (Exception e) {
            System.out.println(" Error fetching your rentals and purchases: " + e.getMessage());
        }
    }

    private void returnBook() {
        List<Rental> activeRentals = rentalService.getActiveRentalsByClientId(client.getId());

        if (activeRentals.isEmpty()) {
            System.out.println("You have no active rentals to return.");
            return;
        }

        System.out.println("Your active rentals:");
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        for (Rental rental : activeRentals) {
            System.out.printf("Rental ID: %d | Book: %s | Due Date: %s%n",
                    rental.getId(),
                    rental.getBook().getTitle(),
                    rental.getDueDate() != null
                            ? rental.getDueDate().format(formatter)
                            : "N/A");
        }

        Long rentalId = null;

        while (true) {
            System.out.print("Enter the Rental ID of the book you want to return: ");
            if (scanner.hasNextLong()) {
                Long input = scanner.nextLong();
                scanner.nextLine(); // Clear buffer

                boolean exists = activeRentals.stream().anyMatch(r -> r.getId().equals(input));
                if (exists) {
                    rentalId = input;
                    break;
                } else {
                    System.out.println("Invalid Rental ID. Please choose one from the list above.");
                }
            } else {
                System.out.println("Invalid input. Please enter a numeric Rental ID.");
                scanner.next(); // Clear invalid input
            }
        }


        try {
            rentalService.returnBook(rentalId);
            System.out.println("Book returned successfully!");
        } catch (RuntimeException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }



    private void exit() {
        System.out.println(" Goodbye and thank you for using Alexa Library!");
        running = false;
    }
    private Client getCurrentClient() {
        return client;
    }

}