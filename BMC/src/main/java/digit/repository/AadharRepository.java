package digit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import digit.bmc.model.AadharUser;

@Repository
public interface AadharRepository extends  JpaRepository<AadharUser, Long>{

}
