import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import dropdownOptions from "../../pagecomponents/dropdownOptions.json";
import { CardLabel, Dropdown, LabelFieldPair } from "@upyog/digit-ui-react-components";
import { useTranslation } from "react-i18next";

const data = [
  {
    id: 1,
    name: "BalKrishanaYadav",
    applicationNumber: "123456",
    wardName: "Ward 1",
    gender: "Male",
    pincode: "226022",
  },
  {
    id: 2,
    name: "BalKrishanaYadav",
    applicationNumber: "123456",
    wardName: "Ward 2",
    gender: "Male",
    pincode: "226022",
  },
  {
    id: 3,
    name: "BalKrishanaYadav",
    applicationNumber: "123456",
    wardName: "Ward 1",
    gender: "Male",
    pincode: "226022",
  },
  {
    id: 4,
    name: "BalKrishanaYadav",
    applicationNumber: "123456",
    wardName: "Ward 2",
    gender: "Male",
    pincode: "226022",
  },
  {
    id: 5,
    name: "BalKrishanaYadav",
    applicationNumber: "123456",
    wardName: "Ward 2",
    gender: "Male",
    pincode: "226022",
  },
];

const headers = ["", "Name", "Application Number", "Ward Name", "Gender", "Pincode"];

const ApprovePage = (_props) => {
  const { t } = useTranslation();
  const { control } = useForm();
  const history = useHistory();
  const [focusIndex, setFocusIndex] = useState({ index: -1, type: "" });

  const [isChecked, setIsChecked] = useState({});
  const [isAllChecked, setIsAllChecked] = useState(false);

  // const handleCheckboxChange = (e, id) => {
  //   setIsChecked((prev) => ({ ...prev, [id]: e.target.checked }));
  //   if (e.target.checked) {
  //     setShowCheckbox(id);
  //   } else {
  //     setShowCheckbox(null);
  //   }
  // };

  // const handleAllCheckboxChange = (e) => {
  //   setIsAllChecked(e.target.checked);
  //   const newCheckedState = data.reduce((acc, item) => {
  //     acc[item.id] = e.target.checked;
  //     return acc;
  //   }, {});
  //   setIsChecked(newCheckedState);
  //   if (e.target.checked) {
  //     setShowCheckbox(data[0]?.id || null);
  //   } else {
  //     setShowCheckbox(null);
  //   }
  // };

  // const toggleCheckbox = (id) => {
  //   setShowCheckbox((prev) => (prev === id ? null : id));
  // };
  const handleCheckboxChange = (e, id) => {
    setIsChecked((prev) => ({ ...prev, [id]: e.target.checked }));
  };

  const handleAllCheckboxChange = (e) => {
    setIsAllChecked(e.target.checked);
    const newCheckedState = data.reduce((acc, item) => {
      acc[item.id] = e.target.checked;
      return acc;
    }, {});
    setIsChecked(newCheckedState);
  };

  const verifySelectedItems = () => {
    const selectedIds = Object.entries(isChecked)
      .filter(([_, checked]) => checked)
      .map(([id, _]) => id);
    if (selectedIds.length > 0) {
      // Navigate to the next page with selectedIds
      history.push(`/digit-ui/citizen/bmc/approve?ids=${selectedIds.join(",")}`);
    } else {
      alert("Please select at least one item to verify.");
    }
  };

  return (
    <React.Fragment>
      <div className="bmc-card-full">
        <div className="bmc-row-card-header">
          <div className="bmc-card-row">
            <div className="bmc-col3-card">
              <LabelFieldPair>
                <CardLabel className="bmc-label">{t("BMC_Scheme_Type")}</CardLabel>
                <Controller
                  control={control}
                  name={"scheme"}
                  rules={{
                    required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                  }}
                  render={(props) => (
                    <Dropdown
                      placeholder={t("Select Scheme")}
                      selected={props.value}
                      select={(value) => {
                        props.onChange(value);
                      }}
                      onBlur={props.onBlur}
                      option={dropdownOptions.scheme}
                      optionKey="value"
                      t={t}
                    />
                  )}
                />
              </LabelFieldPair>
            </div>
            <div className="bmc-col3-card">
              <LabelFieldPair>
                <CardLabel className="bmc-label">{t("BMC_Scheme")}</CardLabel>
                <Controller
                  control={control}
                  name={"machine"}
                  rules={{
                    required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                  }}
                  render={(props) => (
                    <Dropdown
                      placeholder={t("Select Machine")}
                      selected={props.value}
                      select={(value) => {
                        props.onChange(value);
                      }}
                      onBlur={props.onBlur}
                      option={dropdownOptions.machine}
                      optionKey="value"
                      t={t}
                    />
                  )}
                />
              </LabelFieldPair>
            </div>
            <div className="bmc-col3-card">
              <LabelFieldPair>
                <CardLabel className="bmc-label">{t("BMC_Scheme_Name")}</CardLabel>
                <Controller
                  control={control}
                  name={"machine"}
                  rules={{
                    required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                  }}
                  render={(props) => (
                    <Dropdown
                      placeholder={t("Select Machine")}
                      selected={props.value}
                      select={(value) => {
                        props.onChange(value);
                      }}
                      onBlur={props.onBlur}
                      option={dropdownOptions.machine}
                      optionKey="value"
                      t={t}
                    />
                  )}
                />
              </LabelFieldPair>
            </div>
            <div className="bmc-col3-card" style={{ paddingTop: "1.5rem", textAlign: "center" }}>
              <button
                type="button"
                className="bmc-card-button"
                style={{
                  borderBottom: "3px solid black",
                }}
              >
                {t("BMC_Search")}
              </button>
            </div>
          </div>
        </div>
        <div className="bmc-row-card-header" style={{ padding: "0" }}>
          <div className="bmc-card-row">
            <div className="bmc-table-container">
              <table className="bmc-hover-table">
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" checked={isAllChecked} onChange={handleAllCheckboxChange} />
                    </th>
                    {headers.slice(1).map((header, index) => (
                      <th key={index}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index}>
                      <td>
                        <input type="checkbox" checked={isChecked[row.id] || false} onChange={(e) => handleCheckboxChange(e, row.id)} />
                      </td>
                      <td style={{ color: "#F47738" }}>{row.name}</td>
                      <td>{row.applicationNumber}</td>
                      <td>{row.wardName}</td>
                      <td>{row.gender}</td>
                      <td>{row.pincode}</td>
                      <td style={{ textAlign: "center" }}>
                        <button
                          className="bmc-card-button"
                          style={{
                            borderBottom: "3px solid black",
                            width: "8rem",
                            height: "2rem",
                            backgroundColor: "#B9521E",
                          }}
                        >
                          {t("BMC_Verified")}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ textAlign: "end", padding: "1rem" }}>
              <React.Fragment>
                <button className="bmc-card-button" style={{ borderBottom: "3px solid black", margin: "1rem" }} onClick={verifySelectedItems}>
                  {t("BMC_Approve")}
                </button>
                <button className="bmc-card-button-cancel" style={{ borderBottom: "3px solid black", outline: "none" }}>
                  {t("BMC_Reject")}
                </button>
              </React.Fragment>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ApprovePage;
