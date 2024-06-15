package digit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import digit.bmc.model.Bank;
@Repository
public interface BankRepository extends JpaRepository<Bank,Long>{

}
