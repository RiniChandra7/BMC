import React from "react";

import { useRouteMatch, Switch, useLocation } from "react-router-dom";
import { AppContainer, BackButton, PrivateRoute } from "@upyog/digit-ui-react-components";

import { useTranslation } from "react-i18next";

const App = () => {
  const { t } = useTranslation();
  const { path, url, ...match } = useRouteMatch();
  const location = useLocation();

  const CreateComplaint = Digit?.ComponentRegistryService?.getComponent("BMCCreate");
  const CreareOwnerDetails = Digit?.ComponentRegistryService?.getComponent("OwnerDetailFull");
  const Aadhar = Digit?.ComponentRegistryService?.getComponent("AadhaarVerification");
  const AadhaarFullForm = Digit?.ComponentRegistryService?.getComponent("AadhaarFullForm");
  const SelectSchemePage = Digit?.ComponentRegistryService?.getComponent("SelectSchemePage");
  const BMCReviewPage = Digit?.ComponentRegistryService?.getComponent("BMCReviewPage");
  // const AadhaarSatutsVerificationPage = Digit?.ComponentRegistryService?.getComponent("AadhaarSatutsVerificationPage");
  const AadhaarEmployeePage = Digit?.ComponentRegistryService?.getComponent("AadhaarEmployeePage");
  const RandmizationPage = Digit.ComponentRegistryService?.getComponent("RandmizationPage");
  const CrossVerifyPage = Digit.ComponentRegistryService?.getComponent("CrossVerifyPage");
  const AadhaarVerifyPage = Digit.ComponentRegistryService?.getComponent("AadhaarVerifyPage");
  const ApprovePage = Digit.ComponentRegistryService?.getComponent("ApprovePage");
  const wardMasterPage = Digit.ComponentRegistryService?.getComponent("wardMasterPage");
  const electoralMasterPage = Digit.ComponentRegistryService?.getComponent("electoralMasterPage");
  const religionMasterPage = Digit.ComponentRegistryService?.getComponent("religionMasterPage");
  const casteCategoryMasterPage = Digit.ComponentRegistryService?.getComponent("casteCategoryMasterPage");
  const bankMasterPage = Digit.ComponentRegistryService?.getComponent("bankMasterPage");
  const qualificationMasterPage = Digit.ComponentRegistryService?.getComponent("qualificationMasterPage");
  const sectorMasterPage = Digit.ComponentRegistryService?.getComponent("sectorMasterPage");
  const courseMasterPage = Digit.ComponentRegistryService?.getComponent("courseMasterPage");
  const courseWiseApplication = Digit.ComponentRegistryService?.getComponent("courseWiseApplication");
  const wardWiseApplication = Digit.ComponentRegistryService?.getComponent("wardWiseApplication");
  const schemeWiseApplication = Digit.ComponentRegistryService?.getComponent("schemeWiseApplication");


  return (
    <React.Fragment>
      <div className="bmc-citizen-wrapper" style={{ width: "100%" }}>
        {!location.pathname.includes("/response") && <BackButton>{t("CS_COMMON_BACK")}</BackButton>}
        <Switch>
          <AppContainer>
            {/* <PrivateRoute path={`${path}/anc`} component={CreateComplaint} /> */}
            <PrivateRoute exact path={`${path}/ownerdetails`} component={CreareOwnerDetails} />
            <PrivateRoute exact path={`${path}/aadhaarLogin`} component={Aadhar} />
            <PrivateRoute exact path={`${path}/aadhaarForm`} component={AadhaarFullForm} />
            <PrivateRoute exact path={`${path}/selectScheme`} component={SelectSchemePage} />
            <PrivateRoute exact path={`${path}/review`} component={BMCReviewPage} />
            {/* <PrivateRoute exact path={`${path}/aadhaarSatutsVerificationPage`} component={AadhaarSatutsVerificationPage} /> */}
            <PrivateRoute exact path={`${path}/aadhaarVerify`} component={AadhaarVerifyPage} />
            <PrivateRoute exact path={`${path}/aadhaarEmployee`} component={AadhaarEmployeePage} />
            <PrivateRoute exact path={`${path}/randmization`} component={RandmizationPage} />
            <PrivateRoute exact path={`${path}/crossverify`} component={CrossVerifyPage} />
            <PrivateRoute exact path={`${path}/approve`} component={ApprovePage} />
            <PrivateRoute exact path={`${path}/wardmaster`} component={wardMasterPage} />
            <PrivateRoute exact path={`${path}/electoralmaster`} component={electoralMasterPage} />
            <PrivateRoute exact path={`${path}/religionmaster`} component={religionMasterPage} />
            <PrivateRoute exact path={`${path}/castecategory`} component={casteCategoryMasterPage} />
            <PrivateRoute exact path={`${path}/bankmaster`} component={bankMasterPage} />
            <PrivateRoute exact path={`${path}/sectormaster`} component={sectorMasterPage} />
            <PrivateRoute exact path={`${path}/qualificationmaster`} component={qualificationMasterPage} />
            <PrivateRoute exact path={`${path}/coursemaster`} component={courseMasterPage} />
            <PrivateRoute exact path={`${path}/wardwiseapplication`} component={wardWiseApplication} />
            <PrivateRoute exact path={`${path}/schemewiseapplication`} component={schemeWiseApplication} />
            <PrivateRoute exact path={`${path}/coursewiseapplication`} component={courseWiseApplication} />
          </AppContainer>
        </Switch>
      </div>
    </React.Fragment>
  );
};

export default App;
