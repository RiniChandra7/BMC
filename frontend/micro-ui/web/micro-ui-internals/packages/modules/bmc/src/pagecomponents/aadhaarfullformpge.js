import { CardLabel, LabelFieldPair } from "@egovernments/digit-ui-react-components";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import AddressDetailCard from "../components/AddressDetails";
import Timeline from "../components/bmcTimeline";
import DisabilityCard from "../components/DisabilityCard";
import PersonalDetailCard from "../components/PersonalDetails";
import QualificationCard from "../components/QualificationCard";
import RadioButton from "../components/radiobutton";
import Title from "../components/title";

import dropdownOptions from "./dropdownOptions.json";
const AadhaarFullFormPage = (_props) => {
  const { owner, index, onSelect, allOwners, formData, formState, setOwners, setError, clearErrors, config } = _props;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const headerLocale = Digit.Utils.locale.getTransformedLocale(tenantId);

  const initialDefaultValues = {};

  const { control, watch, setValue, trigger } = useForm({
    defaultValues: initialDefaultValues
  });
  const { t } = useTranslation();
  const [focusIndex, setFocusIndex] = useState({ index: -1, type: "" });
  const location = useLocation();
  const [selectedOption, setSelectedOption] = useState(formData?.disableType);
  const history = useHistory();


  const [castes, setCastes] = useState([]);
  const [religions, setReligions] = useState([]);
  const [divyangs, setDivyangs] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [selectedOptionCard, setSelectedOptionCard] = useState("No");

  const processCommonData = (data, headerLocale) => {
    return (
      data?.CommonDetails?.map((item) => ({
        code: item.id,
        name: item.name,
        i18nKey: `${headerLocale}_ADMIN_${item.name}`,
      })) || []
    );
  };

  const casteFunction = (data) => {
    const castesData = processCommonData(data, headerLocale);
    setCastes(castesData);
    return { castesData };
  };

  const religionFunction = (data) => {
    const religionsData = processCommonData(data, headerLocale);
    setReligions(religionsData);
    return { religionsData };
  };

  const qualificationFunction = (data) => {
    const qualificationData = processCommonData(data, headerLocale);
    setQualifications(qualificationData);
    return { qualificationData };
  };

  const divyangFunction = (data) => {
    const divyangData = processCommonData(data, headerLocale);
    setDivyangs(divyangData);
    return { divyangData };
  };

  const getCaste = { CommonSearchCriteria: { Option: "caste" } };
  const getReligion = { CommonSearchCriteria: { Option: "religion" } };
  const getQualification = { CommonSearchCriteria: { Option: "qualification" } };
  const getDivyang = { CommonSearchCriteria: { Option: "divyang" } };

  Digit.Hooks.bmc.useCommonGet(getCaste, { select: casteFunction });
  Digit.Hooks.bmc.useCommonGet(getReligion, { select: religionFunction });
  Digit.Hooks.bmc.useCommonGet(getQualification, { select: qualificationFunction });
  Digit.Hooks.bmc.useCommonGet(getDivyang, { select: divyangFunction });


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
        <PersonalDetailCard castes={castes} religions={religions} onUpdate={handlePersonalDetailUpdate} initialRows={[]} tenantId={tenantId} headerLocale={headerLocale} AllowEdit={true}></PersonalDetailCard>
        <AddressDetailCard onUpdate={handleAddressUpdate} initialRows={[]} tenantId={tenantId} headerLocale={headerLocale} AllowEdit={true}></AddressDetailCard>
        <QualificationCard qualifications={qualifications} onUpdate={handleQualificationsUpdate} initialRows={dropdownOptions.education} AddOption={true} AllowRemove={true}></QualificationCard>

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
          <DisabilityCard divyangs={divyangs} onUpdate={handleDisabilityUpdate} initialRows={[]} AllowEdit={true}></DisabilityCard>
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
