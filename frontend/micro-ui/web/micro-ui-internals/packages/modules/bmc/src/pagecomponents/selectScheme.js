import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory, useLocation } from "react-router-dom";
import Timeline from "../components/bmcTimeline";
import RadioButton from "../components/radiobutton";
import dropdownOptions from "./dropdownOptions.json";
import Title from "../components/title";

const SelectSchemePage = () => {
  const { t } = useTranslation();
  const [radioValueCheck, setRadioValueCheck] = useState();
  const [selectedRadio, setSelectedRadio] = useState("");
  const [selectScheme, setSelectScheme] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  console.log("Selected Scheme:", selectScheme);
  console.log("Selected Radio:", selectedRadio.value);

  const history = useHistory();

  const location = useLocation();

  const { selectedOption } = location.state || {};

  useEffect(() => {
    console.log("Effect triggered");
    console.log("Selected option:", selectedOption);
    if (selectedOption === "NO") {
      alert("you have selected NO option");
    }
  }, [selectedOption]);

  return (
    <React.Fragment>
      <div className="bmc-card-full">
        {window.location.href.includes("/citizen") && <Timeline currentStep={2} />}
        <Title text={"Select Scheme"} />

        <div className="bmc-card-grid">
          <div className="bmc-row-card-header">
            <div className="bmc-title" style={{ color: "#F47738" }}>
              Skill Development
            </div>
            <div className="bmc-card-row">
              <RadioButton
                t={t}
                optionsKey="label"
                options={dropdownOptions["skill developement"]}
                onSelect={setSelectedRadio}
                onClick={() => setSelectScheme("skill developement")}
                selectedOption={selectedRadio}
                style={{ paddingLeft: "1rem", margin: "0" }}
                isMisMandatory={true}
              />
              <RadioButton
                t={t}
                optionsKey="label"
                options={dropdownOptions["skill developement1"]}
                onSelect={setSelectedRadio}
                onClick={() => setSelectScheme("skill developement")}
                selectedOption={selectedRadio}
                style={{ paddingLeft: "1rem", margin: "0" }}
                disabled={selectedOption === "NO" ? true : false}
                isMandatory={true}
              />
            </div>
          </div>
          <div className="bmc-row-card-header">
            <div className="bmc-title" style={{ color: "#F47738" }}>
              Empowerment
            </div>
            <div className="bmc-card-row">
              <RadioButton
                t={t}
                optionsKey="label"
                options={dropdownOptions.empowerment}
                onSelect={setSelectedRadio}
                onClick={() => setSelectScheme("empowerment")}
                style={{ paddingLeft: "1rem", margin: "0" }}
                selectedOption={selectedRadio}
                isMandatory={true}
              />
              <RadioButton
                t={t}
                optionsKey="label"
                options={dropdownOptions["empowerment1"]}
                onSelect={setSelectedRadio}
                onClick={() => setSelectScheme("empowerment")}
                selectedOption={selectedRadio}
                isMandatory={true}
                style={{ paddingLeft: "1rem", margin: "0" }}
                disabled={selectedOption === "NO" ? true : false}
              />
            </div>
          </div>
          <div className="bmc-row-card-header">
            <div className="bmc-title" style={{ color: "#F47738" }}>
              Pension
            </div>
            <div className="bmc-card-row">
              <RadioButton
                t={t}
                optionsKey="label"
                options={dropdownOptions.pension}
                onSelect={setSelectedRadio}
                onClick={() => setSelectScheme("pension")}
                style={{ margin: "1rem" }}
                selectedOption={selectedRadio}
                isMandatory={true}
                disabled={selectedOption === "NO" ? true : false}
              />
            </div>
          </div>

          {showMessage && <div style={{ color: "red" }}>You selected No</div>}
        </div>
        {selectScheme === "skill developement" && (
          <React.Fragment>
            <div className="bmc-row-card-header">
              <div style={{ backgroundColor: "#F7F5F5", padding: "1rem", borderRadius: "10px" }}>
                <RadioButton
                  t={t}
                  optionsKey="value"
                  options={[{ label: "Course 1", value: "Course 1" }]}
                  selectedOption={radioValueCheck}
                  onSelect={setRadioValueCheck}
                  style={{ marginTop: "0", marginBottom: "0" }}
                  value={selectedRadio}
                  isMandatory={true}
                />
                <p style={{ paddingLeft: "4rem" }}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                  ever since the 1500s, when an unknown printer took a galley of type and scrambled Lorem Ipsum is simply dummy text of the printing
                  and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took
                  a galley of type and scrambled.
                </p>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    style={{
                      backgroundColor: "#F47738",
                      width: "91px",
                      height: "34px",
                      color: "white",
                      marginTop: "1.5rem",
                      borderBottom: "3px solid black",
                      outline: "none",
                    }}
                  >
                    View More
                  </button>
                </div>
              </div>
            </div>
            <div className="bmc-row-card-header">
              <div style={{ backgroundColor: "#F7F5F5", padding: "1rem", borderRadius: "10px" }}>
                <RadioButton
                  t={t}
                  optionsKey="value"
                  options={[{ label: "Course 2", value: "Course 2" }]}
                  selectedOption={radioValueCheck}
                  onSelect={setRadioValueCheck}
                  style={{ marginTop: "0", marginBottom: "0" }}
                  value={selectedRadio}
                  isMandatory={true}
                />
                <p style={{ paddingLeft: "4rem" }}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                  ever since the 1500s, when an unknown printer took a galley of type and scrambled Lorem Ipsum is simply dummy text of the printing
                  and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took
                  a galley of type and scrambled.
                </p>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    style={{
                      backgroundColor: "#F47738",
                      width: "91px",
                      height: "34px",
                      color: "white",
                      marginTop: "1.5rem",
                      borderBottom: "3px solid black",
                      outline: "none",
                    }}
                  >
                    View More
                  </button>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
        {selectScheme === "empowerment" && (
          <React.Fragment>
            <div className="bmc-row-card-header">
              <div style={{ backgroundColor: "#F7F5F5", padding: "1rem", borderRadius: "10px" }}>
                <RadioButton
                  t={t}
                  optionsKey="value"
                  options={[{ label: "Machine 1", value: "Machine 1" }]}
                  selectedOption={radioValueCheck}
                  onSelect={setRadioValueCheck}
                  style={{ marginTop: "0", marginBottom: "0" }}
                  value={selectedRadio}
                  isMandatory={true}
                />
                <p style={{ paddingLeft: "4rem" }}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                  ever since the 1500s, when an unknown printer took a galley of type and scrambled Lorem Ipsum is simply dummy text of the printing
                  and typesetting industry
                </p>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    style={{
                      backgroundColor: "#F47738",
                      width: "91px",
                      height: "34px",
                      color: "white",
                      marginTop: "1.5rem",
                      borderBottom: "3px solid black",
                      outline: "none",
                    }}
                  >
                    View More
                  </button>
                </div>
              </div>
            </div>
            <div className="bmc-row-card-header">
              <div style={{ backgroundColor: "#F7F5F5", padding: "1rem", borderRadius: "10px" }}>
                <RadioButton
                  t={t}
                  optionsKey="value"
                  options={[{ label: "Machine 2", value: "Machine 2" }]}
                  selectedOption={radioValueCheck}
                  onSelect={setRadioValueCheck}
                  style={{ marginTop: "0", marginBottom: "0" }}
                  value={selectedRadio}
                  isMandatory={true}
                />
                <p style={{ paddingLeft: "4rem" }}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                  ever since the 1500s, when an unknown printer took a galley of type and scrambled Lorem Ipsum is simply dummy text of the printing
                  and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took
                  a galley of type and scrambled.
                </p>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    style={{
                      backgroundColor: "#F47738",
                      width: "91px",
                      height: "34px",
                      color: "white",
                      marginTop: "1.5rem",
                      borderBottom: "3px solid black",
                      outline: "none",
                    }}
                  >
                    View More
                  </button>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
        {selectScheme === "pension" && (
          <React.Fragment>
            <div className="bmc-row-card-header">
              <div style={{ backgroundColor: "#F7F5F5", padding: "1rem", borderRadius: "10px" }}>
                <RadioButton
                  t={t}
                  optionsKey="value"
                  options={[{ label: "Pension 1", value: "Pension 1" }]}
                  selectedOption={radioValueCheck}
                  onSelect={setRadioValueCheck}
                  style={{ marginTop: "0", marginBottom: "0" }}
                  isMandatory={true}
                  value={selectedRadio}
                />
                <p style={{ paddingLeft: "4rem" }}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                  ever since the 1500s, when an unknown printer took a galley of type and scrambled Lorem Ipsum is simply dummy text of the printing
                  and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took
                  a galley of type and scrambled.
                </p>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    style={{
                      backgroundColor: "#F47738",
                      width: "91px",
                      height: "34px",
                      color: "white",
                      marginTop: "1.5rem",
                      borderBottom: "3px solid black",
                      outline: "none",
                    }}
                  >
                    View More
                  </button>
                </div>
              </div>
            </div>
            <div className="bmc-row-card-header">
              <div style={{ backgroundColor: "#F7F5F5", padding: "1rem", borderRadius: "10px" }}>
                <RadioButton
                  t={t}
                  optionsKey="value"
                  options={[{ label: "Pension 2", value: "Pension 2" }]}
                  selectedOption={radioValueCheck}
                  onSelect={setRadioValueCheck}
                  style={{ marginTop: "0", marginBottom: "0" }}
                  isMandatory={true}
                  value={selectedRadio}
                />
                <p style={{ paddingLeft: "4rem" }}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                  ever since the 1500s.
                </p>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    style={{
                      backgroundColor: "#F47738",
                      width: "91px",
                      height: "34px",
                      color: "white",
                      marginTop: "1.5rem",
                      borderBottom: "3px solid black",
                      outline: "none",
                    }}
                  >
                    View More
                  </button>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
      <div style={{ float: "right", paddingRight: "6rem", paddingBottom: "1rem" }}>
        <Link
          to={{
            pathname: "/digit-ui/citizen/bmc/ownerdetails",
            state: { selectedScheme: selectScheme, selectedRadio: selectedRadio },
          }}
          style={{ textDecoration: "none" }}
          disabled={!selectedRadio}
        >
          <button
            className="bmc-card-button"
            style={{ backgroundColor: radioValueCheck ? "#F47738" : "grey", borderBottom: "3px solid black", marginRight: "1rem" }}
          >
            {t("BMC_Next")}
          </button>
        </Link>
        <button className="bmc-card-button-cancel" style={{ borderBottom: "3px solid black", outline: "none" }} onClick={() => history.goBack()}>
          {t("BMC_Cancel")}
        </button>
      </div>
    </React.Fragment>
  );
};

export default SelectSchemePage;
