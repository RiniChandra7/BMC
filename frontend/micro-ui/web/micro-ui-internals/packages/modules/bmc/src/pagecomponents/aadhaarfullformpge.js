import { CardLabel, LabelFieldPair } from "@egovernments/digit-ui-react-components";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import AddressDetailCard from "../components/AddressDetails";
import Timeline from "../components/bmcTimeline";
import DisabilityCard from "../components/DisabilityCard";
import PersonalDetailCard from "../components/PersonalDetails";
import QualificationCard from "../components/QualificationCard";
import RadioButton from "../components/radiobutton";
import Title from "../components/title";
import addhardata from "./aadhaarData.json";
import dropdownOptions from "./dropdownOptions.json";
import BankDetails from "../components/BankDetails";

const AadhaarFullFormPage = (_props) => {
  const { formData, config } = _props;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState(formData?.disableType);
  const history = useHistory();
  const [selectedOptionCard, setSelectedOptionCard] = useState("No");
  const goNext = () => {
    if (selectedOption.value === "Yes") {
      history.push("/digit-ui/citizen/bmc/selectScheme", { selectedOption: "Yes" });
    } else if (selectedOption.value === "No") {
      history.push("/digit-ui/citizen/bmc/selectScheme", { selectedOption: "NO" });
    }
  };

  function disableType(value) {
    setSelectedOption(value);
    setSelectedOptionCard(value);
  }

  const handleQualificationsUpdate = (updatedQualifications) => {
    //setQualifications(updatedQualifications);
    console.log(updatedQualifications);
  };
  const handlePersonalDetailUpdate = (updatedPersonalDetails) => {
    //setQualifications(updatedQualifications);
    console.log(updatedPersonalDetails);
  };
  const handleDisabilityUpdate = (updatedDisability) => {
    //setQualifications(updatedQualifications);
    console.log(updatedDisability);
  };
  const handleAddressUpdate = (updatedAddress) => {
    //setQualifications(updatedQualifications);
    console.log(updatedAddress);
  };
  return (
    <React.Fragment>
      <div className="bmc-card-full">
        {window.location.href.includes("/citizen") ? <Timeline currentStep={2} /> : null}
        <Title text={"Applicant Details"} />
        <PersonalDetailCard
          onUpdate={handlePersonalDetailUpdate}
          initialRows={addhardata.aadhaarInfo}
          tenantId={tenantId}
          AllowEdit={true}
        ></PersonalDetailCard>
        <AddressDetailCard
          onUpdate={handleAddressUpdate}
          initialRows={addhardata.aadhaarInfo}
          tenantId={tenantId}
          AllowEdit={true}
        ></AddressDetailCard>
        <QualificationCard
          onUpdate={handleQualificationsUpdate}
          initialRows={dropdownOptions.education}
          tenantId={tenantId}
          AddOption={true}
          AllowRemove={true}
        ></QualificationCard>
        <BankDetails initialRows={dropdownOptions.education} tenantId={tenantId} AddOption={true} AllowRemove={true} />

        <div className="bmc-card-row">
          <div className="bmc-col1-card" style={{ paddingLeft: "2.5rem" }}>
            <LabelFieldPair t={t} config={config} isMandatory={true} isMultipleAllow={true}>
              <CardLabel className="bmc-label">{t("BMC_Any_Disability")}</CardLabel>
            </LabelFieldPair>
          </div>
          <div className="bmc-col1-card">
            <RadioButton
              isMandatory={true}
              t={t}
              defaultValue={selectedOption}
              optionsKey={"value"}
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
              selectedOption={selectedOption}
              style={{ display: "flex", flexDirection: "row", gap: "1rem" }}
              onSelect={disableType}
            />
          </div>
        </div>

        {selectedOptionCard.value === "Yes" && (
          <DisabilityCard onUpdate={handleDisabilityUpdate} initialRows={[]} tenantId={tenantId} AllowEdit={true}></DisabilityCard>
        )}

        <div className="bmc-card-row" style={{ textAlign: "end" }}>
          <button
            className="bmc-card-button"
            onClick={goNext}
            style={{ borderBottom: "3px solid black", backgroundColor: selectedOption ? "#F47738" : "gray", marginRight: "1rem" }}
            disabled={!selectedOption}
          >
            {t("BMC_Confirm")}
          </button>
          <button
            className="bmc-card-button-cancel"
            onClick={() => history.push("/bmc/dashboard()")}
            style={{ borderBottom: "3px solid black", outline: "none", marginRight: "5rem" }}
          >
            {t("BMC_Cancel")}
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AadhaarFullFormPage;
