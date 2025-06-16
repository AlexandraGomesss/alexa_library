package AlexaBooks.AlexaLibrary.DTO;

import java.time.LocalDate;

public class PurchaseDTO {
    private Long purchaseId;
    private String bookTitle;
    private LocalDate purchaseDate;
    private int quantity;
    private double totalPrice;

    public PurchaseDTO(Long purchaseId, String bookTitle, LocalDate purchaseDate, int quantity, double totalPrice) {
        this.purchaseId = purchaseId;
        this.bookTitle = bookTitle;
        this.purchaseDate = purchaseDate;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
    }

    public Long getPurchaseId() {
        return purchaseId;
    }

    public void setPurchaseId(Long purchaseId) {
        this.purchaseId = purchaseId;
    }

    public String getBookTitle() {
        return bookTitle;
    }

    public void setBookTitle(String bookTitle) {
        this.bookTitle = bookTitle;
    }

    public LocalDate getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(LocalDate purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }
}
