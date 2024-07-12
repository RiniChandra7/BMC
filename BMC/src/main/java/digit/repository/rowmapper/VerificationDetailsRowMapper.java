package digit.repository.rowmapper;
import org.springframework.jdbc.core.RowMapper;

import digit.bmc.model.VerificationDetails;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;

public class VerificationDetailsRowMapper implements RowMapper<VerificationDetails> {

    @Override
    public VerificationDetails mapRow(ResultSet rs, int rowNum) throws SQLException {
        VerificationDetails details = new VerificationDetails();
        details.setApplicationNumber(rs.getString("applicationnumber"));
        details.setAadharName(rs.getString("aadharname"));
        details.setGender(rs.getString("gender"));
        details.setCaste(rs.getString("caste"));
        details.setReligion(rs.getString("religion"));

        String[] fileIdsArray = (String[]) rs.getArray("fileids").getArray();
        details.setFileIds(Arrays.asList(fileIdsArray));

        String[] typesArray = (String[]) rs.getArray("types").getArray();
        details.setTypes(Arrays.asList(typesArray));

        return details;
    }
}
