package digit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import digit.web.models.Address;

@Repository
public interface AddressRepository extends  JpaRepository<Address, Long> {

}
