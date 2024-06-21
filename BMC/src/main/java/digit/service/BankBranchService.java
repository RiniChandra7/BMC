package digit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import digit.bmc.model.BankBranch;
import digit.repository.BankBranchRepository;
import digit.web.models.BmcRequest;

@Service
public class BankBranchService {
  @Autowired
    private BankBranchRepository bankBranchRepository;

    public BankBranch getBankBranchByApplication(BmcRequest request) {

        BankBranch bankBranch = new BankBranch();
        bankBranch.setBranchcode(request.getBranchcode());
        bankBranch.setBranchname(request.getBranchName());
        bankBranch.setBranchaddress1(request.getBranchaddress1());
        bankBranch.setBranchaddress2(request.getBranchaddress2());
        bankBranch.setBranchcity(request.getBranchcity());
        bankBranch.setBranchstate(request.getBranchstate());
        bankBranch.setBranchpin(request.getBranchpin());
        bankBranch.setBranchphone(request.getBranchphone());
        bankBranch.setBranchfax(request.getBranchfax());
        bankBranch.setBankid(request.getBankid());
        bankBranch.setContactperson(request.getContactperson());
        bankBranch.setIsactive(request.getIsActive());
        bankBranch.setNarration(request.getNarration());
        bankBranch.setMicr(request.getMicr());
        bankBranch.setCreateddate(request.getCreatedDate());
        bankBranch.setLastmodifieddate(request.getLastModifiedDate());
        bankBranch.setLastmodifiedby(request.getLastModifiedBy());
        bankBranch.setVersion(request.getVersion());
        return  bankBranch;
    }

}
