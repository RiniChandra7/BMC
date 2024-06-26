import { EmployeeModuleCard, Person } from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";

const BMCCard = () => {
 
    const { t } = useTranslation();
  
    const propsForModuleCard = {
      Icon: <Person />,
      moduleName: t("BMC"),
      kpis: [
  
      ],
      links: [
        {
          label: t("Verify Applications"),
          link: `/${window?.contextPath}/employee/bmc/aadhaarverify`,
  
        }
        ,
        {
          label: t("Randomize Applications"),
          link: `/${window?.contextPath}/employee/bmc/randmization`,
  
        },
        {
          label: t("Cross Verify Randomized Applications"),
          link: `/${window?.contextPath}/employee/bmc/crossverify`,
  
        },
        {
          label: t("Approve Crossed Verified Applications"),
          link: `/${window?.contextPath}/employee/bmc/approve`,
  
        },
    ],};
    return <EmployeeModuleCard {...propsForModuleCard} />;
  };
  
  export default BMCCard;