package digit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import digit.web.models.Address;

@EnableJpaRepositories
public interface AddressRepository extends  JpaRepository<Address, Long> {

}
