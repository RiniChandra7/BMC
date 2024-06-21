package digit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import digit.bmc.model.Caste;
import digit.repository.CasteRepository;
import digit.web.models.BmcRequest;

@Service
public class CastService {

    @Autowired
    private CasteRepository casteRepository;

    public Caste getCastByApplication(BmcRequest request) {

      Caste caste = new Caste();
      return  caste;  
    }

}
