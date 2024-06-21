package digit.service;




import org.springframework.stereotype.Service;

import digit.web.models.Address;
import digit.web.models.SchemeApplicationRequest;

@Service
public class AddressService {
     

      public Address getAddressByApplication(SchemeApplicationRequest schemeApplicationRequest) {
       
         Address address = new Address();
         address.setAddress1(schemeApplicationRequest.getAddress1());
         address.setAddress2(schemeApplicationRequest.getAddress2());
         address.setLocation(schemeApplicationRequest.getLocation());
         address.setWard(schemeApplicationRequest.getWard());
         address.setCity(schemeApplicationRequest.getCity());
         address.setDistrict(schemeApplicationRequest.getDistrict());
         address.setPincode(schemeApplicationRequest.getPincode());
        
        
         return address;
     }

}
