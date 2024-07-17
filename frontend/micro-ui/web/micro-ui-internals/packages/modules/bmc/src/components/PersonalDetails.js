import { CardLabel, DatePicker, Dropdown, LabelFieldPair, TextInput } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import dropdownOptions from "../pagecomponents/dropdownOptions.json";
import ToggleSwitch from "./Toggle";

const PersonalDetailCard = ({ onUpdate, initialRows = {}, AllowEdit = true, tenantId }) => {
  const { t } = useTranslation();
  const [isEditable, setIsEditable] = useState(AllowEdit);
  const {
    control,
    watch,
    formState: { errors, isValid },
    setValue,
    trigger,
    clearErrors
  } = useForm({
    defaultValues: {
      firstName: initialRows.aadharname || "",
      middleName: initialRows.middleName || "",
      lastName: initialRows.lastName || "",
      dob: initialRows.aadhardob || "",
      gender: initialRows.gender || "",
      father: initialRows.aadharfathername || "",
      religion: initialRows.religion || "",
      casteCategory: initialRows.caste || "",
    },
    mode: "all",
  });
  const processSingleData = (item, headerLocale) => {
    if (!item) return null;
  
    const genderMapping = {
      male: { id: 1, name: 'Male' },
      female: { id: 2, name: 'Female' },
      transgender: { id: 3, name: 'Transgender' },
    };
  
    if (typeof item === 'string') {
      const gender = genderMapping[item.toLowerCase()];
      if (!gender) return null; // Handle cases where the item is not one of the expected values
      return {
        ...gender,
        i18nKey: `${headerLocale}_ADMIN_${gender.name.toUpperCase()}`,
      };
    }
  
    if (typeof item === 'object' && item.id && item.name) {
      return {
        id: item.id,
        name: item.name,
        i18nKey: `${headerLocale}_ADMIN_${item.name}`,
      };
    }
  
    return null; // Handle cases where item is neither a string nor an object with id and name
  };
  const headerLocale = Digit.Utils.locale.getTransformedLocale(tenantId);
  const [castes, setCastes] = useState([]);
  const [religions, setReligions] = useState([]);
  
  const processCommonData = (data, headerLocale) => {
    return (
      data?.CommonDetails?.map((item) => ({
        id: item.id,
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

  const getCaste = { CommonSearchCriteria: { Option: "caste" } };
  const getReligion = { CommonSearchCriteria: { Option: "religion" } };

  Digit.Hooks.bmc.useCommonGet(getCaste, { select: casteFunction });
  Digit.Hooks.bmc.useCommonGet(getReligion, { select: religionFunction });
  const formValues = watch();

  useEffect(() => {
    onUpdate(formValues, isValid);
  }, [formValues, isValid, onUpdate]);
  const clearFieldErrorsIfHasValue = (fields) => {
    fields.forEach(field => {
      if (field.value) clearErrors(field.name);
    });
  };
  useEffect(() => {
    trigger(); // Validate the form on mount to show errors if fields are empty
  }, [trigger]);
  useEffect(() => {
    if (initialRows) {
      const casteData = processSingleData(initialRows?.caste, headerLocale);
      const religionData = processSingleData(initialRows?.religion, headerLocale);
      const genderdata = processSingleData(initialRows?.gender, headerLocale);
      setValue("firstName", initialRows.aadharname || "");
      setValue("middleName", initialRows.middleName || "");
      setValue("lastName", initialRows.lastName || "");
      setValue("dob", initialRows.aadhardob || "");
      setValue("gender", genderdata || "");
      setValue("father", initialRows.aadharfathername || "");
      setValue("religion", religionData|| "");
      setValue("casteCategory", casteData || "");
      clearFieldErrorsIfHasValue([
        { name: "firstName", value: initialRows.aadharname },
        { name: "middleName", value: initialRows.middleName },
        { name: "lastName", value: initialRows.lastName },
        { name: "dob", value: initialRows.aadhardob },
        { name: "gender", value: genderdata },
        { name: "father", value: initialRows.aadharfathername },
        { name: "religion", value: religionData },
        { name: "casteCategory", value: casteData },
      ]);
    }
  }, [initialRows, setValue,headerLocale,clearFieldErrorsIfHasValue]);
  
  const handleToggle = () => {
    setIsEditable(!isEditable);
  };

  return (
    <React.Fragment>
      <form className="bmc-row-card-header">
        <div className="bmc-card-row">
          <div className="bmc-col-large-header">
            <div className="bmc-title">{t("Personal Details")}</div>
          </div>
          <div className="bmc-col-small-header" style={{ textAlign: "end" }}>
            <ToggleSwitch
              id={"PersonalToggle"}
              isOn={isEditable}
              handleToggle={handleToggle}
              onLabel="Editable"
              offLabel="Readonly"
              disabled={!AllowEdit}
            />
          </div>
        </div>
        <div className="bmc-card-row">
          <div className="bmc-col3-card">
            <LabelFieldPair>
              <CardLabel className="bmc-label">{t("BMC_First_Name")}</CardLabel>
              <Controller
                control={control}
                name="firstName"
                rules={{ required: t("CORE_COMMON_REQUIRED_ERRMSG") }}
                render={(props) => (
                  <div>
                    <TextInput
                      disabled={!isEditable}
                      readOnly={!isEditable}
                      value={props.value}
                      onChange={(e) => props.onChange(e.target.value)}
                      onBlur={props.onBlur}
                    />
                    {errors.firstName && <span style={{ color: "red" }}>{errors.firstName.message}</span>}
                  </div>
                )}
              />
            </LabelFieldPair>
          </div>
          <div className="bmc-col3-card">
            <LabelFieldPair>
              <CardLabel className="bmc-label">{t("BMC_Middle_Name")}</CardLabel>
              <Controller
                control={control}
                name="middleName"
                rules={{ required: t("CORE_COMMON_REQUIRED_ERRMSG") }}
                render={(props) => (
                  <div>
                    <TextInput
                      disabled={!isEditable}
                      readOnly={!isEditable}
                      value={props.value}
                      onChange={(e) => props.onChange(e.target.value)}
                      onBlur={props.onBlur}
                    />
                    {errors.middleName && <span style={{ color: "red" }}>{errors.middleName.message}</span>}
                  </div>
                )}
              />
            </LabelFieldPair>
          </div>
          <div className="bmc-col3-card">
            <LabelFieldPair>
              <CardLabel className="bmc-label">{t("BMC_Last_Name")}</CardLabel>
              <Controller
                control={control}
                name="lastName"
                rules={{ required: t("CORE_COMMON_REQUIRED_ERRMSG") }}
                render={(props) => (
                  <div>
                    <TextInput
                      disabled={!isEditable}
                      readOnly={!isEditable}
                      value={props.value}
                      onChange={(e) => props.onChange(e.target.value)}
                      onBlur={props.onBlur}
                    />
                    {errors.lastName && <span style={{ color: "red" }}>{errors.lastName.message}</span>}
                  </div>
                )}
              />
            </LabelFieldPair>
          </div>
          <div className="bmc-col3-card">
            <LabelFieldPair>
              <CardLabel className="bmc-label">{t("BMC_Date_Of_Birth")}</CardLabel>
              <Controller
                control={control}
                name="dob"
                rules={{ required: t("CORE_COMMON_REQUIRED_ERRMSG") }}
                render={(props) => (
                  <div>
                    <DatePicker disabled={!isEditable} date={props.value} onChange={props.onChange} onBlur={props.onBlur} />
                    {errors.dob && <span style={{ color: "red" }}>{errors.dob.message}</span>}
                  </div>
                )}
              />
            </LabelFieldPair>
          </div>
        </div>
        <div className="bmc-card-row">
          <div className="bmc-col3-card">
            <LabelFieldPair>
              <CardLabel className="bmc-label">{t("BMC_Gender")}</CardLabel>
              <Controller
                control={control}
                name="gender"
                rules={{ required: t("CORE_COMMON_REQUIRED_ERRMSG") }}
                render={(props) => (
                  <div>
                    {isEditable ? (
                      <Dropdown
                        placeholder={t("Select Gender")}
                        selected={props.value}
                        select={props.onChange}
                        onBlur={props.onBlur}
                        option={dropdownOptions.gender}
                        optionKey="name"
                        t={t}
                        isMandatory={true}
                      />
                    ) : (
                      <TextInput readOnly value={props.value?.name || ""} />
                    )}
                    {errors.gender && <span style={{ color: "red" }}>{errors.gender.message}</span>}
                  </div>
                )}
              />
            </LabelFieldPair>
          </div>
          <div className="bmc-col3-card">
            <LabelFieldPair>
              <CardLabel className="bmc-label">{t("BMC_Father")}</CardLabel>
              <Controller
                control={control}
                name="father"
                rules={{ required: t("CORE_COMMON_REQUIRED_ERRMSG") }}
                render={(props) => (
                  <div>
                    <TextInput
                      disabled={!isEditable}
                      readOnly={!isEditable}
                      value={props.value}
                      onChange={(e) => props.onChange(e.target.value)}
                      onBlur={props.onBlur}
                    />
                    {errors.father && <span style={{ color: "red" }}>{errors.father.message}</span>}
                  </div>
                )}
              />
            </LabelFieldPair>
          </div>
          <div className="bmc-col3-card">
            <LabelFieldPair>
              <CardLabel className="bmc-label">{t("BMC_RELIGION")}*</CardLabel>
              <Controller
                control={control}
                name="religion"
                rules={{ required: t("CORE_COMMON_REQUIRED_ERRMSG") }}
                render={(props) => (
                  <div>
                    {isEditable ? (
                      <Dropdown
                        placeholder={t("Select Religion")}
                        selected={props.value}
                        select={props.onChange}
                        onBlur={props.onBlur}
                        option={religions}
                        optionKey="i18nKey"
                        t={t}
                        isMandatory={true}
                      />
                    ) : (
                      <TextInput readOnly value={props.value?.i18nKey || ""} />
                    )}
                    {errors.religion && <span style={{ color: "red" }}>{errors.religion.message}</span>}
                  </div>
                )}
              />
            </LabelFieldPair>
          </div>
          <div className="bmc-col3-card">
            <LabelFieldPair>
              <CardLabel className="bmc-label">{t("BMC_CasteCategory*")}</CardLabel>
              <Controller
                control={control}
                name="casteCategory"
                rules={{ required: t("CORE_COMMON_REQUIRED_ERRMSG") }}
                render={(props) => (
                  <div>
                    {isEditable ? (
                      <Dropdown
                        placeholder={t("Select Caste Category")}
                        selected={props.value}
                        select={props.onChange}
                        onBlur={props.onBlur}
                        option={castes}
                        optionKey="i18nKey"
                        t={t}
                        isMandatory={true}
                      />
                    ) : (
                      <TextInput readOnly value={t(props.value?.i18nKey) || ""} />
                    )}
                    {errors.casteCategory && <span style={{ color: "red" }}>{errors.casteCategory.message}</span>}
                  </div>
                )}
              />
            </LabelFieldPair>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default PersonalDetailCard;
