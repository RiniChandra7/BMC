package digit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import digit.bmc.model.Machines;
import digit.repository.MachinesRepository;
import digit.web.models.SchemeApplicationRequest;
@Service
public class MachineService {
    @Autowired
    private MachinesRepository machinesRepository;
    public Machines getMachineByApplication(SchemeApplicationRequest request) {
    Machines machines = new Machines();

     machines.setId(request.getId());
     machines.setName(request.getName());
     machines.setAmount(request.getAmount());
     machines.setDescription(request.getDescription());
    

     return  machinesRepository.save(machines);
    }
}
