package AlexaBooks.AlexaLibrary.DTO;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RentalRequestDTO {

    @NotNull
    private Long clientId;

    @NotNull
    private Long bookId;

    @Min(value = 1, message = "Rental days must be at least 1")
    private int rentalDays;
}
