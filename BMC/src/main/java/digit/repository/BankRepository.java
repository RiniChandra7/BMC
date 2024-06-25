package digit.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import digit.bmc.model.Bank;
@Repository
public interface BankRepository extends JpaRepository<Bank,Long>{

    Bank getBank(String code);

    List<Bank> fetchActiveBank (Boolean isActive);

}
