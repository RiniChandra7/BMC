package digit.bmc.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import digit.web.models.Document;
import io.swagger.annotations.ApiModel;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Fields related to workflow service
 */
@ApiModel(description = "Fields related to workflow service")
@Validated
@jakarta.annotation.Generated(value = "org.egov.codegen.SpringBootCodegen", date = "2023-08-20T09:30:27.617+05:30")

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Workflow {
	@JsonProperty("action")
	private String action = null;

	@JsonProperty("status")
	private String status = null;

	@JsonProperty("comments")
	private String comments = null;

	@JsonProperty("assignes")
	@Valid
	private List<String> assignes = null;

	@JsonProperty("documents")
	@Valid
	private List<Document> documents = null;

	public Workflow addDocumentsItem(Document documentsItem) {
		if (this.documents == null) {
			this.documents = new ArrayList<>();
		}
		this.documents.add(documentsItem);
		return this;
	}

}
