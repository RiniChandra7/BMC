package digit.bmc.model.workflow;

import java.util.ArrayList;
import java.util.List;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModel;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@ApiModel(description = "A Object holds the Business Service")
@Validated
@jakarta.annotation.Generated(value = "org.egov.codegen.SpringBootCodegen", date = "2018-12-04T11:26:25.532+05:30")

@Data
@ToString
@EqualsAndHashCode(of = { "tenantId", "businessService" })
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BusinessService {

	@Size(max = 256)
	@JsonProperty("tenantId")
	private String tenantId;

	@Size(max = 256)
	@JsonProperty("uuid")
	private String uuid;

	@Size(max = 256)
	@JsonProperty("businessService")
	private String businessService;

	@Size(max = 256)
	@JsonProperty("business")
	private String business;

	@Size(max = 1024)
	@JsonProperty("getUri")
	private String getUri;

	@Size(max = 1024)
	@JsonProperty("postUri")
	private String postUri;

	@JsonProperty("businessServiceSla")
	private Long businessServiceSla;

	@NotNull
	@Valid
	@JsonProperty("states")
	private List<State> states;

	@JsonProperty("auditDetails")
	private org.egov.common.contract.models.AuditDetails auditDetails;

	public BusinessService addStatesItem(State statesItem) {
		if (this.states == null) {
			this.states = new ArrayList<>();
		}
		this.states.add(statesItem);
		return this;
	}

	/**
	 * Returns the currentState with the given uuid if not present returns null
	 * 
	 * @param uuid the uuid of the currentState to be returned
	 * @return
	 */
//	public State getStateFromUuid(String uuid) {
//		State state = null;
//		if (this.states != null) {
//			for (State s : this.states) {
//				if (s.getUuid().equalsIgnoreCase(uuid)) {
//					state = s;
//					break;
//				}
//			}
//		}
//		return state;
//	}

}
