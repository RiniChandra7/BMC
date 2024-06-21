package digit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import digit.bmc.model.Machines;
import digit.repository.MachinesRepository;
import digit.web.models.BmcRequest;
@Service
public class MachineService {
    @Autowired
    private MachinesRepository machinesRepository;
    public Machines getMachineByApplication(BmcRequest request) {
    Machines machines = new Machines();

     return  machines;
    }
}
