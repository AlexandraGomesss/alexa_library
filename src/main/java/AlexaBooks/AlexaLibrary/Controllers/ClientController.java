package AlexaBooks.AlexaLibrary.Controllers;

import AlexaBooks.AlexaLibrary.Entities.Client;
import AlexaBooks.AlexaLibrary.DTO.ClientDTO;
import AlexaBooks.AlexaLibrary.Repositories.ClientRepository;
import AlexaBooks.AlexaLibrary.Services.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("api/clients")
public class ClientController {


    private final ClientService clientService;

    @Autowired
    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @Autowired
    private ClientRepository clientRepo;

    // ✅ Add this GET endpoint
    @GetMapping("/{id}")
    public ResponseEntity<Client> getClientById(@PathVariable Long id) {
        Client client = clientService.getClientById(id);
        return ResponseEntity.ok(client);
    }

    @GetMapping
    public ResponseEntity<List<Client>> getAllClients() {
        return ResponseEntity.ok(clientService.getAllClients());
    }

    @PostMapping
    public ResponseEntity<Client> registerClient(@Valid @RequestBody ClientDTO dto) {
        Client client = new Client();
        client.setName(dto.getFirstName());
        client.setEmail(dto.getEmail());
        client.setPassword(dto.getPassword()); // NOTE: ideally hash password in real apps
        return ResponseEntity.ok(clientRepo.save(client));
    }
}

