package digit.bmc.model;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.egov.common.contract.models.AuditDetails;
import org.egov.common.contract.models.Document;

import com.fasterxml.jackson.annotation.JsonProperty;

public class BmcRegistrationApplication {
	
	@JsonProperty("id")
	private String id = null;

	@JsonProperty("tenantId")
	private String tenantId = null;

	@JsonProperty("applicationNumber")
	private String applicationNumber = null;

	@JsonProperty("applicantName")
	private String applicantName = null;

	@JsonProperty("fatherName")
	private String fatherName = null;

	@JsonProperty("mobileNumber")
	private String mobileNumber = null;

	@JsonProperty("emailId")
	private String emailId = null;

	@JsonProperty("aadharNumber")
	private String aadharNumber = null;

	@JsonProperty("address")
	private Address address = null;



	@JsonProperty("auditDetails")
	private AuditDetails auditDetails = null;

	@JsonProperty("documents")
	@Valid
	private List<Document> documents;




	public BmcRegistrationApplication addDocumentsItem(Document documentsItem) {
		if (this.documents == null) {
			this.documents = new ArrayList<>();
		}

		if (null != documentsItem)
			this.documents.add(documentsItem);
		return this;
	}

}
