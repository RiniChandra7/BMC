package digit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import digit.bmc.model.Caste;
import digit.repository.CasteRepository;
import digit.web.models.SchemeApplicationRequest;

@Service
public class CastService {

    @Autowired
    private CasteRepository casteRepository;

    public Caste getCastByApplication(SchemeApplicationRequest  schemeApplicationRequest) {

      Caste caste = new Caste();

      caste.setId(schemeApplicationRequest.getId());
      caste.setName(schemeApplicationRequest.getName());
      caste.setDescription(schemeApplicationRequest.getDescription());
      caste.setCreatedBy(schemeApplicationRequest.getCreatedBy());
      caste.setModifiedBy(schemeApplicationRequest.getModifiedby());
      return  casteRepository.save(caste);  
    }

}
