package digit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import digit.bmc.model.BankAccount;
import digit.repository.BankAccountRepository;
import digit.web.models.BmcRequest;

@Service
public class BankAccountService {
   @Autowired
    private BankAccountRepository bankAccountRepository;


    public BankAccount getBankAccountByApplication(BmcRequest request){
        BankAccount bankAccount = new BankAccount();
        bankAccount.setBranchId(request.getBranchId());
        bankAccount.setAccountNumber(request.getAccountNumber());
        bankAccount.setAccountType(request.getAccountType());
        bankAccount.setNarration(request.getNarration());
        bankAccount.setIsActive(request.getIsActive());
        bankAccount.setPayTo(request.getPayTo());
        bankAccount.setType(request.getType());
        bankAccount.setLastModifiedBy(request.getLastModifiedBy());
        bankAccount.setCreatedDate(request.getCreatedDate());
        bankAccount.setLastModifiedDate(request.getLastModifiedDate());
        bankAccount.setVersion(request.getVersion());
        bankAccount.setChequeFormatId(request.getChequeFormatId());

        return  bankAccount;
    }
}
