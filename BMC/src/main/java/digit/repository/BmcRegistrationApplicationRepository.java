package digit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import digit.bmc.model.BmcRegistrationApplication;

@Repository
public interface BmcRegistrationApplicationRepository extends  JpaRepository<BmcRegistrationApplication, Long>{

}
