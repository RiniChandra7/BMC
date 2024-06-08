package digit.web.models;

import org.egov.common.contract.models.AuditDetails;
import org.egov.common.contract.models.Workflow;
import org.egov.common.contract.request.User;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * Represents a scheme application entity.
 */
@ToString
@Getter
@Setter
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
    private Integer optedId;

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

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;

    @JsonProperty("user")
    private User user;

    public Workflow getWorkflow() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getWorkflow'");
    }

    public void setWorkflow(Object workflow) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setWorkflow'");
    }
}
