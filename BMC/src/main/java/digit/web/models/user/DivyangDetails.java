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
public class DivyangDetails {
    private Long divyangpercent;
    private String divyangtype;
    private String divyangcardid;
  
    
}