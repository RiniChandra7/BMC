package digit.web.models;

import java.util.ArrayList;
import java.util.List;

import org.egov.common.contract.request.RequestInfo;
import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Contract class to receive request. Array of items are used in case of create,
 * whereas single item is used for update.
 */
@Validated
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SchemeApplicationRequest {

    @JsonProperty("RequestInfo")
    private RequestInfo requestInfo;

    @JsonProperty("SchemeApplications")
    @Valid
    @Builder.Default
    private List<SchemeApplication> schemeApplications = new ArrayList<>();

    public SchemeApplicationRequest addSchemeApplicationItem(SchemeApplication schemeApplicationItem) {
        this.schemeApplications.add(schemeApplicationItem);
        return this;
    }
}
