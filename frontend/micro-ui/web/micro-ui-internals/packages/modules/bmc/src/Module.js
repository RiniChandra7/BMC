import { AppContainer, CitizenHomeCard, Loader } from "@egovernments/digit-ui-react-components";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Switch, useRouteMatch } from "react-router-dom";



//Citizen Pages
import AadhaarVerification from "./pagecomponents/aadhaarVerification";
import AadhaarFullForm from "./pagecomponents/aadhaarfullformpge";
import ApplicationDetail from "./pagecomponents/applicationDetail";
import BMCReviewPage from "./pagecomponents/bmcReview";
import BMCCitizenHome from "./pagecomponents/citizenhome";
import SelectSchemePage from "./pagecomponents/selectScheme";

//Employee Pages
import BMCCard from "./components/BMCCard";
import BMCEmployeeHome from "./pages/employee";
import ApprovePage from "./pages/employee/Approve";
import AadhaarEmployeePage from "./pages/employee/aadhaarEmployee";
import AadhaarSatutsVerificationPage from "./pages/employee/aadhaarSatutsVerification";
import AadhaarVerifyPage from "./pages/employee/aadhaarVerify";
import CrossVerifyPage from "./pages/employee/crossVerify";
import RandmizationPage from "./pages/employee/randmization";

//Master Pages
import {
  bankMasterPage,
  casteCategoryMasterPage,
  courseMasterPage,
  courseWiseApplication,
  electoralMasterPage,
  qualificationMasterPage,
  religionMasterPage,
  schemeWiseApplication,
  sectorMasterPage,
  wardMasterPage,
  wardWiseApplication,
} from "./pages/master/aadhaarMaster";


import getRootReducer from "./redux/reducers";


export const BMCModule = ({ stateCode, userType, tenants }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const language = Digit.StoreData.getCurrentLanguage();
  const { path, url } = useRouteMatch();
  const moduleCode = ["BMC"];
  const { isLoading, data: store } = Digit.Services.useStore({
    stateCode,
    moduleCode,
    language,
  });
  Digit.SessionStorage.set("BMC_TENANTS", tenants);

  if (isLoading) {
    return <Loader />;
  }
  if (userType === "citizen") {
    return (<Switch>
      <AppContainer className="ground-container">
        <BMCCitizenHome path={path} stateCode={stateCode} />
      </AppContainer>
    </Switch>);
  }
  return (<Switch>
    <AppContainer className="ground-container">
      <BMCEmployeeHome path={path} stateCode={stateCode} />
    </AppContainer>
  </Switch>);
};

export const BMCLinks = ({ matchPath }) => {
  const { t } = useTranslation();
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage(BMC_CITIZEN_CREATE_COMPLAINT, {});

  useEffect(() => {
    clearParams();
  }, []);

  const links = [
    {
      link: `${matchPath}/create`,
      i18nKey: t("CS_CREATE"),
    },
  ];

  return <CitizenHomeCard header={t("CS_COMMON_HOME_COMPLAINTS")} links={links} />;
};

const componentsToRegister = {
  BMCCitizenHome,
  BMCEmployeeHome,
  BMCModule,
  BMCLinks,
  ApplicationDetail,
  AadhaarVerification,
  AadhaarFullForm,
  SelectSchemePage,
  BMCReviewPage,
  wardMasterPage,
  electoralMasterPage,
  religionMasterPage,
  casteCategoryMasterPage,
  bankMasterPage,
  qualificationMasterPage,
  sectorMasterPage,
  courseMasterPage,
  AadhaarSatutsVerificationPage,
  AadhaarEmployeePage,
  RandmizationPage,
  wardWiseApplication,
  schemeWiseApplication,
  courseWiseApplication,
  AadhaarVerifyPage,
  CrossVerifyPage,
  ApprovePage,
  BMCCard
};

export const initBMCComponents = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};

// export const initSampleComponents = () => {
//   overrideHooks();
//   updateCustomConfigs();
//   Object.entries(componentsToRegister).forEach(([key, value]) => {
//     Digit.ComponentRegistryService.setComponent(key, value);
//   });
// };

export const BMCReducers = getRootReducer;