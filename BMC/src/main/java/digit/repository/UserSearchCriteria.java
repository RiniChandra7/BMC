package digit.repository;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@ToString
public class UserSearchCriteria {
    @JsonProperty("Option")
    private String option;

    @JsonProperty("UserID")
    private Long userId;

    @JsonProperty("TenantID")
    private String tenantId;


}


