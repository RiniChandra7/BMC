package digit.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.egov.common.contract.request.RequestInfo;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import digit.enrichment.SchemeApplicationEnrichment;
import digit.kafka.Producer;
import digit.repository.SchemeApplicationRepository;
import digit.validators.SchemeApplicationValidator;
import digit.web.models.SchemeApplication;
import digit.web.models.SchemeApplicationRequest;
import digit.web.models.SchemeApplicationSearchCriteria;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class BmcApplicationService {

    private final SchemeApplicationValidator validator;
    private final SchemeApplicationEnrichment enrichmentUtil;
    private final UserService userService;
    private final WorkflowService workflowService;
    private final SchemeApplicationRepository schemeApplicationRepository;
    private final Producer producer;

    public BmcApplicationService(
            SchemeApplicationValidator validator,
            SchemeApplicationEnrichment enrichmentUtil,
            UserService userService,
            WorkflowService workflowService,
            SchemeApplicationRepository schemeApplicationRepository,
            Producer producer) {
        this.validator = validator;
        this.enrichmentUtil = enrichmentUtil;
        this.userService = userService;
        this.workflowService = workflowService;
        this.schemeApplicationRepository = schemeApplicationRepository;
        this.producer = producer;
    }

    public List<SchemeApplication> registerSchemeApplication(SchemeApplicationRequest schemeApplicationRequest) {
        // Validate applications
        validator.validateSchemeApplication(schemeApplicationRequest);

        // Enrich applications
        enrichmentUtil.enrichSchemeApplication(schemeApplicationRequest);

        // Enrich/Upsert user details upon scheme application
        userService.callUserService(schemeApplicationRequest);

        // Initiate workflow for the new application
        workflowService.updateWorkflowStatus(schemeApplicationRequest);

        // Push the application to the topic for persister to listen and persist
        producer.push("save-scheme-application", schemeApplicationRequest);

        // Return the response back to user
        return schemeApplicationRequest.getSchemeApplications();
    }

    public List<SchemeApplication> searchSchemeApplications(RequestInfo requestInfo, SchemeApplicationSearchCriteria schemeApplicationSearchCriteria) {
        // Fetch applications from database according to the given search criteria
        List<SchemeApplication> applications = schemeApplicationRepository.getApplications(schemeApplicationSearchCriteria);

        // If no applications are found matching the given criteria, return an empty list
        if (CollectionUtils.isEmpty(applications))
            return new ArrayList<>();

        // Enrich user details of applicant objects
        applications.forEach(enrichmentUtil::enrichUserDetailsOnSearch);

        // Otherwise return the found applications
        return applications;
    }

    public SchemeApplication updateSchemeApplication(SchemeApplicationRequest schemeApplicationRequest) {
        // Validate whether the application that is being requested for update indeed exists
        SchemeApplication existingApplication = validator.validateApplicationExistence(schemeApplicationRequest.getSchemeApplications().get(0));
        existingApplication.setWorkflow(schemeApplicationRequest.getSchemeApplications().get(0).getWorkflow());
        log.info(existingApplication.toString());
        schemeApplicationRequest.setSchemeApplications(Collections.singletonList(existingApplication));

        // Enrich application upon update
        enrichmentUtil.enrichSchemeApplicationUponUpdate(schemeApplicationRequest);

        workflowService.updateWorkflowStatus(schemeApplicationRequest);

        // Just like create request, update request will be handled asynchronously by the persister
        producer.push("update-scheme-application", schemeApplicationRequest);

        return schemeApplicationRequest.getSchemeApplications().get(0);
    }
}
