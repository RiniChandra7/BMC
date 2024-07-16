import { CardLabel, Dropdown, LabelFieldPair, TextInput } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const BankDetails = ({ initialRows = [], AllowEdit = false, tenantId }) => {
  const { t } = useTranslation();
  const [focusIndex, setFocusIndex] = useState({ index: -1, type: "" });
  const [bankData, setBankData] = useState([]);
  const headerLocale = Digit.Utils.locale.getTransformedLocale(tenantId);

  const processCommonData = (data, headerLocale) => {
    return (
      data?.BankDetails?.map((item) => ({
        Bank: item.Bank,
        Branch: item.Branch,
        AccountNumber: item.AccountNumber,
        IFSC: item.IFSC,
        MICR: item.MICR,
        i18nKey: `${headerLocale}_ADMIN_${item.name}`,
      })) || []
    );
  };

  const bankFunction = (data) => {
    const bankData = processCommonData(data, headerLocale);
    setBankData(bankData);
    return { bankData };
  };

  const getBank = { CommonSearchCriteria: { Option: "Banks" } };

  Digit.Hooks.bmc.useCommonGetBank(getBank, { select: bankFunction });

  const initialDefaultValues = {
    Bank: initialRows.Bank || "",
    Branch: initialRows.Branch || "",
    AccountNumber: initialRows.AccountNumber || "",
    IFSC: initialRows.IFSC || "",
    MICR: initialRows.MICR || "",
  };

  const {
    control,
    formState: { errors, isValid },
    trigger,
  } = useForm({
    defaultValues: initialDefaultValues,
  });

  useEffect(() => {
    trigger(); // Validate the form on mount to show errors if fields are empty
  }, [trigger]);

  return (
    <React.Fragment>
      <div className="bmc-row-card-header">
        <div className="bmc-card-row">
          <div className="bmc-title">Bank Details</div>
          <div className="bmc-col3-card">
            <LabelFieldPair>
              <CardLabel className="bmc-label">{t("BMC_Bank_Name*")}</CardLabel>
              <Controller
                control={control}
                name={"bankName"}
                rules={{
                  required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                }}
                render={(props) => (
                  <Dropdown
                    placeholder={"Select Bank"}
                    selected={props.value}
                    select={(value) => {
                      props.onChange(value);
                    }}
                    onBlur={props.onBlur}
                    // option={dropdownOptions.bankName}
                    option={bankData.map((bank) => ({ value: bank.Bank, label: bank.Bank }))}
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
              <CardLabel className="bmc-label">{t("BMC_Branch_Name*")}</CardLabel>
              <Controller
                control={control}
                name={"branchName"}
                rules={{
                  required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                }}
                render={(props) => (
                  <Dropdown
                    placeholder={"Select Branch"}
                    selected={props.value}
                    select={(value) => {
                      props.onChange(value);
                    }}
                    onBlur={props.onBlur}
                    // option={dropdownOptions.bankBranch}
                    option={bankData.Branch}
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
              <CardLabel className="bmc-label">{"BMC_Account_Number*"}</CardLabel>
              <Controller
                control={control}
                name={"accountNumber"}
                // defaultValue={owner?.accountNumber}
                render={(props) => (
                  <TextInput
                    value={props.value}
                    isMandatory={true}
                    placeholder={"Enter the accountNumber"}
                    // autoFocus={focusIndex.index === owner?.key && focusIndex.type === "accountNumber"}
                    onChange={(e) => {
                      props.onChange(e.target.value);
                      //   setFocusIndex({ index: owner.key, type: "wardNameMaster" });
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
              <CardLabel className="bmc-label">{"BMC_IFSC_Code*"}</CardLabel>
              <Controller
                control={control}
                name={"ifscCode"}
                // defaultValue={owner?.ifscCode}
                render={(props) => (
                  <TextInput
                    value={props.value}
                    isMandatory={true}
                    placeholder={"Enter the ifscCode"}
                    // autoFocus={focusIndex.index === owner?.key && focusIndex.type === "ifscCode"}
                    onChange={(e) => {
                      props.onChange(e.target.value);
                      //   setFocusIndex({ index: owner.key, type: "ifscCode" });
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
              <CardLabel className="bmc-label">{"BMC_MICR_Code*"}</CardLabel>
              <Controller
                control={control}
                name={"micrCode"}
                // defaultValue={owner?.micrCode}
                render={(props) => (
                  <TextInput
                    value={props.value}
                    isMandatory={true}
                    placeholder={"Enter the micrCode"}
                    // autoFocus={focusIndex.index === owner?.key && focusIndex.type === "micrCode"}
                    onChange={(e) => {
                      props.onChange(e.target.value);
                      //   setFocusIndex({ index: owner.key, type: "micrCode" });
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
    </React.Fragment>
  );
};

export default BankDetails;
