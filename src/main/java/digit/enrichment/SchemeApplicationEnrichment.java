package digit.enrichment;

import java.util.List;

import org.egov.common.contract.models.AuditDetails;
import org.egov.common.contract.request.User;
import org.egov.common.contract.user.UserDetailResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import digit.service.UserService;
import digit.util.IdgenUtil;
import digit.util.UserUtil;
import digit.web.models.SchemeApplication;
import digit.web.models.SchemeApplicationRequest;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class SchemeApplicationEnrichment {

    @Autowired
    private IdgenUtil idgenUtil;

    @Autowired
    private UserService userService;

    @Autowired
    private UserUtil userUtils;

    /**
     * Enriches the SchemeApplicationRequest with system-generated values like id, auditDetails, etc.
     *
     * @param schemeApplicationRequest The request to be enriched.
     */
    public void enrichSchemeApplication(SchemeApplicationRequest schemeApplicationRequest) {
        List<String> schemeApplicationIdList = idgenUtil.getIdList(schemeApplicationRequest.getRequestInfo(), schemeApplicationRequest.getSchemeApplications().get(0).getTenantId(), "bmc.schemeapplicationid", "", schemeApplicationRequest.getSchemeApplications().size());
        Integer index = 0;
        for (SchemeApplication application : schemeApplicationRequest.getSchemeApplications()) {
            // Enrich audit details
            AuditDetails auditDetails = AuditDetails.builder().createdBy(schemeApplicationRequest.getRequestInfo().getUserInfo().getUuid()).createdTime(System.currentTimeMillis()).lastModifiedBy(schemeApplicationRequest.getRequestInfo().getUserInfo().getUuid()).lastModifiedTime(System.currentTimeMillis()).build();
            application.setAuditDetails(auditDetails);
            /*Sundeep Removed it as we do not have uuid fields in Address and Application Tables */
            
            /*  Enrich UUID
                application.setId(UUID.randomUUID().toString());
                // Enrich address UUID
                if (application.getAddress() != null) {
                    application.getAddress().setId(UUID.randomUUID().toString());
                }
            */
            // Enrich application number from IDgen
            application.setApplicationNumber(schemeApplicationIdList.get(index++));

       
        }
    }

    /**
     * Enriches the SchemeApplicationRequest with updated audit details upon update.
     *
     * @param schemeApplicationRequest The request to be enriched.
     */
    public void enrichSchemeApplicationUponUpdate(SchemeApplicationRequest schemeApplicationRequest) {
        schemeApplicationRequest.getSchemeApplications().get(0).getAuditDetails().setLastModifiedTime(System.currentTimeMillis());
        schemeApplicationRequest.getSchemeApplications().get(0).getAuditDetails().setLastModifiedBy(schemeApplicationRequest.getRequestInfo().getUserInfo().getUuid());
    }

    /**
     * Enriches the SchemeApplication with user details upon search.
     *
     * @param application The application to be enriched.
     */
    public void enrichUserDetailsOnSearch(SchemeApplication application) {
        UserDetailResponse userResponse = userService.searchUser(userUtils.getStateLevelTenant(application.getTenantId()), application.getUserId(), null);
        User user = userResponse.getUser().get(0);
        log.info(user.toString());
        User enrichedUser = User.builder()
                .mobileNumber(user.getMobileNumber())
                .id(user.getId())
                .name(user.getName())
                .userName((user.getUserName()))
                .type(user.getType())
                .roles(user.getRoles())
                .uuid(user.getUuid()).build();
        application.setUser(enrichedUser);
    }
}
