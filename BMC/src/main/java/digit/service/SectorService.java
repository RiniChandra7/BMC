package digit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import digit.bmc.model.Sector;
import digit.repository.SectorRepository;
import digit.web.models.SchemeApplicationRequest;

@Service
public class SectorService {
    @Autowired
    private SectorRepository sectorRepository;

    public Sector saveSector(SchemeApplicationRequest request){
    Sector sector = new Sector();
    sector.setId(request.getId());
    sector.setRemark(request.getRemark());
    return sectorRepository.save(sector);

    }

}
