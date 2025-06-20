package AlexaBooks.AlexaLibrary.Entities;

import jakarta.persistence.*;

@Entity
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;  // Full name

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    // === Getters & Setters ===

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {  // ✅ Correct getter for full name
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // Optional: This method is not necessary, but you can keep it if you use it somewhere
    public boolean isEmpty() {
        return false;
    }
}
