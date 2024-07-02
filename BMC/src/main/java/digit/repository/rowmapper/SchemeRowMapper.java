package digit.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

import digit.web.models.SchemeDetails;

@Component
public class SchemeRowMapper implements ResultSetExtractor<List<SchemeDetails>> {
    @Override
    public List<SchemeDetails> extractData(ResultSet rs) throws SQLException, DataAccessException {
        Map<Long, SchemeDetails> schemeDetailsMap = new LinkedHashMap<>();
        while (rs.next()) {
            Long schemeID = rs.getLong("SchemeID");
            SchemeDetails schemeDetails = schemeDetailsMap.get(schemeID);
            if (schemeDetails == null) {
                schemeDetails = SchemeDetails.builder()
                        .schemeID(rs.getLong("SchemeID"))
                        .schemeDesc(rs.getString("SchemeDescription"))
                        .schemeName(rs.getString("SchemeName"))
                        .eventName(rs.getString("EventName"))
                        .startDate(rs.getDate("startDate"))
                        .endDate(rs.getDate("enddate"))
                        .criteriaCondition(rs.getString("criteriacondition"))
                        .criteriaType(rs.getString("criteriatype"))
                        .criteriaValue(rs.getString("criteriavalue"))
                        .build();
                schemeDetailsMap.put(schemeID, schemeDetails);
            }
        }

        return new ArrayList<>(schemeDetailsMap.values());
    }
}
