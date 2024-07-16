import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CardLabel, Dropdown, LabelFieldPair, TextInput, AddIcon,RemoveIcon } from "@egovernments/digit-ui-react-components";

const bankDetails = {
  IFSC001: {
    bankName: "Bank A",
    branchName: "Branch A1",
    micrCode: "MICR001",
  },
  IFSC002: {
    bankName: "Bank B",
    branchName: "Branch B1",
    micrCode: "MICR002",
  },
  // Add more bank details here
};

const BankDetailsForm = ({ tenantId, initialRows = [], AddOption = true, AllowRemove = true }) => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { t } = useTranslation();
  const headerLocale = Digit.Utils.locale.getTransformedLocale(tenantId);
  const [rows, setRows] = useState([]);
  const ifscCode = watch("ifscCode");

  useEffect(() => {
    if (ifscCode) {
      const details = bankDetails[ifscCode] || {};
      setValue("bankName", details.bankName || "");
      setValue("branchName", details.branchName || "");
      setValue("micrCode", details.micrCode || "");
    } else {
      setValue("bankName", "");
      setValue("branchName", "");
      setValue("micrCode", "");
    }
  }, [ifscCode, setValue]);

  const addRow = (data) => {
    setRows([...rows, data]);
  };

  const removeRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  return (
    <div className="bmc-row-card-header">
      <div className="bmc-card-row">
        <div className="bmc-title">Bank Details</div>
        <div className="bmc-table-container" style={{ padding: "1rem" }}>
          <form onSubmit={handleSubmit(addRow)}>
            <table className="bmc-hover-table">
              <thead>
                <tr>
                  <th scope="col">IFSCCode</th>
                  <th scope="col">MICRCode</th>
                  <th scope="col">AccountNumber</th>
                  <th scope="col">BankName</th>
                  <th scope="col">BranchName</th>
                  {AllowRemove && <th scope="col"></th>}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="IFSC Code" style={{ textAlign: "left" }}>
                    <Controller
                      control={control}
                      name="ifscCode"
                      render={(props) => (
                        <div>
                          <TextInput {...props} placeholder="IFSC Code" />
                          {errors.ifscCode && <span style={{ color: "red" }}>{errors.ifscCode.message}</span>}
                        </div>
                      )}
                    />
                  </td>
                  <td data-label="MICR Code" style={{ textAlign: "left" }}>
                    <Controller
                      control={control}
                      name="micrCode"
                      render={(props) => (
                        <div>
                          <TextInput {...props} placeholder="MICR Code" disabled />
                          {errors.micrCode && <span style={{ color: "red" }}>{errors.micrCode.message}</span>}
                        </div>
                      )}
                    />
                  </td>
                  <td data-label="Account Number" style={{ textAlign: "left" }}>
                    <Controller
                      control={control}
                      name="AccountNumber"
                      render={(props) => (
                        <div>
                          <TextInput {...props} placeholder="Account Number" type="number" />
                          {errors.AccountNumber && <span style={{ color: "red" }}>{errors.AccountNumber.message}</span>}
                        </div>
                      )}
                    />
                  </td>
                  <td data-label="Bank Name" style={{ textAlign: "left" }}>
                    <Controller
                      control={control}
                      name="bankName"
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
                    <td>{row.ifscCode || "-"}</td>
                    <td>{row.micrCode || "-"}</td>
                    <td>{row.AccountNumber || "-"}</td>
                    <td>{row.bankName || "-"}</td>
                    <td>{row.branchName || "-"}</td>

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
