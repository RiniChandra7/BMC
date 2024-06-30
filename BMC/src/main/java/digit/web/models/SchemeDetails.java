package digit.web.models;

import java.util.Date;

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
public class SchemeDetails {
    private Long id;
    private String eventName;
    private String schemeName;
    private Date startDate;
    private Date endDate;
    private String schemeDesc;
}
