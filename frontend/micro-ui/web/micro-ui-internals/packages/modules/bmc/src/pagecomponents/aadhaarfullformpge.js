import { CardLabel, Dropdown, LabelFieldPair, TextInput } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import Timeline from "../components/bmcTimeline";
import RadioButton from "../components/radiobutton";
import Title from "../components/title";
import { ProfileImage } from "./profile";

const AadhaarFullFormPage = (_props) => {
  const { owner, index, onSelect, allOwners, formData, formState, setOwners, setError, clearErrors, config } = _props;
  const { control, formState: localFormState, watch, setError: setLocalError, clearErrors: clearLocalErrors, setValue, trigger } = useForm();
  const { t } = useTranslation();
  const [focusIndex, setFocusIndex] = useState({ index: -1, type: "" });
  const location = useLocation();
  const { aadhaarInfo } = location.state || {};
  const [selectedOption, setSelectedOption] = useState(formData?.disableType);
  const history = useHistory();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const headerLocale = Digit.Utils.locale.getTransformedLocale(tenantId);
  const [zones, setZones] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [wards, setWards] = useState([]);
  const [castes, setCastes] = useState([]);
  const [religions, setReligions] = useState([]);
  const [qualifications, setQualifications] = useState([]);

  const processCommonData = (data, headerLocale) => {
    return data?.CommonDetails?.map((item) => ({
      code: item.id,
      name: item.name,
      i18nKey: `${headerLocale}_ADMIN_${item.name}`
    })) || [];
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

  const getCaste = { CommonSearchCriteria: { 'Option': 'caste' } };
  const getReligion = { CommonSearchCriteria: { 'Option': 'religion' } };
  const getQualification = { CommonSearchCriteria: { 'Option': 'qualification' } };

  const { data: caste } = Digit.Hooks.bmc.useCommonGet(getCaste, { select: casteFunction });
  const { data: religion } = Digit.Hooks.bmc.useCommonGet(getReligion, { select: religionFunction });
  const { data: qualification } = Digit.Hooks.bmc.useCommonGet(getQualification, { select: qualificationFunction });

  const { isLoading, data: wardsAndLocalities } = Digit.Hooks.useLocation(
    tenantId, 'Zone',
    {
      select: (data) => {
        const zonesData = [];
        const blocksData = [];
        const wardsData = [];

        data?.TenantBoundary[0]?.boundary.forEach((zone) => {
          zonesData.push({
            code: zone.code,
            name: zone.name,
            i18nKey: `${headerLocale}_ADMIN_${zone.code}`
          });

          zone.children.forEach((block) => {
            blocksData.push({
              code: block.code,
              name: block.name,
              zoneCode: zone.code,
              i18nKey: `${headerLocale}_ADMIN_${block.code}`
            });

            block.children.forEach((ward) => {
              wardsData.push({
                code: ward.code,
                name: ward.name,
                zoneCode: zone.code,
                blockCode: block.code,
                i18nKey: `${headerLocale}_ADMIN_${ward.code}`
              });
            });
          });
        });
        setZones(zonesData);
        setBlocks(blocksData);
        setWards(wardsData);
        return {
          zonesData, blocksData, wardsData
        }
      }
    });

  const selectedZone = watch('zoneName');
  const selectedBlock = watch('blockName');
  const [filteredBlocks, setFilteredBlocks] = useState([]);
  const [filteredWards, setFilteredWards] = useState([]);

  useEffect(() => {
    if (selectedZone && selectedZone.code) {
      const filtered = blocks.filter(block => block.zoneCode === selectedZone.code);
      setFilteredBlocks(filtered);
      setValue('blockName', null); // Reset block dropdown
      setFilteredWards([]); // Clear wards when zone changes
      setValue('wardName', null); // Reset ward dropdown
    } else {
      setFilteredBlocks([]);
    }
  }, [blocks, selectedZone, setValue]);

  useEffect(() => {
    if (selectedBlock && selectedBlock.code) {
      const filtered = wards.filter(ward => ward.blockCode === selectedBlock.code && ward.zoneCode === selectedZone.code);
      setFilteredWards(filtered);
      setValue('wardName', null); // Reset ward dropdown
    } else {
      setFilteredWards([]);
    }
  }, [wards, selectedBlock, selectedZone, setValue]);

  const goNext = () => {
    if (selectedOption.value === "Yes") {
      history.push("/digit-ui/citizen/bmc/selectScheme", { selectedOption: "Yes" });
    } else if (selectedOption.value === "No") {
      history.push("/digit-ui/citizen/bmc/selectScheme", { selectedOption: "NO" });
    }
  };

  if (!aadhaarInfo) {
    return <div>No Aadhaar information found.</div>;
  }

  function disableType(value) {
    setSelectedOption(value);
  }

  return (
    <React.Fragment>
      <div className="bmc-card-full">
        {window.location.href.includes("/citizen") ? <Timeline currentStep={2} /> : null}
        <Title text={"Aadhaar Form Details"} />
        <div className="bmc-row-card-header">
          <div className="bmc-title">Personal Details</div>
          <div className="bmc-card-row">
            <div className="bmc-col-large-header">
              <div className="bmc-card-row">
                <div className="bmc-col1-card">
                  <LabelFieldPair>
                    <CardLabel className="bmc-label">{"BMC_First_Name"}</CardLabel>
                    <Controller
                      control={control}
                      name={"firstName"}
                      defaultValue={aadhaarInfo.firstName}
                      render={(props) => (
                        <TextInput
                          readOnly={props.disable}
                          style={{ border: "none", paddingLeft: "0", fontSize: "20px", fontWeight: "700" }}
                          disabled
                          value={props.value}
                          autoFocus={focusIndex.index === aadhaarInfo?.key && focusIndex.type === "firstName"}
                          onChange={(e) => {
                            props.onChange(e.target.value);
                            setFocusIndex({ index: aadhaarInfo.key, type: "firstName" });
                          }}
                          onBlur={(e) => {
                            setFocusIndex({ index: -1 });
                            props.onBlur(e);
                          }}
                        />
                      )}
                    />
                  </LabelFieldPair>
                </div>
                <div className="bmc-col1-card">
                  <LabelFieldPair>
                    <CardLabel className="bmc-label">{"BMC_Middle_Name"}</CardLabel>
                    <Controller
                      control={control}
                      name={"middleName"}
                      defaultValue={aadhaarInfo?.middleName}
                      render={(props) => (
                        <TextInput
                          readOnly={props.disable}
                          style={{ border: "none", paddingLeft: "0", fontSize: "20px", fontWeight: "700" }}
                          disabled
                          value={props.value}
                          autoFocus={focusIndex.index === aadhaarInfo?.key && focusIndex.type === "middleName"}
                          onChange={(e) => {
                            props.onChange(e.target.value);
                            setFocusIndex({ index: aadhaarInfo.key, type: "middleName" });
                          }}
                          onBlur={(e) => {
                            setFocusIndex({ index: -1 });
                            props.onBlur(e);
                          }}
                        />
                      )}
                    />
                  </LabelFieldPair>
                </div>
                <div className="bmc-col1-card">
                  <LabelFieldPair>
                    <CardLabel className="bmc-label">{"BMC_Last_Name"}</CardLabel>
                    <Controller
                      control={control}
                      name={"lastName"}
                      defaultValue={aadhaarInfo?.lastName}
                      render={(props) => (
                        <TextInput
                          readOnly={props.disable}
                          style={{ border: "none", paddingLeft: "0", fontSize: "20px", fontWeight: "700" }}
                          disabled
                          value={props.value}
                          autoFocus={focusIndex.index === aadhaarInfo?.key && focusIndex.type === "lastName"}
                          onChange={(e) => {
                            props.onChange(e.target.value);
                            setFocusIndex({ index: aadhaarInfo.key, type: "lastName" });
                          }}
                          onBlur={(e) => {
                            setFocusIndex({ index: -1 });
                            props.onBlur(e);
                          }}
                        />
                      )}
                    />
                  </LabelFieldPair>
                </div>
              </div>
              <div className="bmc-card-row">
                <div className=" bmc-col1-card">
                  <LabelFieldPair>
                    <CardLabel className="bmc-label">{"BMC_Date_Of_Birth"}</CardLabel>
                    <Controller
                      control={control}
                      name={"dob"}
                      defaultValue={aadhaarInfo?.dob}
                      render={(props) => (
                        <TextInput
                          readOnly={props.disable}
                          style={{ border: "none", paddingLeft: "0", fontSize: "20px", fontWeight: "700" }}
                          disabled
                          value={props.value}
                          autoFocus={focusIndex.index === aadhaarInfo?.key && focusIndex.type === "dob"}
                          onChange={(e) => {
                            props.onChange(e.target.value);
                            setFocusIndex({ index: aadhaarInfo.key, type: "dob" });
                          }}
                          onBlur={(e) => {
                            setFocusIndex({ index: -1 });
                            props.onBlur(e);
                          }}
                        />
                      )}
                    />
                  </LabelFieldPair>
                </div>
                <div className=" bmc-col1-card">
                  <LabelFieldPair>
                    <CardLabel className="bmc-label">{"BMC_Gender"}</CardLabel>
                    <Controller
                      control={control}
                      name={"gender"}
                      defaultValue={aadhaarInfo?.gender}
                      render={(props) => (
                        <TextInput
                          readOnly={props.disable}
                          style={{ border: "none", paddingLeft: "0", fontSize: "20px", fontWeight: "700" }}
                          disabled
                          value={props.value}
                          autoFocus={focusIndex.index === aadhaarInfo?.key && focusIndex.type === "gender"}
                          onChange={(e) => {
                            props.onChange(e.target.value);
                            setFocusIndex({ index: aadhaarInfo.key, type: "gender" });
                          }}
                          onBlur={(e) => {
                            setFocusIndex({ index: -1 });
                            props.onBlur(e);
                          }}
                        />
                      )}
                    />
                  </LabelFieldPair>
                </div>
                <div className=" bmc-col1-card">
                  <LabelFieldPair>
                    <CardLabel className="bmc-label">{"BMC_Father"}</CardLabel>
                    <Controller
                      control={control}
                      name={"father"}
                      defaultValue={aadhaarInfo?.father}
                      render={(props) => (
                        <TextInput
                          readOnly={props.disable}
                          style={{ border: "none", paddingLeft: "0", fontSize: "20px", fontWeight: "700" }}
                          disabled
                          value={props.value}
                          autoFocus={focusIndex.index === aadhaarInfo?.key && focusIndex.type === "father"}
                          onChange={(e) => {
                            props.onChange(e.target.value);
                            setFocusIndex({ index: aadhaarInfo.key, type: "father" });
                          }}
                          onBlur={(e) => {
                            setFocusIndex({ index: -1 });
                            props.onBlur(e);
                          }}
                        />
                      )}
                    />
                  </LabelFieldPair>
                </div>
              </div>
            </div>
            <div className="bmc-col-small-header">
              <ProfileImage />

              {/* <img src="" style={{ height: "170px", width: "170px", backgroundColor: "#F0EFEF" }} /> */}
            </div>
          </div>
        </div>
        <div className="bmc-row-card-header">
          <div className="bmc-card-row">
            <div className="bmc-title">Address Details</div>
            <div className="bmc-col3-card">
              <LabelFieldPair>
                <CardLabel className="bmc-label">{"BMC_House"}</CardLabel>
                <Controller
                  control={control}
                  name={"house"}
                  defaultValue={aadhaarInfo?.home}
                  render={(props) => (
                    <TextInput
                      readOnly={props.disable}
                      style={{ border: "none", paddingLeft: "0", fontSize: "20px", fontWeight: "700" }}
                      disabled
                      value={props.value}
                      autoFocus={focusIndex.index === aadhaarInfo?.key && focusIndex.type === "house"}
                      onChange={(e) => {
                        props.onChange(e.target.value);
                        setFocusIndex({ index: aadhaarInfo.key, type: "house" });
                      }}
                      onBlur={(e) => {
                        setFocusIndex({ index: -1 });
                        props.onBlur(e);
                      }}
                    />
                  )}
                />
              </LabelFieldPair>
            </div>
            <div className="bmc-col3-card">
              <LabelFieldPair>
                <CardLabel className="bmc-label">{"BMC_Street"}</CardLabel>
                <Controller
                  control={control}
                  name={"street"}
                  defaultValue={aadhaarInfo?.street}
                  render={(props) => (
                    <TextInput
                      readOnly={props.disable}
                      style={{ border: "none", paddingLeft: "0", fontSize: "20px", fontWeight: "700" }}
                      disabled
                      value={props.value}
                      autoFocus={focusIndex.index === aadhaarInfo?.key && focusIndex.type === "street"}
                      onChange={(e) => {
                        props.onChange(e.target.value);
                        setFocusIndex({ index: aadhaarInfo.key, type: "street" });
                      }}
                      onBlur={(e) => {
                        setFocusIndex({ index: -1 });
                        props.onBlur(e);
                      }}
                    />
                  )}
                />
              </LabelFieldPair>
            </div>
            <div className="bmc-col3-card">
              <LabelFieldPair>
                <CardLabel className="bmc-label">{"BMC_Landmark"}</CardLabel>
                <Controller
                  control={control}
                  name={"landMark"}
                  defaultValue={aadhaarInfo?.landMark}
                  render={(props) => (
                    <TextInput
                      readOnly={props.disable}
                      style={{ border: "none", paddingLeft: "0", fontSize: "20px", fontWeight: "700" }}
                      disabled
                      value={props.value}
                      autoFocus={focusIndex.index === aadhaarInfo?.key && focusIndex.type === "landMark"}
                      onChange={(e) => {
                        props.onChange(e.target.value);
                        setFocusIndex({ index: aadhaarInfo.key, type: "landMark" });
                      }}
                      onBlur={(e) => {
                        setFocusIndex({ index: -1 });
                        props.onBlur(e);
                      }}
                    />
                  )}
                />
              </LabelFieldPair>
            </div>
            <div className="bmc-col3-card">
              <LabelFieldPair>
                <CardLabel className="bmc-label">{"BMC_Locality"}</CardLabel>
                <Controller
                  control={control}
                  name={"locality"}
                  defaultValue={aadhaarInfo?.locality}
                  render={(props) => (
                    <TextInput
                      readOnly={props.disable}
                      style={{ border: "none", paddingLeft: "0", fontSize: "20px", fontWeight: "700" }}
                      disabled
                      value={props.value}
                      autoFocus={focusIndex.index === aadhaarInfo?.key && focusIndex.type === "locality"}
                      onChange={(e) => {
                        props.onChange(e.target.value);
                        setFocusIndex({ index: aadhaarInfo.key, type: "locality" });
                      }}
                      onBlur={(e) => {
                        setFocusIndex({ index: -1 });
                        props.onBlur(e);
                      }}
                    />
                  )}
                />
              </LabelFieldPair>
            </div>
          </div>
          <div className="bmc-card-row">
            <div className="bmc-col3-card">
              <LabelFieldPair>
                <CardLabel className="bmc-label">{"BMC_City"}</CardLabel>
                <Controller
                  control={control}
                  name={"city"}
                  defaultValue={aadhaarInfo?.city}
                  render={(props) => (
                    <TextInput
                      readOnly={props.disable}
                      style={{ border: "none", paddingLeft: "0", fontSize: "20px", fontWeight: "700" }}
                      disabled
                      value={props.value}
                      autoFocus={focusIndex.index === aadhaarInfo?.key && focusIndex.type === "city"}
                      onChange={(e) => {
                        props.onChange(e.target.value);
                        setFocusIndex({ index: aadhaarInfo.key, type: "city" });
                      }}
                      onBlur={(e) => {
                        setFocusIndex({ index: -1 });
                        props.onBlur(e);
                      }}
                    />
                  )}
                />
              </LabelFieldPair>
            </div>
            <div className="bmc-col3-card">
              <LabelFieldPair>
                <CardLabel className="bmc-label">{"BMC_Sub_District"}</CardLabel>
                <Controller
                  control={control}
                  name={"subDistrict"}
                  defaultValue={aadhaarInfo?.subDistrict}
                  render={(props) => (
                    <TextInput
                      readOnly={props.disable}
                      style={{ border: "none", paddingLeft: "0", fontSize: "20px", fontWeight: "700" }}
                      disabled
                      value={props.value}
                      autoFocus={focusIndex.index === aadhaarInfo?.key && focusIndex.type === "subDistrict"}
                      onChange={(e) => {
                        props.onChange(e.target.value);
                        setFocusIndex({ index: aadhaarInfo.key, type: "subDistrict" });
                      }}
                      onBlur={(e) => {
                        setFocusIndex({ index: -1 });
                        props.onBlur(e);
                      }}
                    />
                  )}
                />
              </LabelFieldPair>
            </div>
            <div className="bmc-col3-card">
              <LabelFieldPair>
                <CardLabel className="bmc-label">{"BMC_District"}</CardLabel>
                <Controller
                  control={control}
                  name={"district"}
                  defaultValue={aadhaarInfo?.district}
                  render={(props) => (
                    <TextInput
                      readOnly={props.disable}
                      style={{ border: "none", paddingLeft: "0", fontSize: "20px", fontWeight: "700" }}
                      disabled
                      value={props.value}
                      autoFocus={focusIndex.index === aadhaarInfo?.key && focusIndex.type === "district"}
                      onChange={(e) => {
                        props.onChange(e.target.value);
                        setFocusIndex({ index: aadhaarInfo.key, type: "district" });
                      }}
                      onBlur={(e) => {
                        setFocusIndex({ index: -1 });
                        props.onBlur(e);
                      }}
                    />
                  )}
                />
              </LabelFieldPair>
            </div>
            <div className="bmc-col3-card">
              <LabelFieldPair>
                <CardLabel className="bmc-label">{"BMC_State"}</CardLabel>
                <Controller
                  control={control}
                  name={"state"}
                  defaultValue={aadhaarInfo?.state}
                  render={(props) => (
                    <TextInput
                      readOnly={props.disable}
                      style={{ border: "none", paddingLeft: "0", fontSize: "20px", fontWeight: "700" }}
                      disabled
                      value={props.value}
                      autoFocus={focusIndex.index === aadhaarInfo?.key && focusIndex.type === "state"}
                      onChange={(e) => {
                        props.onChange(e.target.value);
                        setFocusIndex({ index: aadhaarInfo.key, type: "state" });
                      }}
                      onBlur={(e) => {
                        setFocusIndex({ index: -1 });
                        props.onBlur(e);
                      }}
                    />
                  )}
                />
              </LabelFieldPair>
            </div>
          </div>
          <div className="bmc-row-card">
            <div className="bmc-col3-card">
              <LabelFieldPair>
                <CardLabel className="bmc-label">{"BMC-Pincode"}</CardLabel>
                <Controller
                  control={control}
                  name={"pincode"}
                  defaultValue={aadhaarInfo?.pincode}
                  render={(props) => (
                    <TextInput
                      readOnly={props.disable}
                      style={{ border: "none", paddingLeft: "0", fontSize: "20px", fontWeight: "700" }}
                      disabled
                      value={props.value}
                      autoFocus={focusIndex.index === aadhaarInfo?.key && focusIndex.type === "state"}
                      onChange={(e) => {
                        props.onChange(e.target.value);
                        setFocusIndex({ index: aadhaarInfo.key, type: "state" });
                      }}
                      onBlur={(e) => {
                        setFocusIndex({ index: -1 });
                        props.onBlur(e);
                      }}
                    />
                  )}
                />
              </LabelFieldPair>
            </div>
          </div>
        </div>
        <div className="bmc-row-card-header">
          <div className="bmc-card-row">
            <div className="bmc-title">Personal Details</div>
            <div className="bmc-col3-card">
              <LabelFieldPair>
                <CardLabel className="bmc-label">{"BMC_Zone_Name*"}</CardLabel>
                <Controller
                  control={control}
                  name={"zoneName"}
                  rules={{
                    required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                  }}
                  render={(props) => (
                    <Dropdown
                      placeholder={t("Select Zone")}
                      selected={props.value}
                      select={(zone) => props.onChange(zone)}
                      onBlur={props.onBlur}
                      option={zones}
                      optionKey="i18nKey"
                      t={t}
                      isMandatory={true}
                    />
                  )}
                />
              </LabelFieldPair>
            </div>
            <div className="bmc-col3-card">
              <LabelFieldPair>
                <CardLabel className="bmc-label">{"BMC_Block_Name*"}</CardLabel>
                <Controller
                  control={control}
                  name={"blockName"}
                  rules={{
                    required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                  }}
                  render={(props) => (
                    <Dropdown
                      placeholder={t("Select Ward")}
                      selected={props.value}
                      select={(block) => props.onChange(block)}
                      onBlur={props.onBlur}
                      option={filteredBlocks}
                      optionKey="i18nKey"
                      t={t}
                      isMandatory={true}
                    />
                  )}
                />
              </LabelFieldPair>
            </div>
            <div className="bmc-col3-card">
              <LabelFieldPair>
                <CardLabel className="bmc-label">{"BMC_Ward_Name*"}</CardLabel>
                <Controller
                  control={control}
                  name={"wardName"}
                  rules={{
                    required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                  }}
                  render={(props) => (
                    <Dropdown
                      placeholder={t("Select SubWard")}
                      selected={props.value}
                      select={(ward) => props.onChange(ward)}
                      onBlur={props.onBlur}
                      option={filteredWards}
                      optionKey="i18nKey"
                      t={t}
                      isMandatory={true}
                    />
                  )}
                />
              </LabelFieldPair>
            </div>
            <div className="bmc-col3-card">
              <LabelFieldPair>
                <CardLabel className="bmc-label">{"BMC_Religion*"}</CardLabel>
                <Controller
                  control={control}
                  name={"religion"}
                  rules={{
                    required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                  }}
                  render={(props) => (
                    <Dropdown
                      placeholder={t("Select Religion")}
                      selected={props.value}
                      select={(religion) => {
                        props.onChange(religion);
                      }}
                      onBlur={props.onBlur}
                      option={religions}
                      optionKey="i18nKey"
                      t={t}
                      isMandatory={true}
                    />
                  )}
                />
              </LabelFieldPair>
            </div>
            <div className="bmc-col3-card">
              <LabelFieldPair>
                <CardLabel className="bmc-label">{"BMC_CasteCategory*"}</CardLabel>
                <Controller
                  control={control}
                  name={"casteCategory"}
                  rules={{
                    required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                  }}
                  render={(props) => (
                    <Dropdown
                      placeholder={t("Select Caste Category")}
                      selected={props.value}
                      select={(caste) => {
                        props.onChange(caste);
                      }}
                      onBlur={props.onBlur}
                      option={castes}
                      optionKey="i18nKey"
                      t={t}
                      isMandatory={true}
                    />
                  )}
                />
              </LabelFieldPair>
            </div>
          </div>
        </div>
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
          <div className="bmc-col1-card" style={{ textAlign: "center" }}>
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
      </div>
    </React.Fragment>
  );
};

export default AadhaarFullFormPage;
