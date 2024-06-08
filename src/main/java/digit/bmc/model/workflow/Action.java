package digit.bmc.model.workflow;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.Size;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModel;
import lombok.Data;
import lombok.EqualsAndHashCode;

@ApiModel(description = "A Object holds the basic data for a Action in workflow")
@Validated
@jakarta.annotation.Generated(value = "org.egov.codegen.SpringBootCodegen", date = "2018-12-04T11:26:25.532+05:30")

@Data
@EqualsAndHashCode(of = { "tenantId", "currentState", "action" })
public class Action {

	@Size(max = 256)
	
	@JsonProperty("uuid")
	private String uuid;

	@Size(max = 256)
	
	@JsonProperty("tenantId")
	private String tenantId;

	@Size(max = 256)
	
	@JsonProperty("currentState")
	private String currentState;

	@Size(max = 256)
	
	@JsonProperty("action")
	private String action;

	@Size(max = 256)
	
	@JsonProperty("nextState")
	private String nextState;

	@Size(max = 1024)
	@JsonProperty("roles")
	@Valid
	private List<String> roles;

	private org.egov.common.contract.models.AuditDetails auditDetails;

	public Action addRolesItem(String rolesItem) {
		if (this.roles == null) {
			this.roles = new ArrayList<>();
		}
		this.roles.add(rolesItem);
		return this;
	}

}
