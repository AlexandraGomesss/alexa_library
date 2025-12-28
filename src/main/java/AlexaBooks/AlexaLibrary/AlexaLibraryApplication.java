package AlexaBooks.AlexaLibrary;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "AlexaBooks.AlexaLibrary.Entities")
@EnableJpaRepositories(basePackages = "AlexaBooks.AlexaLibrary.Repositories")
public class AlexaLibraryApplication implements CommandLineRunner {

    private final LibraryAppMenu libraryAppMenu;

    // default: false (não corre CLI em produção)
    @Value("${app.cli.enabled:false}")
    private boolean cliEnabled;

    public AlexaLibraryApplication(LibraryAppMenu libraryAppMenu) {
        this.libraryAppMenu = libraryAppMenu;
    }

    public static void main(String[] args) {
        SpringApplication.run(AlexaLibraryApplication.class, args);
    }

    @Override
    public void run(String... args) {
        if (!cliEnabled) return;

        System.out.println(" Welcome to Alexa Library");
        libraryAppMenu.showMenu();
    }
}
