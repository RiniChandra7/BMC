package digit.repository.rowmapper;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import digit.bmc.model.VerificationDetails;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Component
public class VerificationDetailsRowMapper implements ResultSetExtractor<List<VerificationDetails>> {

    @Override
    public List<VerificationDetails> extractData(ResultSet rs) throws SQLException, DataAccessException {
        Map<String, VerificationDetails> verificationDetailsMap = new LinkedHashMap<>();

        while (rs.next()) {
            String applicationNumber = rs.getString("applicationnumber");
            VerificationDetails verificationDetails = verificationDetailsMap.get(applicationNumber);

            if (verificationDetails == null) {
                verificationDetails = new VerificationDetails();
                verificationDetails.setApplicationNumber(applicationNumber);
                verificationDetails.setAadharName(rs.getString("aadharname"));
                verificationDetails.setGender(rs.getString("gender"));
                verificationDetails.setCaste(rs.getString("caste"));
                verificationDetails.setReligion(rs.getString("religion"));
                verificationDetailsMap.put(applicationNumber, verificationDetails);
            }

        }

        return new ArrayList<>(verificationDetailsMap.values());
    }
}