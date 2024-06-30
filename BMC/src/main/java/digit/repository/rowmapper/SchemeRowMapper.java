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
            Long id = rs.getLong("id");
            SchemeDetails schemeDetails = schemeDetailsMap.get(id);
            if (schemeDetails == null) {
                schemeDetails = SchemeDetails.builder()
                        .id(rs.getLong("id"))
                        .schemeDesc(rs.getString("SchemeDescription"))
                        .schemeName(rs.getString("SchemeName"))
                        .eventName(rs.getString("EventName"))
                        .startDate(rs.getDate("startDate"))
                        .endDate(rs.getDate("enddate"))
                        .build();
                schemeDetailsMap.put(id, schemeDetails);
            }
        }

        return new ArrayList<>(schemeDetailsMap.values());
    }
}
