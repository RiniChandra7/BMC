import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, Link, useHistory } from "react-router-dom";
import Timeline from "../components/bmcTimeline";
import { CardLabel, LabelFieldPair, TextInput, Card, Modal } from "@upyog/digit-ui-react-components";
import { Controller, useForm } from "react-hook-form";
import { ProfileImage } from "./profile";

const createOwnerDetail = () => ({
  applicationNumber: "BMC/2024-25/00001",
  scheme: "Scheme Name",
  machineName: "Sewing Machine",
  name: "Bal Krishana Yadav",
  fatherName: "Ram Krishana Yadav",
  gender: "Male",
  address: "127/14 Secotr 3 Gomati Nagar",
  city: "Lucknow",
  district: "Lucknow",
  state: "Uttar Pradesh",
  pincode: "226022",
  subDistrict: "Lucknow",
  dob: "20/11/1990",
  religion: "Hindu",
  wardName: "A",
  subWardName: "A",
  caste: "Caste Name",
  rationCardType: "BPL",
  bankName: "SBI",
  branchName: "Gomati Nagar",
  ifscCode: "89990",
  accountNumber: "12345678",
  micrCode: "89909",
  profession: "Profession",
  docimile: "Yes",
  income: "Yes",
  voterId: "Yes",
  pan: "Yes",
  bankPassBook: "Yes",
});

const BMCReviewPage = ({ config, onSelect, formData, setError, formState, clearErrors }) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [owners, setOwners] = useState(formData?.owners || [createOwnerDetail()]);
  const [focusIndex, setFocusIndex] = useState({ index: -1, type: "" });

  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();
  const commonProps = {
    focusIndex,
    allOwners: owners,
    setFocusIndex,
    formData,
    formState,
    setOwners,
    t,
    setError,
    clearErrors,
    config,
  };

  return (
    <React.Fragment>
      {owners.map((owner, index) => (
        <ReviewDetailForm key={owner.key} index={index} owner={owner} {...commonProps} />
      ))}
    </React.Fragment>
  );
};

