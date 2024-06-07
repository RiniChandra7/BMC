package digit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import digit.bmc.model.BankAccount;

public interface BankAccountRepository extends JpaRepository<BankAccount,Long>{

}
