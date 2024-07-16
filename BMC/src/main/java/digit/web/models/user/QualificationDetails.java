package digit.web.models.user;


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
public class QualificationDetails {

    private String qualification;
    private Long percentage;
    private Long year_of_passing;
    private String board;

  
    
}