const ReviewDetailForm = (_props) => {
  const {
    owner,
    userType,
    index,
    onSelect,
    focusIndex,
    allOwners,
    setFocusIndex,
    formData,
    formState,
    setOwners,
    t,
    setError,
    clearErrors,
    config,
  } = _props;

  const { control, formState: localFormState, watch, setError: setLocalError, clearErrors: clearLocalErrors, setValue, trigger } = useForm();
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const { aadhaarInfo, selectedScheme, selectedRadio } = location.state || {};

  console.log(selectedScheme);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <React.Fragment>
      <div className="bmc-card-full">
        {window.location.href.includes("/citizen") ? <Timeline currentStep={5} /> : null}
        <div className="bmc-row-card-header">
          <div className="bmc-title" style={{ padding: "0" }}>
            Scheme Details
          </div>
          <div className="bmc-card-row">
            <div className="bmc-col1-card">
              <LabelFieldPair
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                }}
              >
                <CardLabel className="bmc-label">{"BMC_Application_Number:"}</CardLabel>
                <Controller
                  control={control}
                  name={"applicationNumber"}
                  render={(props) => (
                    <TextInput
                      readOnly={props.disable}
                      style={{ border: "none", fontSize: "18px", fontWeight: "700" }}
                      disabled
                      value={props.value}
                      autoFocus={focusIndex.index === owner?.key && focusIndex.type === "applicationNumber"}
                      onChange={(e) => {
                        props.onChange(e.target.value);
                        setFocusIndex({ index: owner.key, type: "applicationNumber" });
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
              <LabelFieldPair
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                }}
              >
                <CardLabel className="bmc-label">{"BMC_Scheme_Name:"}</CardLabel>
                <Controller
                  control={control}
                  name={"scheme"}
                  defaultValue={owner?.scheme}
                  render={(props) => (
                    <TextInput
                      readOnly={props.disable}
                      style={{ border: "none", fontSize: "18px", fontWeight: "700" }}
                      disabled
                      value={props.value}
                      autoFocus={focusIndex.index === selectedScheme?.key && focusIndex.type === "scheme"}
                      onChange={(e) => {
                        props.onChange(e.target.value);
                        setFocusIndex({ index: selectedScheme.key, type: "scheme" });
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
              <LabelFieldPair
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                }}
              >
                <CardLabel className="bmc-label">{"BMC_Machine_Name:"}</CardLabel>
                <Controller
                  control={control}
                  name={"machineName"}
                  defaultValue={owner?.machineName}
                  render={(props) => (
                    <TextInput
                      readOnly={props.disable}
                      style={{ border: "none", fontSize: "18px", fontWeight: "700" }}
                      disabled
                      value={props.value}
                      autoFocus={focusIndex.index === owner?.key && focusIndex.type === "machineName"}
                      onChange={(e) => {
                        props.onChange(e.target.value);
                        setFocusIndex({ index: owner.key, type: "machineName" });
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
            <div className="bmc-title" style={{ paddingBottom: "0" }}>
              Personal Details
            </div>
            <div className="bmc-col-large-header">
              <div className="bmc-card-row">
                <div className="bmc-col1-card">
                  <LabelFieldPair
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "baseline",
                    }}
                  >
                    <CardLabel className="bmc-label">{"BMC_Name:"}</CardLabel>
                    <Controller
                      control={control}
                      name={"name"}
                      defaultValue={aadhaarInfo?.name}
                      render={(props) => (
                        <TextInput
                          readOnly={props.disable}
                          style={{ border: "none", fontSize: "18px", fontWeight: "700" }}
                          disabled
                          value={props.value}
                          autoFocus={focusIndex.index === aadhaarInfo?.key && focusIndex.type === "name"}
                          onChange={(e) => {
                            props.onChange(e.target.value);
                            setFocusIndex({ index: aadhaarInfo.key, type: "name" });
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
                  <LabelFieldPair
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "baseline",
                    }}
                  >
                    <CardLabel className="bmc-label">{"BMC_Father_Name:"}</CardLabel>
                    <Controller
                      control={control}
                      name={"fatherName"}
                      defaultValue={owner?.fatherName}
                      render={(props) => (
                        <TextInput
                          readOnly={props.disable}
                          style={{ border: "none", fontSize: "18px", fontWeight: "700" }}
                          disabled
                          value={props.value}
                          autoFocus={focusIndex.index === owner?.key && focusIndex.type === "fatherName"}
                          onChange={(e) => {
                            props.onChange(e.target.value);
                            setFocusIndex({ index: owner.key, type: "fatherName" });
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
                  <LabelFieldPair
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "baseline",
                    }}
                  >
                    <CardLabel className="bmc-label">{"BMC_Gender:"}</CardLabel>
                    <Controller
                      control={control}
                      name={"gender"}
                      defaultValue={owner?.gender}
                      render={(props) => (
                        <TextInput
                          readOnly={props.disable}
                          style={{ border: "none", fontSize: "18px", fontWeight: "700" }}
                          disabled
                          value={props.value}
                          autoFocus={focusIndex.index === owner?.key && focusIndex.type === "gender"}
                          onChange={(e) => {
                            props.onChange(e.target.value);
                            setFocusIndex({ index: owner.key, type: "gender" });
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
                <div className="bmc-col1-card">
                  <LabelFieldPair
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "baseline",
                    }}
                  >
                    <CardLabel className="bmc-label">{"BMC_DOB:"}</CardLabel>
                    <Controller
                      control={control}
                      name={"dob"}
                      defaultValue={owner?.dob}
                      render={(props) => (
                        <TextInput
                          readOnly={props.disable}
                          style={{ border: "none", fontSize: "18px", fontWeight: "700" }}
                          disabled
                          value={props.value}
                          autoFocus={focusIndex.index === owner?.key && focusIndex.type === "dob"}
                          onChange={(e) => {
                            props.onChange(e.target.value);
                            setFocusIndex({ index: owner.key, type: "dob" });
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
                  <LabelFieldPair
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "baseline",
                    }}
                  >
                    <CardLabel className="bmc-label">{"BMC_Address:"}</CardLabel>
                    <Controller
                      control={control}
                      name={"address"}
                      defaultValue={owner?.address}
                      render={(props) => (
                        <TextInput
                          readOnly={props.disable}
                          style={{ border: "none", fontSize: "18px", fontWeight: "700" }}
                          disabled
                          value={props.value}
                          autoFocus={focusIndex.index === owner?.key && focusIndex.type === "address"}
                          onChange={(e) => {
                            props.onChange(e.target.value);
                            setFocusIndex({ index: owner.key, type: "address" });
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
                  <LabelFieldPair
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "baseline",
                    }}
                  >
                    <CardLabel className="bmc-label">{"BMC_Pincode:"}</CardLabel>
                    <Controller
                      control={control}
                      name={"pincode"}
                      defaultValue={owner?.pincode}
                      render={(props) => (
                        <TextInput
                          readOnly={props.disable}
                          style={{ border: "none", fontSize: "18px", fontWeight: "700" }}
                          disabled
                          value={props.value}
                          autoFocus={focusIndex.index === owner?.key && focusIndex.type === "pincode"}
                          onChange={(e) => {
                            props.onChange(e.target.value);
                            setFocusIndex({ index: owner.key, type: "pincode" });
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
                <div className="bmc-col1-card">
                  <LabelFieldPair
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "baseline",
                    }}
                  >
                    <CardLabel className="bmc-label">{"BMC_District:"}</CardLabel>
                    <Controller
                      control={control}
                      name={"district"}
                      defaultValue={owner?.district}
                      render={(props) => (
                        <TextInput
                          readOnly={props.disable}
                          style={{ border: "none", fontSize: "18px", fontWeight: "700" }}
                          disabled
                          value={props.value}
                          autoFocus={focusIndex.index === owner?.key && focusIndex.type === "district"}
                          onChange={(e) => {
                            props.onChange(e.target.value);
                            setFocusIndex({ index: owner.key, type: "district" });
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
                  <LabelFieldPair
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "baseline",
                    }}
                  >
                    <CardLabel className="bmc-label">{"BMC_State:"}</CardLabel>
                    <Controller
                      control={control}
                      name={"state"}
                      defaultValue={owner?.state}
                      render={(props) => (
                        <TextInput
                          readOnly={props.disable}
                          style={{ border: "none", fontSize: "18px", fontWeight: "700" }}
                          disabled
                          value={props.value}
                          autoFocus={focusIndex.index === owner?.key && focusIndex.type === "state"}
                          onChange={(e) => {
                            props.onChange(e.target.value);
                            setFocusIndex({ index: owner.key, type: "state" });
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
                  <LabelFieldPair
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "baseline",
                    }}
                  >
                    <CardLabel className="bmc-label">{"BMC_Religion:"}</CardLabel>
                    <Controller
                      control={control}
                      name={"religion"}
                      defaultValue={owner?.religion}
                      render={(props) => (
                        <TextInput
                          readOnly={props.disable}
                          style={{ border: "none", fontSize: "18px", fontWeight: "700" }}
                          disabled
                          value={props.value}
                          autoFocus={focusIndex.index === owner?.key && focusIndex.type === "religion"}
                          onChange={(e) => {
                            props.onChange(e.target.value);
                            setFocusIndex({ index: owner.key, type: "religion" });
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
                <div className="bmc-col1-card">
                  <LabelFieldPair
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "baseline",
                    }}
                  >
                    <CardLabel className="bmc-label">{"BMC_Caste:"}</CardLabel>
                    <Controller
                      control={control}
                      name={"caste"}
                      defaultValue={owner?.caste}
                      render={(props) => (
                        <TextInput
                          readOnly={props.disable}
                          style={{ border: "none", fontSize: "18px", fontWeight: "700" }}
                          disabled
                          value={props.value}
                          autoFocus={focusIndex.index === owner?.key && focusIndex.type === "caste"}
                          onChange={(e) => {
                            props.onChange(e.target.value);
                            setFocusIndex({ index: owner.key, type: "caste" });
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
                  <LabelFieldPair
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "baseline",
                    }}
                  >
                    <CardLabel className="bmc-label">{"BMC_Ward_Name:"}</CardLabel>
                    <Controller
                      control={control}
                      name={"wardName"}
                      defaultValue={owner?.wardName}
                      render={(props) => (
                        <TextInput
                          readOnly={props.disable}
                          style={{ border: "none", fontSize: "18px", fontWeight: "700" }}
                          disabled
                          value={props.value}
                          autoFocus={focusIndex.index === owner?.key && focusIndex.type === "wardName"}
                          onChange={(e) => {
                            props.onChange(e.target.value);
                            setFocusIndex({ index: owner.key, type: "wardName" });
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
                  <LabelFieldPair
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "baseline",
                    }}
                  >
                    <CardLabel className="bmc-label">{"BMC_Sub_Ward_Name:"}</CardLabel>
                    <Controller
                      control={control}
                      name={"subWardName"}
                      defaultValue={owner?.subWardName}
                      render={(props) => (
                        <TextInput
                          readOnly={props.disable}
                          style={{ border: "none", fontSize: "18px", fontWeight: "700" }}
                          disabled
                          value={props.value}
                          autoFocus={focusIndex.index === owner?.key && focusIndex.type === "subWardName"}
                          onChange={(e) => {
                            props.onChange(e.target.value);
                            setFocusIndex({ index: owner.key, type: "subWardName" });
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
                <div className="bmc-col1-card">
                  <LabelFieldPair
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "baseline",
                    }}
                  >
                    <CardLabel className="bmc-label">{"BMC_Ration_Card_Type:"}</CardLabel>
                    <Controller
                      control={control}
                      name={"rationCardType"}
                      defaultValue={owner?.rationCardType}
                      render={(props) => (
                        <TextInput
                          readOnly={props.disable}
                          style={{ border: "none", fontSize: "18px", fontWeight: "700" }}
                          disabled
                          value={props.value}
                          autoFocus={focusIndex.index === owner?.key && focusIndex.type === "rationCardType"}
                          onChange={(e) => {
                            props.onChange(e.target.value);
                            setFocusIndex({ index: owner.key, type: "rationCardType" });
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

              {/* <img src="" style={{ height: "250px", width: "250px", backgroundColor: "#F0EFEF" }} /> */}
            </div>
          </div>

          <div className="bmc-card-row">
            <hr />
            <div className="bmc-title" style={{ paddingBottom: "0", paddingTop: "1rem" }}>
              Bank Details
            </div>
            <div className="bmc-col3-card">
              <LabelFieldPair
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                }}
              >
                <CardLabel className="bmc-label">{"BMC_Bank_Name:"}</CardLabel>
                <Controller
                  control={control}
                  name={"bankName"}
                  defaultValue={owner?.bankName}
                  render={(props) => (
                    <TextInput
                      readOnly={props.disable}
                      style={{ border: "none", fontSize: "18px", fontWeight: "700" }}
                      disabled
                      value={props.value}
                      autoFocus={focusIndex.index === owner?.key && focusIndex.type === "bankName"}
                      onChange={(e) => {
                        props.onChange(e.target.value);
                        setFocusIndex({ index: owner.key, type: "bankName" });
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
              <LabelFieldPair
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                }}
              >
                <CardLabel className="bmc-label">{"BMC_Branch_Name:"}</CardLabel>
                <Controller
                  control={control}
                  name={"branchName"}
                  defaultValue={owner?.branchName}
                  render={(props) => (
                    <TextInput
                      readOnly={props.disable}
                      style={{ border: "none", fontSize: "18px", fontWeight: "700" }}
                      disabled
                      value={props.value}
                      autoFocus={focusIndex.index === owner?.key && focusIndex.type === "branchName"}
                      onChange={(e) => {
                        props.onChange(e.target.value);
                        setFocusIndex({ index: owner.key, type: "branchName" });
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
              <LabelFieldPair
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                }}
              >
                <CardLabel className="bmc-label">{"BMC_Account_Number:"}</CardLabel>
                <Controller
                  control={control}
                  name={"accountNumber"}
                  defaultValue={owner?.accountNumber}
                  render={(props) => (
                    <TextInput
                      readOnly={props.disable}
                      style={{ border: "none", fontSize: "18px", fontWeight: "700" }}
                      disabled
                      value={props.value}
                      autoFocus={focusIndex.index === owner?.key && focusIndex.type === "accountNumber"}
                      onChange={(e) => {
                        props.onChange(e.target.value);
                        setFocusIndex({ index: owner.key, type: "accountNumber" });
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
              <LabelFieldPair
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                }}
              >
                <CardLabel className="bmc-label">{"BMC_IFSC_Code:"}</CardLabel>
                <Controller
                  control={control}
                  name={"ifscCode"}
                  defaultValue={owner?.ifscCode}
                  render={(props) => (
                    <TextInput
                      readOnly={props.disable}
                      style={{ border: "none", fontSize: "18px", fontWeight: "700" }}
                      disabled
                      value={props.value}
                      autoFocus={focusIndex.index === owner?.key && focusIndex.type === "ifscCode"}
                      onChange={(e) => {
                        props.onChange(e.target.value);
                        setFocusIndex({ index: owner.key, type: "ifscCode" });
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
              <LabelFieldPair
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                }}
              >
                <CardLabel className="bmc-label">{"BMC_MICR_Code:"}</CardLabel>
                <Controller
                  control={control}
                  name={"micrCode"}
                  defaultValue={owner?.micrCode}
                  render={(props) => (
                    <TextInput
                      readOnly={props.disable}
                      style={{ border: "none", fontSize: "18px", fontWeight: "700" }}
                      disabled
                      value={props.value}
                      autoFocus={focusIndex.index === owner?.key && focusIndex.type === "micrCode"}
                      onChange={(e) => {
                        props.onChange(e.target.value);
                        setFocusIndex({ index: owner.key, type: "micrCode" });
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
            <hr />
            <div className="bmc-title" style={{ paddingBottom: "0", paddingTop: "1rem" }}>
              Professional Details
            </div>
            <div className="bmc-col3-card">
              <LabelFieldPair
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                }}
              >
                <CardLabel className="bmc-label">{"BMC_Profession:"}</CardLabel>
                <Controller
                  control={control}
                  name={"profession"}
                  defaultValue={owner?.profession}
                  render={(props) => (
                    <TextInput
                      readOnly={props.disable}
                      style={{ border: "none", fontSize: "18px", fontWeight: "700" }}
                      disabled
                      value={props.value}
                      autoFocus={focusIndex.index === owner?.key && focusIndex.type === "profession"}
                      onChange={(e) => {
                        props.onChange(e.target.value);
                        setFocusIndex({ index: owner.key, type: "profession" });
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
              <LabelFieldPair
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                }}
              >
                <CardLabel className="bmc-label">{"BMC_Docimile:"}</CardLabel>
                <Controller
                  control={control}
                  name={"docimile"}
                  defaultValue={owner?.docimile}
                  render={(props) => (
                    <TextInput
                      readOnly={props.disable}
                      style={{ border: "none", fontSize: "18px", fontWeight: "700" }}
                      disabled
                      value={props.value}
                      autoFocus={focusIndex.index === owner?.key && focusIndex.type === "docimile"}
                      onChange={(e) => {
                        props.onChange(e.target.value);
                        setFocusIndex({ index: owner.key, type: "docimile" });
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
              <LabelFieldPair
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                }}
              >
                <CardLabel className="bmc-label">{"BMC_Income:"}</CardLabel>
                <Controller
                  control={control}
                  name={"income"}
                  defaultValue={owner?.income}
                  render={(props) => (
                    <TextInput
                      readOnly={props.disable}
                      style={{ border: "none", fontSize: "18px", fontWeight: "700" }}
                      disabled
                      value={props.value}
                      autoFocus={focusIndex.index === owner?.key && focusIndex.type === "income"}
                      onChange={(e) => {
                        props.onChange(e.target.value);
                        setFocusIndex({ index: owner.key, type: "income" });
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
              <LabelFieldPair
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                }}
              >
                <CardLabel className="bmc-label">{"BMC_Voter_Id:"}</CardLabel>
                <Controller
                  control={control}
                  name={"voterId"}
                  defaultValue={owner?.voterId}
                  render={(props) => (
                    <TextInput
                      readOnly={props.disable}
                      style={{ border: "none", fontSize: "18px", fontWeight: "700" }}
                      disabled
                      value={props.value}
                      autoFocus={focusIndex.index === owner?.key && focusIndex.type === "voterId"}
                      onChange={(e) => {
                        props.onChange(e.target.value);
                        setFocusIndex({ index: owner.key, type: "voterId" });
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
              <LabelFieldPair
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                }}
              >
                <CardLabel className="bmc-label">{"BMC_PAN_NUMBER:"}</CardLabel>
                <Controller
                  control={control}
                  name={"pan"}
                  defaultValue={owner?.pan}
                  render={(props) => (
                    <TextInput
                      readOnly={props.disable}
                      style={{ border: "none", fontSize: "18px", fontWeight: "700" }}
                      disabled
                      value={props.value}
                      autoFocus={focusIndex.index === owner?.key && focusIndex.type === "pan"}
                      onChange={(e) => {
                        props.onChange(e.target.value);
                        setFocusIndex({ index: owner.key, type: "pan" });
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
              <LabelFieldPair
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                }}
              >
                <CardLabel className="bmc-label">{"BMC_BANK_PASSBOOK:"}</CardLabel>
                <Controller
                  control={control}
                  name={"bankPassBook"}
                  defaultValue={owner?.bankPassBook}
                  render={(props) => (
                    <TextInput
                      readOnly={props.disable}
                      style={{ border: "none", fontSize: "18px", fontWeight: "700" }}
                      disabled
                      value={props.value}
                      autoFocus={focusIndex.index === owner?.key && focusIndex.type === "bankPassBook"}
                      onChange={(e) => {
                        props.onChange(e.target.value);
                        setFocusIndex({ index: owner.key, type: "bankPassBook" });
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

        {window.location.href.includes("/citizen") ? (
          <React.Fragment>
            <div style={{ float: "right", paddingBottom: "1rem", textAlign: "end" }}>
              <button type="submit" className="bmc-card-button" style={{ marginRight: "1rem", borderBottom: "3px solid black" }} onClick={openModal}>
                {t("BMC_Submit")}
              </button>
              <button type="button" className="bmc-card-button-cancel" style={{ borderBottom: "3px solid black" }} onClick={() => history.goBack()}>
                {t("BMC_Cancel")}
              </button>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div style={{ float: "right", paddingBottom: "1rem", textAlign: "end" }}>
              <button type="submit" className="bmc-card-button" style={{ marginRight: "1rem", borderBottom: "3px solid black" }} onClick={openModal}>
                {t("BMC_Verify / Approve")}
              </button>
              <button type="button" className="bmc-card-button-cancel" style={{ borderBottom: "3px solid black" }} onClick={() => history.goBack()}>
                {t("BMC_Reject")}
              </button>
            </div>
          </React.Fragment>
        )}
        {isModalOpen && (
          <Modal onClose={closeModal} fullScreen hideSubmit={true}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "80%",
                margin: "auto",
                backgroundColor: "white",
                padding: "2rem",
                borderRadius: "10px",
              }}
            >
              <p style={{ fontSize: "20px", fontWeight: "700", padding: "1rem" }}>Your Applicaton has been submitted.</p>
              <div style={{ textAlign: "end" }}>
                <Link to="/bmc/dashboard" style={{ textDecoration: "none" }}>
                  <button
                    className="bmc-card-button"
                    style={{
                      borderBottom: "3px solid black",
                      outline: "none",
                      marginRight: "1rem",
                    }}
                  >
                    Agree
                  </button>
                </Link>
                <button
                  onClick={closeModal}
                  className="bmc-card-button-cancel"
                  style={{
                    borderBottom: "3px solid black",
                    outline: "none",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </React.Fragment>
  );
};

export default BMCReviewPage;
