package digit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import digit.bmc.model.BmcRegistrationApplication;
import digit.repository.BmcRegistrationApplicationRepository;
import digit.web.models.BmcRequest;

@Service
public class BmcRegistrationApplicationService {
     @Autowired
    private BmcRegistrationApplicationRepository bmcRegistrationApplicationRepository;

    public BmcRegistrationApplication getBmcRegistrationApplicationByApplication( BmcRequest request) {
        BmcRegistrationApplication bmcRegistrationApplication = new BmcRegistrationApplication();
        bmcRegistrationApplication.setTenantId(request.getTenantId());
        bmcRegistrationApplication.setApplicationNumber(request.getApplicationNumber());
        bmcRegistrationApplication.setApplicantName(request.getApplicantName());
        bmcRegistrationApplication.setFatherName(request.getFatherName());
        bmcRegistrationApplication.setMobileNumber(request.getMobileNumber());
        bmcRegistrationApplication.setEmailId(request.getEmailId());
        bmcRegistrationApplication.setAadharNumber(request.getAadharNumber());

        return  bmcRegistrationApplication;

    }

}
