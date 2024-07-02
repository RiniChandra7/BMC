package digit.web.models.Scheme;

import java.util.Date;
import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EventDetails {
    private String eventName;
    private Date startDate;
    private Date endDate;
    private List<SchemeHeadDetails> schemeshead;
}