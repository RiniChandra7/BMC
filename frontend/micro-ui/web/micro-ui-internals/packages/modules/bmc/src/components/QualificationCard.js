import { AddIcon, Dropdown, RemoveIcon, TextInput } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import dropdownOptions from "../pagecomponents/dropdownOptions.json";

const QualificationCard = ({ tenantId, onUpdate, initialRows = [], AddOption = true, AllowRemove = true, ...props }) => {
  const { t } = useTranslation();
  const initialDefaultValues = {
    qualification: null,
    yearOfPassing: null,
    percentage: 0,
    board: null,
  };
  const headerLocale = Digit.Utils.locale.getTransformedLocale(tenantId);
  const [qualifications, setQualifications] = useState([]);
  const processCommonData = (data, headerLocale) => {
    return (
      data?.CommonDetails?.map((item) => ({
        code: item.id,
        name: item.name,
        i18nKey: `${headerLocale}_ADMIN_${item.name}`,
      })) || []
    );
  };

  const qualificationFunction = (data) => {
    const qualificationData = processCommonData(data, headerLocale);
    setQualifications(qualificationData);
    return { qualificationData };
  };

  const getQualification = { CommonSearchCriteria: { Option: "qualification" } };
  Digit.Hooks.bmc.useCommonGet(getQualification, { select: qualificationFunction });
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: initialDefaultValues,
  });
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(initialRows);
  }, [initialRows]);

  const years = Array.from({ length: new Date().getFullYear() - 1989 }, (v, k) => ({
    label: `${1990 + k}`,
    value: 1990 + k,
  }));

  const addRow = () => {
    const formData = getValues();
    const updatedRows = [
      ...rows,
      {
        qualification: formData.qualification,
        yearOfPassing: formData.yearOfPassing,
        percentage: formData.percentage,
        board: formData.board,
      },
    ];
    setRows(updatedRows);
    reset(initialDefaultValues);
    onUpdate(updatedRows); // Call the callback function to update the parent component
  };
  const removeRow = (index) => {
    const updatedRows = rows.filter((row, i) => i !== index);
    setRows(updatedRows);
    onUpdate(updatedRows); // Call the callback function to update the parent component
  };
  return (
    <React.Fragment>
      <div className="bmc-row-card-header">
        <div className="bmc-card-row">
          <div className="bmc-title">Qualification</div>
          <div className="bmc-table-container" style={{ padding: "1rem" }}>
            <form onSubmit={handleSubmit(addRow)}>
              <table className="bmc-hover-table">
                <thead>
                  <tr>
                    <th scope="col">Qualification</th>
                    <th scope="col">Year of Passing</th>
                    <th scope="col">Percentage</th>
                    <th scope="col">Board</th>
                    {AllowRemove && <th scope="col"></th>}
                  </tr>
                </thead>
                <tbody>
                  {AddOption && (
                    <tr>
                      <td data-label="Qualification" style={{ textAlign: "left" }}>
                        <Controller
                          control={control}
                          name="qualification"
                          rules={{ required: t("CORE_COMMON_REQUIRED_ERRMSG") }}
                          render={(props) => (
                            <div>
                              <Dropdown
                                placeholder="Select the Education Qualification"
                                selected={props.value}
                                select={(qualification) => props.onChange(qualification)}
                                option={qualifications}
                                optionKey="i18nKey"
                                t={t}
                                isMandatory={true}
                              />
                              {errors.qualification && <span style={{ color: "red" }}>{errors.qualification.message}</span>}
                            </div>
                          )}
                        />
                      </td>
                      <td data-label="Year of Passing" style={{ textAlign: "left" }}>
                        <Controller
                          control={control}
                          name="yearOfPassing"
                          rules={{ required: t("CORE_COMMON_REQUIRED_ERRMSG") }}
                          render={(props) => (
                            <div>
                              <Dropdown
                                placeholder="Select Year of Passing"
                                selected={props.value}
                                select={(year) => props.onChange(year)}
                                option={years}
                                optionKey="value"
                                t={t}
                                isMandatory={true}
                              />
                              {errors.yearOfPassing && <span style={{ color: "red" }}>{errors.yearOfPassing.message}</span>}
                            </div>
                          )}
                        />
                      </td>
                      <td data-label="Percentage" style={{ textAlign: "left" }}>
                        <Controller
                          control={control}
                          name="percentage"
                          rules={{
                            required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                            min: {
                              value: 0,
                              message: t("Percentage must be at least 0"),
                            },
                            max: {
                              value: 100,
                              message: t("Percentage must be at most 100"),
                            },
                          }}
                          render={(props) => (
                            <div>
                              <TextInput name="percentage" value={props.value} onChange={props.onChange} placeholder="Percentage" type="number" />
                              {errors.percentage && <span style={{ color: "red" }}>{errors.percentage.message}</span>}
                            </div>
                          )}
                        />
                      </td>
                      <td data-label="Board" style={{ textAlign: "left" }}>
                        <Controller
                          control={control}
                          name="board"
                          rules={{ required: t("CORE_COMMON_REQUIRED_ERRMSG") }}
                          render={(props) => (
                            <div>
                              <Dropdown
                                placeholder="Select Board"
                                selected={props.value}
                                select={(board) => props.onChange(board)}
                                option={dropdownOptions.board}
                                optionKey="value"
                                t={t}
                                isMandatory={true}
                              />
                              {errors.board && <span style={{ color: "red" }}>{errors.board.message}</span>}
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
                  )}

                  {rows.map((row, index) => (
                    <tr key={index}>
                      <td>{row.qualification ? row.qualification.i18nKey : "-"}</td>
                      <td>{row.yearOfPassing ? row.yearOfPassing.label : "-"}</td>
                      <td>{row.percentage}</td>
                      <td>{row.board ? row.board.label : "-"}</td>
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
      {/* <button type="button" onClick={() => onUpdate(rows)}>Save Qualifications</button> */}
    </React.Fragment>
  );
};

export default QualificationCard;
