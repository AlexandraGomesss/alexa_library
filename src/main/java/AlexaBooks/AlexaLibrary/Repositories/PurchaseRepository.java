package AlexaBooks.AlexaLibrary.Repositories;
import Entities.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseRepository extends JpaRepository <Purchase, Long> {

}
