package AlexaBooks.AlexaLibrary.Controllers;
import AlexaBooks.AlexaLibrary.Book;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/clients")
public class ClientController {
    @PostMapping("/register")
    public String registerClient() {
        return "Client registered!";
    }
}

