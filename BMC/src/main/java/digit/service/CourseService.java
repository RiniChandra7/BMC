package digit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import digit.bmc.model.Courses;
import digit.repository.CoursesRepository;
import digit.web.models.BmcRequest;
@Service
public class CourseService {
    @Autowired
    private CoursesRepository coursesRepository;
    public Courses getCourseByApplication(BmcRequest request) {
       
        Courses course = new Courses();
        
        
        return course;
    }

}
