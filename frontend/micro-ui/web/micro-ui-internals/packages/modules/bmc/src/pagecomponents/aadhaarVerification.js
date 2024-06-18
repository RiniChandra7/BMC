import { CardLabel, LabelFieldPair, TextInput, CardLabelError, Card } from "@upyog/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Timeline from "../components/bmcTimeline";
import aadhaarData from "./aadhaarData.json";

const AadhaarVerification = ({ t, setError: setFormError, clearErrors: clearFormErrors, onBlur }) => {
  const [aadhaar, setAadhaar] = useState(Array(12).fill(""));
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [isAadhaarValid, setIsAadhaarValid] = useState(false);
  const [isOtpEnabled, setIsOtpEnabled] = useState(false);
  const [message, setMessage] = useState("");
  const [buttonText, setButtonText] = useState("Submit");
  const history = useHistory();

  const handleAadhaarChange = (e) => {
    const value = e.target.value;
    if (new RegExp(/^\d{0,12}$/).test(value) || value === "") {
      setAadhaar(value);
      if (new RegExp(/^\d{12}$/).test(value)) {
        setError("");
      }
      setIsAadhaarValid(false);
      setIsOtpEnabled(false);
      setMessage("");
      setButtonText("Submit");
    } else {
      setError("Aadhaar number should contain only 12 digits");
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;
    if (new RegExp(/^\d{0,6}$/).test(value) || value === "") {
      setOtp(value);
      if (new RegExp(/^\d{6}$/).test(value)) {
        setError("");
      }
    } else {
      setError("OTP should contain only 6 digits");
    }
  };

  const validateAadhaar = () => {
    if (new RegExp(/^\d{12}$/).test(aadhaar)) {
      setError("");
      setIsAadhaarValid(true);
      setIsOtpEnabled(true);
      // setMessage("Aadhaar is valid");
      setButtonText("Verify");
    } else {
      setError("Aadhaar number should contain only 12 digits");
      setIsAadhaarValid(false);
      setIsOtpEnabled(false);
      setMessage("");
      setButtonText("Submit");
    }
  };

  const handleSubmit = () => {
    if (buttonText === "Submit") {
      validateAadhaar();
    } else if (buttonText === "Verify" && isAadhaarValid && new RegExp(/^\d{6}$/).test(otp)) {
      if (aadhaar === aadhaarData.aadhaarNumber && otp === aadhaarData.otp) {
        history.push({
          pathname: "/digit-ui/citizen/bmc/aadhaarForm",
          state: { aadhaarInfo: aadhaarData.aadhaarInfo },
        });
      } else {
        setError("Invalid Aadhaar number or OTP");
        setIsOtpEnabled(false);
      }
    }
    if (aadhaar === aadhaarData.aadhaarNumber) {
      // setMessage("Aadhaar number matched with the record");
      setIsOtpEnabled(true);
    } else {
      // setMessage("Aadhaar number does not match with the record");
      setIsOtpEnabled(false);
    }
  };

  return (
    <React.Fragment>
      <div className="bmc-card-full">
        {window.location.href.includes("/citizen") ? <Timeline currentStep={1} /> : null}
        <div className="bmc-row-card-header" style={{ padding: "0" }}>
          <div className="bmc-card-row" style={{ height: "100%" }}>
            <div className="bmc-col2-card" style={{ height: "55vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div className="aadhaarDiv" style={{ width: "60%" }}>
                <div className="bmc-title" style={{ textAlign: "center" }}>
                  Aadhaar Verification
                </div>
                <LabelFieldPair>
                  <CardLabel className="aadhaar-label">{"BMC_AADHAAR_LABEL"}</CardLabel>
                  <TextInput
                    t={t}
                    type="number"
                    isMandatory={false}
                    optionKey="i18nKey"
                    name="aadhaar"
                    onBlur={onBlur}
                    value={aadhaar}
                    onChange={handleAadhaarChange}
                    placeholder="Enter a valid 12-digit Aadhaar number"
                    validation={{
                      required: true,
                      minLength: 12,
                      maxLength: 12,
                    }}
                  />
                </LabelFieldPair>
                <LabelFieldPair>
                  <CardLabel className="aadhaar-label">{"BMC_OTP_LABEL"}</CardLabel>
                  <TextInput
                    t={t}
                    type="number"
                    isMandatory={false}
                    optionKey="i18nKey"
                    name="otp"
                    value={otp}
                    onChange={handleOtpChange}
                    placeholder="Enter a valid 6-digit OTP number"
                    validation={{
                      required: true,
                      minLength: 6,
                      maxLength: 6,
                    }}
                    disabled={!isOtpEnabled}
                  />
                </LabelFieldPair>
                {message && <div style={{ textAlign: "center", color: aadhaar === aadhaarData.aadhaarNumber ? "green" : "red" }}>{message}</div>}
                {error && <div style={{ textAlign: "center", color: "red" }}>{error}</div>}
                <div style={{ textAlign: "center" }}>
                  <button className="bmc-card-button" onClick={handleSubmit} style={{ borderBottom: "3px solid black", textAlign: "center" }}>
                    {buttonText}
                  </button>
                </div>
              </div>
            </div>
            <div className="bmc-col2-card" style={{ padding: "0" }}>
              <div className="bmc-card-aadharimage"></div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AadhaarVerification;
