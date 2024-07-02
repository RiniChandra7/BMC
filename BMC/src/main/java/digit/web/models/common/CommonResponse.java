package digit.web.models.common;

import java.util.List;

import org.egov.common.contract.response.ResponseInfo;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CommonResponse {
    @JsonProperty("ResponseInfo")
   private ResponseInfo responseInfo;

   @JsonProperty("SchemeDetails")
   private List<CommonDetails> commonDetails;
}
