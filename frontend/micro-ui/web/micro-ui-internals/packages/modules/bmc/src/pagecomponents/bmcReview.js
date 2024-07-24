import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import AddressDetailCard from "../components/AddressDetails";
import BankDetails from "../components/BankDetails";
import DisabilityCard from "../components/DisabilityCard";
import PersonalDetailCard from "../components/PersonalDetails";
import QualificationCard from "../components/QualificationCard";
import WorkflowActions from "../components/Workflow";
import Timeline from "../components/bmcTimeline";
import Title from "../components/title";

const BMCReviewPage = ({ }) => {
  const { t } = useTranslation();
  const userDetails = Digit.UserService.getUser();
  const tenantId = Digit.ULBService.getCurrentTenantId();

  const [userDetail, setUserDetail] = useState({});
  const userFunction = (data) => {
    if (data && data.UserDetails && data.UserDetails.length > 0) {
      setUserDetail(data.UserDetails[0]);
    }
  };
  const getUserDetails = { UserSearchCriteria: { Option: "full", TenantID: tenantId, UserID: userDetails?.info?.id } };
  Digit.Hooks.bmc.useUsersDetails(getUserDetails, { select: userFunction });
  
  const handleCallback = useCallback((data) => {
    console.log(data);
  }, []);
  return (
    <React.Fragment>
      <div className="bmc-card-full">
        {window.location.href.includes("/citizen") ? <Timeline currentStep={2} /> : null}
        <Title text={"Review Application"} />
        <PersonalDetailCard onUpdate={handleCallback} initialRows={userDetail} tenantId={tenantId} AllowEdit={false} />
        <AddressDetailCard onUpdate={handleCallback} initialRows={userDetail.address} tenantId={tenantId} AllowEdit={false} />
        <QualificationCard
          initialRows={userDetail.qualificationDetails}
          tenantId={tenantId}
          AddOption={false}
          AllowRemove={false}
          onUpdate={handleCallback}
        />
        <BankDetails onUpdate={handleCallback} initialRows={userDetail.bankDetail} tenantId={tenantId} AddOption={false} AllowRemove={false} />
        <DisabilityCard onUpdate={handleCallback} initialRows={userDetail.divyang} tenantId={tenantId} AllowEdit={false} />
        <WorkflowActions
          ActionBarStyle={{}}
          MenuStyle={{}}
          businessService={"bmc-schemes"}
          applicationNo={"MH-0003"}
          moduleCode={"BMC"}
          tenantId={tenantId}
        />
      </div>
    </React.Fragment>
  );
};
export default BMCReviewPage;
