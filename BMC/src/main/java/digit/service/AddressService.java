package digit.service;

import org.egov.common.contract.models.Address;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import digit.repository.AddressRepository;
import digit.web.models.SchemeApplicationRequest;

@Service
public class AddressService {
     @Autowired
     private AddressRepository addressRepository;
     private Address address;
     public Address getAddressByApplication(SchemeApplicationRequest schemeApplicationRequest) {
     // Sundeep : Need to populate or set all required fields from Scheme Application request into address object
     // This will be done by Basu.
     
          // address.setAddress(null);
          // address.set
          // .setAddress1(schemeApplicationRequest.getAddress1());
          // // address.setAddress2(schemeApplicationRequest.getAddress2());
          // // address.setLocation(schemeApplicationRequest.getLocation());
          // // address.setWard(schemeApplicationRequest.getWard());
          // // address.setCity(schemeApplicationRequest.getCity());
          // // address.setDistrict(schemeApplicationRequest.getDistrict());
          // // address.setPincode(schemeApplicationRequest.getPincode());
          // // address.setId(schemeApplicationRequest.getId());
          return addressRepository.save(address);
     }

}
