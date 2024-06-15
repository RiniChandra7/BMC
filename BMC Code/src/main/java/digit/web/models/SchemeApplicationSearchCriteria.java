package digit.web.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * Collection of search criteria fields used for SchemeApplication searches.
 */
@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SchemeApplicationSearchCriteria {
    @JsonProperty("tenantId")
    private String tenantId; // Tenant ID for filtering by tenant
    @JsonProperty("ids")
    private List<String> ids; // List of application IDs for filtering by specific IDs
    @JsonProperty("applicationStatus")
    private Boolean applicationStatus; // Filter by application status (e.g., approved, pending)
    @JsonProperty("verificationStatus")
    private Boolean verificationStatus; // Filter by verification status
    @JsonProperty("firstApprovalStatus")
    private Boolean firstApprovalStatus; // Filter by first approval status
    @JsonProperty("finalApproval")
    private Boolean finalApproval; // Filter by final approval status
    @JsonProperty("randomSelection")
    private Boolean randomSelection; // Filter by random selection
    @JsonProperty("submitted")
    private Boolean submitted; // Filter by submitted status
    @JsonProperty("applicationNumber")
    private String applicationNumber; // Filter by application number
    @JsonProperty("userId")
    private Long userId; // Filter by user ID
    @JsonProperty("startDate")
    private Long startDate; // Filter by application start date

    @JsonProperty("endDate")
    private Long endDate; // Filter by application end date
    // Add more fields as required for the search criteria
}
