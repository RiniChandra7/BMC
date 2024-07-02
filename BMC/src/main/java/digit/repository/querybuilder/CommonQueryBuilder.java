package digit.repository.querybuilder;

import java.util.List;

import org.springframework.stereotype.Component;

import digit.repository.CommonSearchCriteria;

@Component
public class CommonQueryBuilder {
    // for Caste
    private static final String BASE_QUERY = """
            SELECT id , name FROM /
            """;

    private static final String ORDERBY_NAME = " ORDER BY name DESC ";

    public String getSchemeSearchQuery(CommonSearchCriteria criteria, List<Object> preparedStmtList) {
        StringBuilder query = new StringBuilder(BASE_QUERY);
        switch (criteria.getOption().toLowerCase()) {
            case "caste":
                query.append("eg_bmc_Caste");
                break;
            case "religion":
                query.append("eg_bmc_Religion");
                break;
            default:
                query.append("Select 'No query found' as Reply");
                break;
        }
        query.append(ORDERBY_NAME);
        preparedStmtList.add(criteria.getOption());
        return query.toString();
    }

    private void addClauseIfRequired(StringBuilder query, List<Object> preparedStmtList) {
        if (preparedStmtList.isEmpty()) {
            query.append(" WHERE ");
        } else {
            query.append(" AND ");
        }
    }

}
