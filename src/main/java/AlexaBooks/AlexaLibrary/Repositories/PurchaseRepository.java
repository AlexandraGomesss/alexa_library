package AlexaBooks.AlexaLibrary.Repositories;
import AlexaBooks.AlexaLibrary.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseRepository extends JpaRepository <Purchase, Long> {

}
