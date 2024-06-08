package digit.validators;

import java.util.List;

import org.egov.tracer.model.CustomException;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;

import digit.repository.SchemeApplicationRepository;
import digit.web.models.SchemeApplication;
import digit.web.models.SchemeApplicationRequest;
import digit.web.models.SchemeApplicationSearchCriteria;

@Component
public class SchemeApplicationValidator {

    private final SchemeApplicationRepository repository;

    /**
     * Constructor for SchemeApplicationValidator with repository injection.
     *
     * @param repository The repository to be injected.
     */
    public SchemeApplicationValidator(SchemeApplicationRepository repository) {
        this.repository = repository;
    }

    /**
     * Validates the SchemeApplicationRequest.
     * Checks if the tenantId is present in each SchemeApplication.
     *
     * @param schemeApplicationRequest The request to be validated.
     */
    public void validateSchemeApplication(SchemeApplicationRequest schemeApplicationRequest) {
        schemeApplicationRequest.getSchemeApplications().forEach(application -> {
            if (ObjectUtils.isEmpty(application.getTenantId())) {
                throw new CustomException("BMC_APP_ERR", "tenantId is mandatory for creating scheme applications");
            }
        });
    }

    /**
     * Validates the existence of a SchemeApplication.
     *
     * @param schemeApplication The application to be validated for existence.
     * @return The existing SchemeApplication if found.
     */
    public SchemeApplication validateApplicationExistence(SchemeApplication schemeApplication) {
        List<SchemeApplication> existingApplications = repository.getApplications(
                SchemeApplicationSearchCriteria.builder()
                        .applicationNumber(schemeApplication.getApplicationNumber())
                        .build()
        );

        if (existingApplications.isEmpty()) {
            throw new CustomException("BMC_APP_NOT_FOUND", "No scheme application found with the given application number");
        }

        return existingApplications.get(0);
    }
}