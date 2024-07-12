package digit.repository.querybuilder;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;

import digit.web.models.SchemeApplicationSearchCriteria;

@Component
public class VerifierQueryBuilder {



     private static final String BASE_QUERY = """
            SELECT ebu.applicationnumber, eba.aadharname, eba.gender,
            ebc."name" as caste, ebr."name" as religion
            """;

    private static final String FROM_TABLES = """
            FROM public.eg_bmc_userschemeapplication ebu
            LEFT JOIN public.eg_bmc_aadharuser eba ON ebu.userid = eba.userid AND ebu.tenantid = eba.tenantid
            LEFT JOIN public.eg_bmc_schememachine ebs ON ebu.optedid = ebs.schemeid
            LEFT JOIN public.eg_bmc_schemecourse ebs2 ON ebu.optedid = ebs2.schemeid
            LEFT JOIN public.eg_bmc_userotherdetails ebu2 ON ebu.userid = ebu2.userid AND ebu.tenantid = ebu2.tenantid
            LEFT JOIN public.eg_bmc_caste ebc ON ebu2.casteid = ebc.id
            LEFT JOIN public.eg_bmc_religion ebr ON ebu2.religionid = ebr.id
            """;
    

   
    public String getVerificationSearchQuery(SchemeApplicationSearchCriteria criteria, List<Object> preparedStmtList) {
        StringBuilder query = new StringBuilder(BASE_QUERY);
        query.append(FROM_TABLES);
    

        if(!ObjectUtils.isEmpty(criteria.getCourseId())) {
            addClauseIfRequired(query, preparedStmtList);
            query.append("ebs2.courseId = ?");
            preparedStmtList.add(criteria.getCourseId());
        }
        if (!ObjectUtils.isEmpty(criteria.getMachineId())) {
            addClauseIfRequired(query, preparedStmtList);
            query.append(" ebs.machineid = ? ");
            preparedStmtList.add(criteria.getMachineId());
        }
        if (!ObjectUtils.isEmpty(criteria.getSchemeId())) {
            addClauseIfRequired(query, preparedStmtList);
            query.append(" ebs.schemeid = ? ");
            preparedStmtList.add(criteria.getSchemeId());
        }
        addClauseIfRequired(query, preparedStmtList);
        query.append(" ebu.verificationstatus != true");
        query.append(" GROUP BY ebu.applicationnumber, eba.aadharname, eba.gender, ebc.\"name\", ebr.\"name\"");

        return query.toString();
    }

    /**
     * Adds a clause to the query if required based on the state of the prepared statement list.
     *
     * @param query The query string builder.
     * @param preparedStmtList The list of parameters for the prepared statement.
     */
    private void addClauseIfRequired(StringBuilder query, List<Object> preparedStmtList) {
        if (preparedStmtList.isEmpty()) {
            query.append(" WHERE ");
        } else {
            query.append(" AND ");
        }
    }

}
