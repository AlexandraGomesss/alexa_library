package AlexaBooks.AlexaLibrary.DTO;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
public class RentalRequestDTO {

    @NotNull(message = "Client ID is required")
    private Long clientId;

    @NotNull(message = "Book ID ir required")
    private Long bookId;

    /*@Min(value = 1, message = "Rental days must be at least 1")
    private int rentalDays;*/

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    /*public int getRentalDays() {
        return rentalDays;
    }

    public void setRentalDays(int rentalDays) {
        this.rentalDays = rentalDays;
    }*/


    @Data
    @AllArgsConstructor
    public static class RentalResponseDTO {
        private Long id;
        private String bookTitle;
        private LocalDate dueDate;
    }

}


