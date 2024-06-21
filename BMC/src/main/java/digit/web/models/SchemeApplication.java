package digit.web.models;

import org.egov.common.contract.models.AuditDetails;
import org.egov.common.contract.request.User;

import com.fasterxml.jackson.annotation.JsonProperty;

import digit.bmc.model.AadharUser;
import digit.bmc.model.Bank;
import digit.bmc.model.BankAccount;
import digit.bmc.model.BankBranch;
import digit.bmc.model.BmcRegistrationApplication;
import digit.bmc.model.Caste;
import digit.bmc.model.Courses;
import digit.bmc.model.Divyang;
import digit.bmc.model.Machines;
import digit.bmc.model.Schemes;
import digit.bmc.model.Sector;
import digit.bmc.model.UserOtherDetails;
import digit.bmc.model.UserSchemeApplication;
import digit.bmc.model.Workflow;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import lombok.NoArgsConstructor;


/**
 * Represents a scheme application entity.
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SchemeApplication {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("applicationNumber")
    private String applicationNumber;

    @JsonProperty("userId")
    private Long userId;

    @JsonProperty("tenantId")
    private String tenantId;

    @JsonProperty("optedId")
    private Long optedId;

    @JsonProperty("applicationStatus")
    private Boolean applicationStatus;

    @JsonProperty("verificationStatus")
    private Boolean verificationStatus;

    @JsonProperty("firstApprovalStatus")
    private Boolean firstApprovalStatus;

    @JsonProperty("randomSelection")
    private Boolean randomSelection;

    @JsonProperty("finalApproval")
    private Boolean finalApproval;

    @JsonProperty("submitted")
    private Boolean submitted;

    @JsonProperty("modifiedOn")
    private Long modifiedOn;

    @JsonProperty("createdBy")
    private String createdBy;
 
    @JsonProperty("modifiedBy")
    private String modifiedBy;

    @JsonProperty("address")
    private Address address;
    @JsonProperty("schemes")
    private Schemes schemes;
    @JsonProperty("machines")
    private Machines machines;
    @JsonProperty("bank")
    private Bank bank;
    @JsonProperty("bank_Account")
    private BankAccount bank_Account;
    @JsonProperty("bank_Branch")
    private BankBranch bank_Branch;
    @JsonProperty("aadharUser")
    private AadharUser aadharUser;
    @JsonProperty("sector")
    private Sector sector;
    @JsonProperty("course")
    private Courses course;
    @JsonProperty("caste")
    private Caste caste;
    @JsonProperty("userOtherDetails")
    private UserOtherDetails userOtherDetails;
    @JsonProperty("divyang")
    private Divyang divyang;
    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;
    @JsonProperty("UserSchemeApplication")
     private UserSchemeApplication UserSchemeApplication;
     @JsonProperty("bmcRegistrationApplication")
     private BmcRegistrationApplication bmcRegistrationApplication;
    @JsonProperty("user")
    private User user;

    @Valid
    @JsonProperty("workflow")
    private Workflow workflow = null;
}
