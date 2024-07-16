package digit.web.models.user;

import java.util.Date;
import java.util.List;

import org.egov.common.contract.models.Address;

import digit.bmc.model.Caste;

import digit.web.models.BankDetails;

import digit.web.models.Religion;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class UserDetails {
    private Long userID;
    private Date aadhardob;
    private String aadharfathername;
    private String gender;
    private String aadharname;
    private String aadharmobile;
    private String transgenderid;
    private Caste caste;
    private Religion religion;
    private Address address;
    private DivyangDetails divyang;
    private List<BankDetails> bankDetail;
    private List<DocumentDetails> documentDetails;
    private List<QualificationDetails> qualificationDetails;
    
}
