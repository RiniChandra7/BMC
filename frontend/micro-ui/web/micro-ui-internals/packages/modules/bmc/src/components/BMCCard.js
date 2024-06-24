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
          label: t("Individual Search"),
          link: `/${window?.contextPath}/employee/bmc/aadhaarverify`,
  
        },
        {
          label: t("Individual Create"),
          link: `/${window?.contextPath}/employee/bmc/crossverify`,
  
        },
    ],};
    return <EmployeeModuleCard {...propsForModuleCard} />;
  };
  
  export default BMCCard;