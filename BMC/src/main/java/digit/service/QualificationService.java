package digit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import digit.repository.QualificationRepository;
import digit.web.models.Qualification;
import digit.web.models.SchemeApplicationRequest;

@Service
public class QualificationService {
    @Autowired
    private QualificationRepository qualificationRepository;

    public Qualification saveQualification (SchemeApplicationRequest schemeApplicationRequest){

        Qualification qualification = new Qualification();

        qualification.setId(schemeApplicationRequest.getId());
        qualification.setQualification(schemeApplicationRequest.getQualification());
        qualification.setRemark(schemeApplicationRequest.getRemark());
        return  qualificationRepository.save(qualification);
    }



}
