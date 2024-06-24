package digit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import digit.bmc.model.Courses;
import digit.repository.CoursesRepository;
import digit.web.models.SchemeApplicationRequest;
@Service
public class CourseService {
    @Autowired
    private CoursesRepository coursesRepository;
    public Courses getCourseByApplication(SchemeApplicationRequest schemeApplicationRequest) {
       
        Courses course = new Courses();
        course.setAmount(schemeApplicationRequest.getAmount());
        course.setCourseName(schemeApplicationRequest.getCourseName());
        course.setDescription(schemeApplicationRequest.getDescription());
        course.setDuration(schemeApplicationRequest.getDuration());
        course.setEndDt(schemeApplicationRequest.getEndDt());
        course.setId(schemeApplicationRequest.getId());
        course.setImgUrl(schemeApplicationRequest.getImgUrl());
        course.setInstitute(schemeApplicationRequest.getInstitute());
        course.setInstituteAddress(schemeApplicationRequest.getInstituteAddress());
        course.setStartDt(schemeApplicationRequest.getStartDt());
        course.setUrl(schemeApplicationRequest.getUrl());
        course.setTypeId(schemeApplicationRequest.getTypeId());
        
        return coursesRepository.save(course);
    }

}
