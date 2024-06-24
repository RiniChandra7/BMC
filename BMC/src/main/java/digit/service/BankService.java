package digit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import digit.bmc.model.Bank;
import digit.repository.BankRepository;
import digit.web.models.SchemeApplicationRequest;

@Service
public class BankService {
    @Autowired
    private BankRepository bankRepository;

    public  Bank getBankByApplication(SchemeApplicationRequest schemeApplicationRequest) {

        Bank bank = new Bank();
        bank.setName(schemeApplicationRequest.getName());
        bank.setCode(schemeApplicationRequest.getCode());
        bank.setId(schemeApplicationRequest.getBankid());
        bank.setIsActive(schemeApplicationRequest.getIsActive());
        bank.setNarration(schemeApplicationRequest.getNarration());
        bank.setType(schemeApplicationRequest.getType());
        bank.setVersion(schemeApplicationRequest.getVersion());
        return bankRepository.save(bank);
    }
}
