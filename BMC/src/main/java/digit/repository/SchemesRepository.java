package digit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import digit.bmc.model.Schemes;
@Repository
public interface SchemesRepository  extends  JpaRepository<Schemes, Long> {

}
