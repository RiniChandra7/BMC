package digit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import digit.bmc.model.AadharUser;
import digit.repository.AadharRepository;
import digit.web.models.SchemeApplicationRequest;

@Service
public class AadharService {
    @Autowired
    private AadharRepository addAadharRepository;

    public AadharUser getAadharUserByApplication(SchemeApplicationRequest schemeApplicationRequest) {
       
        AadharUser aadharUser = new AadharUser();
         aadharUser.setAadharRef(schemeApplicationRequest.getAadharRef()); 
         aadharUser.setUuid(schemeApplicationRequest.getUdid()); 
         aadharUser.setAadhar_fatherName(schemeApplicationRequest.getAadhar_fatherName()); 
         aadharUser.setAadhar_name(schemeApplicationRequest.getAadhar_name()); 
         aadharUser.setAadhar_dob(schemeApplicationRequest.getAadhar_dob()); 
         aadharUser.setAadhar_mobile(schemeApplicationRequest.getAadhar_mobile()); 
         aadharUser.setCreatedOn(schemeApplicationRequest.getCreatedOn());; 
         aadharUser.setModifiedOn(schemeApplicationRequest.getModifiedOn()); 
         aadharUser.setCreatedBy(schemeApplicationRequest.getCreatedBy()); 
         aadharUser.setModifiedBy(schemeApplicationRequest.getModifiedby()); 
        return addAadharRepository.save(aadharUser);
    }


}
