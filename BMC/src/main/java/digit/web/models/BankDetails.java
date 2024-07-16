package digit.web.models;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BankDetails {

    private String name;
    private String branchNames;
    private String ifscCodes;
    private String micrCodes;
    private String accountnumber;


}
