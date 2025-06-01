package AlexaBooks.AlexaLibrary;

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

	public AlexaLibraryApplication(LibraryAppMenu libraryAppMenu) {
		this.libraryAppMenu = libraryAppMenu;
	}

	public static void main(String[] args) {
		SpringApplication.run(AlexaLibraryApplication.class, args);
	}

	@Override
	public void run(String... args) {
		System.out.println("Alexa Library App");
		libraryAppMenu.showMenu();  // Delegates all menu logic
	}
}
