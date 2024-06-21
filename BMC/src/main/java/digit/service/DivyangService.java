package digit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import digit.bmc.model.Divyang;
import digit.repository.DivyangRepository;
import digit.web.models.BmcRequest;

@Service
public class DivyangService {
    @Autowired
    private DivyangRepository divyangRepository;

    public Divyang getBDivyangByApplication(BmcRequest request) {
        Divyang divyang = new  Divyang();

        return  divyang;
    }

}
