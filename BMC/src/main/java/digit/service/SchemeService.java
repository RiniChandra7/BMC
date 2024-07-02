package digit.service;

import java.util.ArrayList;
import java.util.List;

import org.egov.common.contract.request.RequestInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import digit.repository.SchemeSearchCriteria;
import digit.repository.SchemesRepository;
import digit.web.models.Scheme.EventDetails;

@Service
public class SchemeService {
    @Autowired
    private SchemesRepository schemesRepository;

    // public Schemes getSchemesByApplication(SchemeApplicationRequest request) {

    //     Schemes schemes = new Schemes();

    //     schemes.setId(request.getId());
    //     schemes.setName(request.getName());
    //     schemes.setDescription(request.getDescription());
    //     return  schemesRepository.save(schemes);
    // }

    public List<EventDetails> getSchemes(RequestInfo requestInfo,SchemeSearchCriteria searchcriteria){
        // Fetch applications from database according to the given search criteria
        List<EventDetails> schemes = schemesRepository.getSchemeDetails(searchcriteria);
        // If no applications are found matching the given criteria, return an empty list
        if (CollectionUtils.isEmpty(schemes))
            return new ArrayList<>();
        return schemes;
    }

}
