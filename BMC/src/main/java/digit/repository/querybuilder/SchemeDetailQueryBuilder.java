package digit.repository.querybuilder;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;

import digit.repository.SchemeSearchCriteria;;

@Component
public class SchemeDetailQueryBuilder {
    // Conditions

    private static final String BASE_QUERY = """
            Select \
            ev.name as EventName, \
            to_timestamp(ev.startdt)::date as startDate, \
            to_timestamp(coalesce(ev.enddt,4102444799))::date as endDate, \
            sch.id as SchemeID, \
            sch.name as SchemeName, \
            sch.description as SchemeDescription \
            """;
    // From clause with join between Event, EventScheme, and Scheme tables
    private static final String FROM_TABLES = """
            from eg_bmc_event ev \
            left join eg_bmc_schemeevent schev on schev.eventid = ev.id \
            left join eg_bmc_schemes sch on sch.id = schev.schemeid \
            """;
    private static final String ORDERBY_MODIFIEDTIME = " ORDER BY sch.ModifiedOn DESC ";

    public String getSchemeSearchQuery(SchemeSearchCriteria criteria, List<Object> preparedStmtList) {
        StringBuilder query = new StringBuilder(BASE_QUERY);
        query.append(FROM_TABLES);

        // Add where clause for Status if it is not empty
        if (!ObjectUtils.isEmpty(criteria.getStatus())) {
            addClauseIfRequired(query, preparedStmtList);
            switch (criteria.getStatus()) {
                case PAST:
                    query.append(" to_timestamp(ev.enddt)::date < current_date ");
                    addClauseIfRequired(query, preparedStmtList);
                    break;
                case FUTURE:
                    query.append(" to_timestamp(ev.startdt)::date > current_date ");
                    addClauseIfRequired(query, preparedStmtList);
                    break;
                case PRESENT:
                    query.append(
                            " to_timestamp(ev.startdt)::date <= current_date and to_timestamp(coalesce(ev.enddt,4102444799))::date >= current_date ");
                    addClauseIfRequired(query, preparedStmtList);
                    break;
                default:
                    if (!ObjectUtils.isEmpty(criteria.getStartDate())) {
                        addClauseIfRequired(query, preparedStmtList);
                        query.append(" to_timestamp(ev.startdt)::date <= Cast(? as date) ");
                        preparedStmtList.add(criteria.getStartDate());
                    }
                    if (!ObjectUtils.isEmpty(criteria.getEndDate())) {
                        addClauseIfRequired(query, preparedStmtList);
                        query.append(" to_timestamp(coalesce(ev.enddt,4102444799))::date >= Cast(? as date) ");
                        preparedStmtList.add(criteria.getEndDate());
                    }
                    break;
            }
        }

        if (!ObjectUtils.isEmpty(criteria.getId())) {
            addClauseIfRequired(query, preparedStmtList);
            query.append(" sch.id = ? ");
            preparedStmtList.add(criteria.getId());
        }

        query.append(ORDERBY_MODIFIEDTIME);
        return query.toString();
    }

    private void addClauseIfRequired(StringBuilder query, List<Object> preparedStmtList) {
        if (preparedStmtList.isEmpty()) {
            query.append(" WHERE ");
        } else {
            query.append(" AND ");
        }
    }

    private String createQuery(List<String> ids) {
        StringBuilder builder = new StringBuilder();
        int length = ids.size();
        for (int i = 0; i < length; i++) {
            builder.append(" ?");
            if (i != length - 1)
                builder.append(",");
        }
        return builder.toString();
    }

    /**
     * Adds the given list of IDs to the prepared statement list.
     *
     * @param preparedStmtList The list of parameters for the prepared statement.
     * @param ids              The list of IDs to be added.
     */
    private void addToPreparedStatement(List<Object> preparedStmtList, List<String> ids) {
        ids.forEach(preparedStmtList::add);
    }

}
