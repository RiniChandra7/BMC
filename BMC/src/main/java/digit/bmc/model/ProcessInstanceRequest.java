package digit.bmc.model;

import java.util.ArrayList;
import java.util.List;

import org.egov.common.contract.request.RequestInfo;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class ProcessInstanceRequest {
	@JsonProperty("RequestInfo")
	private RequestInfo requestInfo;

	@JsonProperty("ProcessInstances")
	@Valid
	@NotNull
	private List<ProcessInstance> processInstances;

	public ProcessInstanceRequest addProcessInstanceItem(ProcessInstance processInstanceItem) {
		if (this.processInstances == null) {
			this.processInstances = new ArrayList<>();
		}
		this.processInstances.add(processInstanceItem);
		return this;
	}

}