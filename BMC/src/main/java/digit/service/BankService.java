package digit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import digit.bmc.model.Bank;
import digit.repository.BankRepository;
import digit.web.models.BmcRequest;

@Service
public class BankService {
    @Autowired
    private BankRepository bankRepository;

    public  Bank getBankByApplication(BmcRequest request) {

        Bank bank = new Bank();
        return bank;
    }
}
