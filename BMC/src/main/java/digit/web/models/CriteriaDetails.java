package digit.web.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class CriteriaDetails{
    private String criteriaType;
    private String criteriaCondition;
    private String criteriaValue;
}
