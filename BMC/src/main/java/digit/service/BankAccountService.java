package digit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import digit.bmc.model.BankAccount;
import digit.repository.BankAccountRepository;
import digit.web.models.SchemeApplicationRequest;

@Service
public class BankAccountService {
   @Autowired
    private BankAccountRepository bankAccountRepository;


    public BankAccount getBankAccountByApplication(SchemeApplicationRequest schemeApplicationRequest){
        BankAccount bankAccount = new BankAccount();
        bankAccount.setBranchId(schemeApplicationRequest.getBranchId());
        bankAccount.setAccountNumber(schemeApplicationRequest.getAccountNumber());
        bankAccount.setAccountType(schemeApplicationRequest.getAccountType());
        bankAccount.setNarration(schemeApplicationRequest.getNarration());
        bankAccount.setIsActive(schemeApplicationRequest.getIsActive());
        bankAccount.setPayTo(schemeApplicationRequest.getPayTo());
        bankAccount.setType(schemeApplicationRequest.getType());
        bankAccount.setLastModifiedBy(schemeApplicationRequest.getLastModifiedBy());
        bankAccount.setCreatedDate(schemeApplicationRequest.getCreatedDate());
        bankAccount.setLastModifiedDate(schemeApplicationRequest.getLastModifiedDate());
        bankAccount.setVersion(schemeApplicationRequest.getVersion());
        bankAccount.setChequeFormatId(schemeApplicationRequest.getChequeFormatId());

        return  bankAccountRepository.save(bankAccount);
    }
}
