package digit.bmc.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
@Entity
@Table
public class Address {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
  private Long	id;
  @Column(name = "")
  private String uuid;
  @Column(name = "")
  private String address1;
  @Column(name = "")
  private String address2;
  @Column(name = "")
  private String location;
  @Column(name = "")
  private String ward;
  @Column(name = "")
  private String city;
  @Column(name = "")
  private String district;
  @Column(name = "")
  private String pincode;
  @Column(name = "")
  private Date createdon;
  @Column(name = "")
  private Date modifiedon;
  @Column(name = "")
  private int createdby;
  @Column(name = "")
  private int modifiedby;
public Long getId() {
	return id;
}
public void setId(Long id) {
	this.id = id;
}
public String getUuid() {
	return uuid;
}
public void setUuid(String uuid) {
	this.uuid = uuid;
}
public String getAddress1() {
	return address1;
}
public void setAddress1(String address1) {
	this.address1 = address1;
}
public String getAddress2() {
	return address2;
}
public void setAddress2(String address2) {
	this.address2 = address2;
}
public String getLocation() {
	return location;
}
public void setLocation(String location) {
	this.location = location;
}
public String getWard() {
	return ward;
}
public void setWard(String ward) {
	this.ward = ward;
}
public String getCity() {
	return city;
}
public void setCity(String city) {
	this.city = city;
}
public String getDistrict() {
	return district;
}
public void setDistrict(String district) {
	this.district = district;
}
public String getPincode() {
	return pincode;
}
public void setPincode(String pincode) {
	this.pincode = pincode;
}
public Date getCreatedon() {
	return createdon;
}
public void setCreatedon(Date createdon) {
	this.createdon = createdon;
}
public Date getModifiedon() {
	return modifiedon;
}
public void setModifiedon(Date modifiedon) {
	this.modifiedon = modifiedon;
}
public int getCreatedby() {
	return createdby;
}
public void setCreatedby(int createdby) {
	this.createdby = createdby;
}
public int getModifiedby() {
	return modifiedby;
}
public void setModifiedby(int modifiedby) {
	this.modifiedby = modifiedby;
}
  
  //code
  
  

}
