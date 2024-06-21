package digit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import digit.bmc.model.Courses;
@Repository
public interface CoursesRepository  extends  JpaRepository<Courses, Long>{

}
