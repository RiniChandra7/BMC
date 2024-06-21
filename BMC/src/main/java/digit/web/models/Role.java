package digit.web.models;

import java.time.LocalDate;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Role
 */
@Validated
@jakarta.annotation.Generated(value = "org.egov.codegen.SpringBootCodegen", date = "2022-10-25T21:43:19.662+05:30")

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Role {
    @JsonProperty("id")
    private Long id = null;

    @JsonProperty("name")
    private String name = null;

    @JsonProperty("code")
    private String code = null;

    @JsonProperty("description")
    private String description = null;

    @JsonProperty("createdBy")
    private Long createdBy = null;

    @JsonProperty("createdDate")
    private LocalDate createdDate = null;

    @JsonProperty("lastModifiedBy")
    private Long lastModifiedBy = null;

    @JsonProperty("lastModifiedDate")
    private LocalDate lastModifiedDate = null;

    @JsonProperty("tenantId")
    private String tenantId = null;


}

