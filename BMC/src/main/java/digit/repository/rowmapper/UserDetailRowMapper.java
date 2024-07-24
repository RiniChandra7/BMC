package digit.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;

import org.egov.common.contract.models.Address;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

import digit.bmc.model.Caste;
import digit.web.models.BankDetails;
import digit.web.models.Religion;
import digit.web.models.user.DivyangDetails;
import digit.web.models.user.DocumentDetails;
import digit.web.models.user.QualificationDetails;
import digit.web.models.user.UserDetails;



@Component
public class UserDetailRowMapper implements ResultSetExtractor<List<UserDetails>> {
    
     @Override
    public List<UserDetails> extractData(ResultSet rs) throws SQLException, DataAccessException {
        Map<String, UserDetails> userDetailsMap = new LinkedHashMap<>();
        ResultSetMetaData rsmd = rs.getMetaData();
        Set<String> columns = new HashSet<>();
        for (int i = 1; i <= rsmd.getColumnCount(); i++) {
            columns.add(rsmd.getColumnName(i).toLowerCase());
        }

        while (rs.next()) {
            String userId = rs.getString("userid");
            UserDetails userDetails = userDetailsMap.get(userId);
            if (userDetails == null) {
                Caste caste = null;
                if (columns.contains("casteid") && columns.contains("caste") && rs.getObject("casteid") != null && rs.getString("caste") != null) {
                    caste = Caste.builder()
                        .id(rs.getLong("casteid"))
                        .name(rs.getString("caste"))
                        .build();
                }
    
                Religion religion = null;
                if (columns.contains("religionid") && columns.contains("religion") && rs.getObject("religionid") != null && rs.getString("religion") != null) {
                    religion = Religion.builder()
                        .id(rs.getLong("religionid"))
                        .name(rs.getString("religion"))
                        .build();
                }

                String addr = "";
                if (columns.contains("housenobldgapt")) addr += rs.getString("housenobldgapt") + "|";
                if (columns.contains("subdistrict")) addr += rs.getString("subdistrict") + "|";
                if (columns.contains("postoffice")) addr += rs.getString("postoffice") + "|";
                if (columns.contains("landmark")) addr += rs.getString("landmark") + "|";
                if (columns.contains("country")) addr += rs.getString("country") + "|";
                if (columns.contains("streetroadline")) addr += rs.getString("streetroadline") + "|";
                if (columns.contains("citytownvillage")) addr += rs.getString("citytownvillage") + "|";
                if (columns.contains("arealocalitysector")) addr += rs.getString("arealocalitysector") + "|";
                if (columns.contains("district")) addr += rs.getString("district") + "|";
                if (columns.contains("state")) addr += rs.getString("state") + "|";


                Address address = null;
                if (columns.contains("citytownvillage") && columns.contains("pincode")) {
                    address = Address.builder()
                        .city(rs.getString("citytownvillage"))
                        .pinCode(rs.getString("pincode"))
                        .address(addr)
                        .build();
                }

                DivyangDetails divyangDetails = null;
                if (columns.contains("divyangpercent") && columns.contains("divyangtype") && columns.contains("divyangcardid")) {
                    divyangDetails = new DivyangDetails(rs.getLong("divyangid"),rs.getLong("divyangpercent"), rs.getString("divyangtype"), rs.getString("divyangcardid"));
                }

                userDetails = UserDetails.builder()
                    .aadhardob(columns.contains("aadhardob") ? rs.getDate("aadhardob") : null)
                    .aadharfathername(columns.contains("aadharfathername") ? rs.getString("aadharfathername") : null)
                    .aadharmobile(columns.contains("aadharmobile") ? rs.getString("aadharmobile") : null)
                    .aadharname(columns.contains("aadharname") ? rs.getString("aadharname") : null)
                    .gender(columns.contains("gender") ? rs.getString("gender") : null)
                    .caste(caste)
                    .religion(religion)
                    .address(address)
                    .userID(columns.contains("userid") ? rs.getLong("userid") : null)
                    .transgenderid(columns.contains("transgenderid") ? rs.getString("transgenderid") : null)
                    .bankDetail(new ArrayList<>())
                    .documentDetails(new ArrayList<>())
                    .divyang(divyangDetails)
                    .qualificationDetails(new ArrayList<>())
                    .build();

                userDetailsMap.put(userId, userDetails);
            }

            // Add criteria details to the scheme
            if (columns.contains("documentname")) {
                String documentID = rs.getString("documentname");
                if (documentID != null) {
                    DocumentDetails documentDetails = userDetails.getDocumentDetails().stream()
                        .filter(c -> c.getDocumentName().equals(documentID))
                        .findFirst()
                        .orElse(null);

                    if (documentDetails == null) {
                        documentDetails = DocumentDetails.builder()
                            .documentName(documentID)
                            .available(rs.getBoolean("available"))
                            .build();

                        userDetails.getDocumentDetails().add(documentDetails);
                    }
                }
            }

            if (columns.contains("qualificationid")) {
                Long qualificationid = rs.getLong("qualificationid");
                if (qualificationid != null) {
                    QualificationDetails qualificationDetails = userDetails.getQualificationDetails().stream()
                        .filter(c -> c.getQualificationid().equals(qualificationid))
                        .findFirst()
                        .orElse(null);

                    if (qualificationDetails == null) {
                        qualificationDetails = QualificationDetails.builder()
                            .qualificationid(qualificationid)
                            .qualification(rs.getString("qualification"))
                            .board(rs.getString("board"))
                            .percentage(rs.getLong("percentage"))
                            .yearofpassing(rs.getLong("year_of_passing"))
                            .build();
                        userDetails.getQualificationDetails().add(qualificationDetails);
                    }
                }
            }

            if (columns.contains("ifsc") && columns.contains("accountnumber")) {
                String bank = Objects.requireNonNullElse(rs.getString("ifsc"), "").concat(Objects.requireNonNullElse(rs.getString("accountnumber"), ""));
                if (bank != null) {
                    BankDetails bankDetails = userDetails.getBankDetail().stream()
                        .filter(c -> Objects.requireNonNullElse(c.getIfsc(), "")
                        .concat(Objects.requireNonNullElse(c.getAccountnumber(), "")).equals(bank))
                        .findFirst()
                        .orElse(null);

                    if (bankDetails == null) {
                        bankDetails = BankDetails.builder()
                            .accountnumber(rs.getString("accountnumber"))
                            .branchName(rs.getString("branchname"))
                            .name(rs.getString("bankname"))
                            .ifsc(rs.getString("ifsc"))
                            .micr(rs.getString("micr"))
                            .build();
                        userDetails.getBankDetail().add(bankDetails);
                    }
                }
            }
        }
        return new ArrayList<>(userDetailsMap.values());
}
}