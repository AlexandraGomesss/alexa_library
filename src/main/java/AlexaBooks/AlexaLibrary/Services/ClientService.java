package AlexaBooks.AlexaLibrary.Services;
import AlexaBooks.AlexaLibrary.Book;

import AlexaBooks.AlexaLibrary.Repositories.ClientRepository;
import ch.qos.logback.core.net.server.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepo;

    public Client getClientById(Long id) {
        return clientRepo.findById(id).orElseThrow(() -> new RuntimeException("Client not found"));
    }

    public Client updateClient(Long id, Client updatedClient) {
        Client client = getClientById(id);
        client.setFirstName(updatedClient.getFirstName());
        client.setLastName(updatedClient.getLastName());
        client.setEmail(updatedClient.getEmail());
        client.setPassword(updatedClient.getPassword());
        return clientRepo.save(client);
    }
}
