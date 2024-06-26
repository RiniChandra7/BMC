package digit.web.models;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * Represents an address entity.
 */
@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="eg_bmc_address")
public class Address {

    @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="userId")
    private Long userId;
    @Column(name="tenantId")
    private String tenantId;
    @Column(name="address1")
    private String address1;
    @Column(name="address2")
    private String address2;
    @Column(name="location")
    private String location;
    @Column(name="ward")
    private String ward;
    @Column(name="city")
    private String city;
    @Column(name="district")
    private String district;
    @Column(name="state")
    private String state;
    @Column(name="country")
    private String country;
    @Column(name="pincode")
    private String pincode;
}