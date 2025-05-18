package AlexaBooks.AlexaLibrary.Repositories;

import AlexaBooks.AlexaLibrary.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {
    Client findByEmail(String email);
}
