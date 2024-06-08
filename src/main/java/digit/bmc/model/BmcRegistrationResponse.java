package digit.bmc.model;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.egov.common.contract.response.ResponseInfo;


import com.fasterxml.jackson.annotation.JsonProperty;

public class BmcRegistrationResponse {
	
	@JsonProperty("ResponseInfo")
	private ResponseInfo responseInfo = null;

	@JsonProperty("BmcRegistrationApplication")
	@Valid
	private List<BmcRegistrationApplication> bmcRegistrationApplications = null;

	public BmcRegistrationResponse addBmcRegistrationApplicationsItem(
			BmcRegistrationApplication bmcRegistrationApplicationsItem) {
		if (this.bmcRegistrationApplications == null) {
			this.bmcRegistrationApplications = new ArrayList<>();
		}
		this.bmcRegistrationApplications.add(bmcRegistrationApplicationsItem);
		return this;
	}


}
