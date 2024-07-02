package digit.web.models;

import java.util.List;

import org.egov.common.contract.response.ResponseInfo;

import com.fasterxml.jackson.annotation.JsonProperty;

import digit.web.models.Scheme.EventDetails;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SchemeSearchResponse {
    @JsonProperty("ResponseInfo")
   private ResponseInfo responseInfo;

   @JsonProperty("SchemeDetails")
   private List<EventDetails> schemeDetails;
}
