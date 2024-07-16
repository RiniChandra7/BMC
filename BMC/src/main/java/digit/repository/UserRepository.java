package digit.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import digit.repository.querybuilder.CommonQueryBuilder;
import digit.repository.querybuilder.UserQueryBuilder;
import digit.repository.rowmapper.BankDetailsRowMapper;
import digit.repository.rowmapper.CommonRowMapper;
import digit.repository.rowmapper.UserDetailRowMapper;
import digit.web.models.BankDetails;
import digit.web.models.common.CommonDetails;
import digit.web.models.scheme.UserBankDetails;
import digit.web.models.user.UserDetails;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Repository
public class UserRepository {

    @Autowired
    private UserQueryBuilder queryBuilder;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private UserDetailRowMapper rowMapper;

    public List<UserDetails>getUserDetails(UserSearchCriteria searchCriteria){
        List<Object> preparedStmtList = new ArrayList<>();
        String query = queryBuilder.getUserSearchQuery(searchCriteria, preparedStmtList);
        log.info("Final query: " + query);
        return jdbcTemplate.query(query, rowMapper, preparedStmtList.toArray());
    }

}
