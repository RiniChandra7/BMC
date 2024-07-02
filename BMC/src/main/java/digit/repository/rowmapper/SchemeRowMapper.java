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

import digit.web.models.scheme.CriteriaDetails;
import digit.web.models.scheme.EventDetails;
import digit.web.models.scheme.SchemeDetails;
import digit.web.models.scheme.SchemeHeadDetails;

@Component
public class SchemeRowMapper implements ResultSetExtractor<List<EventDetails>> {
    @Override
    public List<EventDetails> extractData(ResultSet rs) throws SQLException, DataAccessException {
        Map<String, EventDetails> eventDetailsMap = new LinkedHashMap<>();
        while (rs.next()) {
            String eventName = rs.getString("eventname");
            EventDetails eventDetails = eventDetailsMap.get(eventName);
            if (eventDetails == null) {
                eventDetails = EventDetails.builder()
                    .eventName(rs.getString("eventName"))
                    .startDate(rs.getDate("startDate"))
                    .endDate(rs.getDate("enddate"))
                    .schemeshead (new ArrayList<>())
                    .build();
                eventDetailsMap.put(eventName, eventDetails);
            }
            String schemeHeadName = rs.getString("schemeHead");
            SchemeHeadDetails schemeHeadDetails = eventDetails.getSchemeshead().stream()
                    .filter(sh -> sh.getSchemeHead().equals(schemeHeadName))
                    .findFirst()
                    .orElse(null);

            if (schemeHeadDetails == null) {
                schemeHeadDetails = SchemeHeadDetails.builder()
                    .schemeHead(schemeHeadName)
                    .schemeheadDesc(rs.getString("schemeHeadDesc"))
                    .schemeDetails(new ArrayList<>())  // Initialize schemes list
                    .build();
                eventDetails.getSchemeshead().add(schemeHeadDetails);
            }

            Long schemeID = rs.getLong("SchemeID");
            SchemeDetails schemeDetails = schemeHeadDetails.getSchemeDetails().stream()
                    .filter(s -> s.getSchemeID().equals(schemeID))
                    .findFirst()
                    .orElse(null);

            if (schemeDetails == null) {
                schemeDetails = SchemeDetails.builder()
                        .schemeID(schemeID)
                        .schemeDesc(rs.getString("SchemeDescription"))
                        .schemeName(rs.getString("SchemeName"))
                        .criteria(new ArrayList<>())  // Initialize criteria list
                        .build();
                schemeHeadDetails.getSchemeDetails().add(schemeDetails);
            }

            // Add criteria details to the scheme
            CriteriaDetails criteriaDetails = CriteriaDetails.builder()
                .criteriaCondition(rs.getString("criteriacondition"))
                .criteriaType(rs.getString("criteriatype"))
                .criteriaValue(rs.getString("criteriavalue"))
                .build();

            schemeDetails.getCriteria().add(criteriaDetails);
        }
    return new ArrayList<>(eventDetailsMap.values());
}}
