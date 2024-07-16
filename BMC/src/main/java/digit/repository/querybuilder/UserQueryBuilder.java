package digit.repository.querybuilder;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Component;

import digit.repository.UserSearchCriteria;

@Component
public class UserQueryBuilder {
    // for Caste
    private static final String BASE_QUERY = """
       select eu.id as userid, \
        eba.aadharfathername ,eba.aadhardob ,eba.aadharmobile ,eba.gender ,eba.aadharname, \
        ebc."name" as caste ,ebc.id as casteid, \
        ebr."name" as religion ,ebr.id as religionid , \
        ebu4.transgenderid \
    """;

    private static final String QUALIFICATION_QUERY = """
             ,ebq."name" as qualification ,ebu3.percentage ,ebu3.board ,ebu3.year_of_passing \
            """;
    private static final String BANK_QUERY = """
                ,ebb2."name" as bankname, \
            ebb.branchname ,ebb.ifsc ,ebb.micr,ebu.accountnumber  \
               """;

    private static final String DOCUMENT_QUERY = """
            , ebd."name" as documentname,ebu2.available  \
            """;
    private static final String ADDRESS_QUERY = """
            ,  ea.pincode ,ea.housenobldgapt ,ea.subdistrict ,ea.postoffice ,ea.landmark ,ea.country ,ea.streetroadline ,ea.citytownvillage ,ea.arealocalitysector ,ea.district ,ea.state   \
            """;
    private static final String DIVYANG_QUERY = """
            , ebd2."name" as divyangtype,ebu4.divyangpercent ,ebu4.divyangcardid  \
            """;

    private static final String FROM_TABLES = """
            from eg_user eu \
            left join eg_bmc_userbank ebu on ebu.userid = eu.id and ebu.tenantid  = eu.tenantid \
            left join eg_bmc_bankbranch ebb on ebb.id = ebu.bankbranchid \
            left join eg_bmc_bank ebb2 on ebb2.id = ebb.bankid \
            left join eg_bmc_userdocument ebu2 on ebu2.userid  =eu.id and ebu2.tenantid  = eu.tenantid \
            left join eg_bmc_document ebd  on ebd.id = ebu2.documentid \
            left join eg_address ea on ea.userid = eu.id and ea.tenantid  = eu.tenantid \
            left join eg_bmc_userqualification ebu3 on ebu3."userID" =  eu.id \
            left join eg_bmc_qualificationmaster ebq on ebq.id = ebu3."qualificationID" \
            left join eg_bmc_userotherdetails ebu4 on ebu4.userid =  eu.id and ebu4.tenantid  = eu.tenantid \
            left join eg_bmc_aadharuser eba on eba.userid =  eu.id and eba.tenantid  = eu.tenantid \
            left join eg_bmc_caste ebc on ebc.id = ebu4.casteid \
            left join eg_bmc_religion ebr on ebr.id =ebu4.religionid \
            left join eg_bmc_divyang ebd2 on ebd2.id = ebu4.divyangid \
                        """;
    private static final String ORDERBY_NAME = " ORDER BY name DESC ";

    public String getUserSearchQuery(UserSearchCriteria criteria, List<Object> preparedStmtList) {
        StringBuilder query = new StringBuilder(BASE_QUERY);

        switch (criteria.getOption().toLowerCase()) {
            case "full":
                query.append(QUALIFICATION_QUERY);
                query.append(BANK_QUERY);
                query.append(DIVYANG_QUERY);
                query.append(DOCUMENT_QUERY);
                query.append(ADDRESS_QUERY);
                break;
            case "bank":
                query.append(BANK_QUERY);
                break;
            case "address":
                query.append(ADDRESS_QUERY);
                break;
            case "qualification":
                query.append(QUALIFICATION_QUERY);
                break;
            case "divyang":
                query.append(DIVYANG_QUERY);
                break;
            case "document":
                query.append(DOCUMENT_QUERY);
                break;
            default:
                break;
        }
        query.append(FROM_TABLES);
        addClauseIfRequired(query, preparedStmtList);
        query.append(" ebu.userid = ? ");
        preparedStmtList.add(criteria.getUserId());
        addClauseIfRequired(query, preparedStmtList);
        query.append(" ebu.tenantid = ? ");
        preparedStmtList.add(criteria.getTenantId());

       // query.append(ORDERBY_NAME);
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
