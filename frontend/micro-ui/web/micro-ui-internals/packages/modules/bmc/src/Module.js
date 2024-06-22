import { CitizenHomeCard } from "@egovernments/digit-ui-react-components";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouteMatch } from "react-router-dom";
import AadhaarVerification from "./pagecomponents/aadhaarVerification";
import AadhaarFullForm from "./pagecomponents/aadhaarfullformpge";
import BMCReviewPage from "./pagecomponents/bmcReview";
import OwnerDetailFull from "./pagecomponents/ownerDetails";
import SelectSchemePage from "./pagecomponents/selectScheme";
import CitizenApp from "./pages/citizen";
import Create from "./pages/citizen/create";
import ApprovePage from "./pages/employee/Approve";
import AadhaarEmployeePage from "./pages/employee/aadhaarEmployee";
import AadhaarSatutsVerificationPage from "./pages/employee/aadhaarSatutsVerification";
import AadhaarVerifyPage from "./pages/employee/aadhaarVerify";
import CrossVerifyPage from "./pages/employee/crossVerify";
import RandmizationPage from "./pages/employee/randmization";
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

export const BMCReducers = getRootReducer;

const BMCModule = ({ stateCode, userType, tenants }) => {
  const { path, url } = useRouteMatch();
  const moduleCode = "BMC";
  const language = Digit.StoreData.getCurrentLanguage();
  const { isLoading, data: store } = Digit.Services.useStore({ stateCode, moduleCode, language });

  // if (userType === "citizen") {
  //   return <CitizenApp path={path} stateCode={stateCode} />;
  // }

  // return <EmployeeApp path={path} stateCode={stateCode} />;
  Digit.SessionStorage.set("BMC_TENANTS", tenants);

  return <CitizenApp />;
};

const BMCLinks = ({ matchPath }) => {
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
  BMCCreate: Create,
  BMCModule,
  BMCLinks,
  OwnerDetailFull,
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
};

export const initBMCComponents = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};
