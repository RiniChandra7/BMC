package digit.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import digit.bmc.model.Courses;
@EnableJpaRepositories
public interface CoursesRepository  extends  JpaRepository<Courses, Long>{


    List<Courses> getActiveCourseByDate (Date startdt, Date enddt);

    Courses getCourseAmount (String courseName);

    Courses getCourseDuration (String courseName);

    List<Courses> getALlList();



}
