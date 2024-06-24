// import PaymentDetails from "./PaymentDetails";
//import SearchApp from "./SearchApp";
import { AppContainer, BackButton, PrivateRoute } from "@egovernments/digit-ui-react-components";
import { React, Switch } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useRouteMatch } from "react-router-dom";


const App = () => {
  const { t } = useTranslation();
  const { path, url, ...match } = useRouteMatch();
  const location = useLocation();

  const BMCEmployeeHome = Digit?.ComponentRegistryService?.getComponent("BMCEmployeeHome");
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
            <PrivateRoute path={`${path}/home`} component={BMCEmployeeHome} />
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


// const App = ({ path, url, userType }) => {
//   const { t } = useTranslation();
//   const location = useLocation();
//   //const mobileView = innerWidth <= 640;
//   sessionStorage.removeItem("revalidateddone");
//   const isMobile = window.Digit.Utils.browser.isMobile();
//   console.log(path);
//   console.log(userType);
//   console.log(isMobile);

//   // const inboxInitialState = {
//   //   searchParams: {
//   //     uuid: { code: "ASSIGNED_TO_ALL", name: "ES_INBOX_ASSIGNED_TO_ALL" },
//   //     services: ["bmc"],
//   //     applicationStatus: [],
//   //     locality: [],

//   //   },
//   // };

//   const BMCBreadCrumbs = ({ location }) => {
//     const { t } = useTranslation();
//     const search = useLocation().search;
//     const fromScreen = new URLSearchParams(search).get("from") || null;
//     const { from : fromScreen2 } = Digit.Hooks.useQueryParams();
//     const crumbs = [
//       {
//         path: "/digit-ui/employee",
//         content: t("ES_COMMON_HOME"),
//         show: true,
//       },
//       {
//         path: "/digit-ui/employee/bmc/welfare/inbox",
//         content: t("ES_TITLE_INBOX"),
//         show: location.pathname.includes("/bmc/welfare/inbox") ? true : false,
//       },
//       {
//         path: "/digit-ui/employee/bmc/welfare/randmization",
//         content: t("ES_COMMON_APPLICATION_SEARCH"),
//         show: location.pathname.includes("/bmc/welfare/randmization") || location.pathname.includes("/bmc/applicationsearch/application-details/") ? true : false,
//       }
//     ];
//     return <BreadCrumb style={isMobile?{display:"flex"}:{}}  spanStyle={{maxWidth:"min-content"}} crumbs={crumbs} />;
//   }

//   return (
//     <Switch>
//       <React.Fragment>
//         <div>"Hello"</div>
//       </React.Fragment>
//     </Switch>
//   );
//   // const NewApplication = Digit?.ComponentRegistryService?.getComponent("PTRNewApplication");
//   // const ApplicationDetails = Digit?.ComponentRegistryService?.getComponent("ApplicationDetails");

//   // const EditApplication = Digit?.ComponentRegistryService?.getComponent("PTEditApplication");
//   // const Response = Digit?.ComponentRegistryService?.getComponent("PTRResponse");
//   // const DocsRequired = Digit?.ComponentRegistryService?.getComponent("PTRDocsRequired");
//   // const isRes = window.location.href.includes("ptr/response");
//   // const isNewRegistration = window.location.href.includes("new-application") || window.location.href.includes("modify-application") || window.location.href.includes("ptr/application-details");
//   // return (
//   //   <Switch>
//   //     <React.Fragment>
//   //       <div className="ground-container">
          
//   //         {!isRes ? <div style={isNewRegistration ? {marginLeft: "12px" } : {marginLeft:"-4px"}}><BMCBreadCrumbs location={location} /></div> : null}
//   //         <PrivateRoute exact path={`${path}/`} component={() => <BMCLinks matchPath={path} userType={userType} />} />
//   //         <PrivateRoute
//   //           path={`${path}/petservice/inbox`}
//   //           component={() => (
//   //             <Inbox
//   //               useNewInboxAPI={true}
//   //               parentRoute={path}
//   //               businessService="ptr"
//   //               filterComponent="PT_INBOX_FILTER"
//   //               initialStates={inboxInitialState}
//   //               isInbox={true}
//   //             />
//   //           )}
//   //         />
//   //         <PrivateRoute path={`${path}/petservice/new-application`} component={() => <NewApplication parentUrl={url} />} />
//   //         <PrivateRoute path={`${path}/petservice/application-details/:id`} component={() => <ApplicationDetails parentRoute={path} />} />
//   //         <PrivateRoute path={`${path}/petservice/applicationsearch/application-details/:id`} component={() => <ApplicationDetails parentRoute={path} />} />
//   //         <PrivateRoute path={`${path}/petservice/response`} component={(props) => <Response {...props} parentRoute={path} />} />
//   //         {/* <PrivateRoute path={`${path}/petservice/search`} component={(props) => <Search {...props} t={t} parentRoute={path} />} /> */}
//   //         <PrivateRoute
//   //           path={`${path}/searchold`}
//   //           component={() => (
//   //             <Inbox
//   //               parentRoute={path}
//   //               businessService="bmc"
//   //               // middlewareSearch={searchMW}
//   //               initialStates={inboxInitialState}
//   //               isInbox={false}
//   //               EmptyResultInboxComp={"PTEmptyResultInbox"}
//   //             />
//   //           )}
//   //         />
//   //         {/* <PrivateRoute path={`${path}/petservice/my-applications`} component={(props) => <SearchApp {...props} parentRoute={path} />} /> */}
//   //       </div>
//   //     </React.Fragment>
//   //   </Switch>
//   // );
// };

// export default App;




