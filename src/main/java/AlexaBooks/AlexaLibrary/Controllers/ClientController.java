package AlexaBooks.AlexaLibrary.Controllers;

import AlexaBooks.AlexaLibrary.Entities.Client;
import AlexaBooks.AlexaLibrary.DTO.ClientDTO;
import AlexaBooks.AlexaLibrary.Repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/clients")
public class ClientController {

    @Autowired
    private ClientRepository clientRepo;

    @PostMapping
    public ResponseEntity<Client> registerClient(@Valid @RequestBody ClientDTO dto) {
        Client client = new Client();
        client.setFirstName(dto.getFirstName());
        client.setLastName(dto.getLastName());
        client.setEmail(dto.getEmail());
        client.setPassword(dto.getPassword()); // NOTE: ideally hash password in real apps
        return ResponseEntity.ok(clientRepo.save(client));
    }
}

