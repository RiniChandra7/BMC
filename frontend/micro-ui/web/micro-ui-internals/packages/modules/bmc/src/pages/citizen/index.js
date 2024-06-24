import React from "react";

import { AppContainer, BackButton, PrivateRoute } from "@egovernments/digit-ui-react-components";
import { Switch, useLocation, useRouteMatch } from "react-router-dom";

import { useTranslation } from "react-i18next";

const App = () => {
  const { t } = useTranslation();
  const { path, url, ...match } = useRouteMatch();
  const location = useLocation();

  const BMCHome = Digit?.ComponentRegistryService?.getComponent("BMCCitizenHome");
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
  const courseWiseApplication = Digit.ComponentRegistryService?.getComponent("courseWiseApplication");
  const wardWiseApplication = Digit.ComponentRegistryService?.getComponent("wardWiseApplication");
  const schemeWiseApplication = Digit.ComponentRegistryService?.getComponent("schemeWiseApplication");


  return (
    <React.Fragment>
      <div className="bmc-citizen-wrapper" style={{ width: "100%" }}>
        {!location.pathname.includes("/response") && <BackButton>{t("CS_COMMON_BACK")}</BackButton>}
        <Switch>
          <AppContainer>
            <PrivateRoute path={`${path}/home`} component={BMCHome} />
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
