package AlexaBooks.AlexaLibrary.DTO;

import java.time.LocalDate;

public class RentalDTO {
    public Long rentalId;
    public String bookTitle;
    private String bookCoverUrl;
    public LocalDate dueDate;

    public RentalDTO(Long rentalId, String bookTitle, String bookCoverUrl, LocalDate dueDate) {
        this.rentalId = rentalId;
        this.bookTitle = bookTitle;
        this.bookCoverUrl = bookCoverUrl;
        this.dueDate = dueDate;
    }

    public Long getId() { return rentalId; }
    public String getBookTitle() { return bookTitle; }
    public String getBookCoverUrl() { return bookCoverUrl; }
    public LocalDate getDueDate() { return dueDate; }

}
