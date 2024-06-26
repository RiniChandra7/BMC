package digit.repository;
import org.egov.common.contract.models.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
public interface AddressRepository extends  JpaRepository<Address, Long> {

}
