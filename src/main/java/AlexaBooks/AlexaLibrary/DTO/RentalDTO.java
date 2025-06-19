package AlexaBooks.AlexaLibrary.DTO;

import java.time.LocalDate;

public class RentalDTO {
    public Long rentalId;
    public String bookTitle;
    public LocalDate dueDate;

    public RentalDTO(Long rentalId, String bookTitle, LocalDate dueDate) {
        this.rentalId = rentalId;
        this.bookTitle = bookTitle;
        this.dueDate = dueDate;
    }

    public Long getId() { return rentalId; }
    public String getBookTitle() { return bookTitle; }
    public LocalDate getDueDate() { return dueDate; }
}
