package digit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import digit.bmc.model.Schemes;
import digit.repository.SchemesRepository;
import digit.web.models.SchemeApplicationRequest;

@Service
public class SchemeService {
    @Autowired
    private SchemesRepository schemesRepository;

    public Schemes getSchemesByApplication(SchemeApplicationRequest request) {

        Schemes schemes = new Schemes();

        schemes.setId(request.getId());
        schemes.setName(request.getName());
        schemes.setDescription(request.getDescription());
        return  schemesRepository.save(schemes);
    }

}
