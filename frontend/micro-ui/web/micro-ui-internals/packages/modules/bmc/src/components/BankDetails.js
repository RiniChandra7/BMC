import { AddIcon, RemoveIcon, TextInput } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const BankDetailsForm = ({ tenantId, onUpdate, initialRows = [], AddOption = true, AllowRemove = true }) => {
  const initialDefaultValues = {
    name: "",
    branchName: "",
    ifsc: "",
    micr: "",
    accountnumber: "",
  };

  const {
    control,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: initialDefaultValues,
  });
  const { t } = useTranslation();
  const headerLocale = Digit.Utils.locale.getTransformedLocale(tenantId);
  const [bankData, setBankData] = useState([]);
  const [rows, setRows] = useState([]);
  const ifsc = watch("ifsc");

  const processCommonData = (data, headerLocale) => {
    return (
      data?.BankDetails?.map((item) => ({
        id: item.branchId,
        name: item.name,
        branchName: item.branchName,
        ifsc: item.ifsc,
        micr: item.micr,
        accountnumber: item.accountnumber,
        i18nKey: `${headerLocale}_ADMIN_${item.name}`,
      })) || []
    );
  };

  const bankFunction = (data) => {
    const BankData = processCommonData(data, headerLocale);
    setBankData(BankData);
    return { BankData };
  };

  const getBank = { BankSearchCriteria: { IFSC: ifsc } };
  Digit.Hooks.bmc.useCommonGetBank(getBank, { select: bankFunction });

  useEffect(() => {
    if (ifsc) {
      const details = bankData[ifsc] || {};
      setValue("name", details.name || "");
      setValue("branchNames", details.branchName || "");
      setValue("micr", details.micr || "");
    } else {
      setValue("name", "");
      setValue("branchNames", "");
      setValue("micr", "");
    }
  }, [ifsc, bankData, setValue]);

  const addRow = (data) => {
    setRows([...rows, data]);
    onUpdate([...rows, data]);
  };

  const removeRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
    onUpdate(updatedRows);
  };

  useEffect(() => {
    setRows(initialRows);
  }, [initialRows]);

  return (
    <div className="bmc-row-card-header">
      <div className="bmc-card-row">
        <div className="bmc-title">BANK DETAILS</div>
        <div className="bmc-table-container" style={{ padding: "1rem" }}>
          <form>
            <table className="bmc-hover-table">
              <thead>
                <tr>
                  <th scope="col">IFSC Code</th>
                  <th scope="col">MICR Code</th>
                  <th scope="col">Account Number</th>
                  <th scope="col">Bank Name</th>
                  <th scope="col">Branch Name</th>
                  {AllowRemove && <th scope="col"></th>}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="IFSC Code" style={{ textAlign: "left" }}>
                    <Controller
                      control={control}
                      name="ifsc"
                      render={(props) => (
                        <div>
                          <TextInput value={props.value} name="IFSC" placeholder="IFSC Code" />
                          {errors.ifsc && <span style={{ color: "red" }}>{errors.ifsc.message}</span>}
                        </div>
                      )}
                    />
                  </td>
                  <td data-label="MICR Code" style={{ textAlign: "left" }}>
                    <Controller
                      control={control}
                      name="micr"
                      render={(props) => (
                        <div>
                          <TextInput {...props} placeholder="MICR Code" disabled />
                          {errors.micr && <span style={{ color: "red" }}>{errors.micr.message}</span>}
                        </div>
                      )}
                    />
                  </td>
                  <td data-label="Account Number" style={{ textAlign: "left" }}>
                    <Controller
                      control={control}
                      name="accountnumber"
                      render={(props) => (
                        <div>
                          <TextInput
                            {...props}
                            placeholder="Account Number"
                            type="number"
                            onChange={(e) => setValue("accountnumber", e.target.value)}
                          />
                          {errors.accountnumber && <span style={{ color: "red" }}>{errors.accountnumber.message}</span>}
                        </div>
                      )}
                    />
                  </td>
                  <td data-label="Bank Name" style={{ textAlign: "left" }}>
                    <Controller
                      control={control}
                      name="name"
                      render={(props) => (
                        <div>
                          <TextInput {...props} placeholder="Bank Name" disabled />
                          {/* {errors.bankName && <span style={{ color: 'red' }}>{errors.bankName.message}</span>} */}
                        </div>
                      )}
                    />
                  </td>
                  <td data-label="Branch Name" style={{ textAlign: "left" }}>
                    <Controller
                      control={control}
                      name="branchName"
                      render={(props) => (
                        <div>
                          <TextInput {...props} placeholder="Branch Name" disabled />
                          {/* {errors.branchName && <span style={{ color: 'red' }}>{errors.branchName.message}</span>} */}
                        </div>
                      )}
                    />
                  </td>
                  <td data-label="Add Row">
                    <button type="submit">
                      <AddIcon className="bmc-add-icon" />
                    </button>
                  </td>
                </tr>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td>{row.ifsc || "-"}</td>
                    <td>{row.micr || "-"}</td>
                    <td>{row.accountnumber || "-"}</td>
                    <td>{row.name || "-"}</td>
                    <td>{row.branchNames || "-"}</td>

                    {AllowRemove && (
                      <td data-label="Remove Row">
                        <button type="button" onClick={() => removeRow(index)}>
                          <RemoveIcon className="bmc-remove-icon" />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BankDetailsForm;
