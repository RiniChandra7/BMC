package digit.repository;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
@Data
@NoArgsConstructor
@ToString
public class BmcApplicationSearchCriteria {
	
	 @JsonProperty("tenantId")
	    private String tenantId;

	    @JsonProperty("status")
	    private String status;

	    @JsonProperty("ids")
	    private List<String> ids;

	    @JsonProperty("applicationNumber")
	    private String applicationNumber;


}
