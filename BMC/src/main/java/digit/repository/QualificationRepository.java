package digit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import digit.web.models.Qualification;

@Repository
public interface QualificationRepository extends  JpaRepository<Qualification, Long>{

}
