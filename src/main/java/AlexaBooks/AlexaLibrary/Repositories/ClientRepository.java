package AlexaBooks.AlexaLibrary.Repositories;

import AlexaBooks.AlexaLibrary.Entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {
    Client findByEmail(String email);
}
