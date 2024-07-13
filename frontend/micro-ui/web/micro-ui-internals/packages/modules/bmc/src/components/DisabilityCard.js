import { CardLabel, Dropdown, LabelFieldPair, TextInput } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const DisabilityCard = ({ divyangs, onUpdate, initialRows = [], ...props }) => {
    const { t } = useTranslation();
    const [focusIndex, setFocusIndex] = useState({ index: -1, type: "" });
    const [rangeValue, setRangeValue] = useState(1);

    const handleChange = (e) => {
        setRangeValue(parseInt(e.target.value));
    };

    const initialDefaultValues = {
        udidid: initialRows.length > 0 ? initialRows[0].udidid : null,
        disabilitytype: initialRows.length > 0 ? initialRows[0].disabilitytype : null,
        disabilityPercentage: initialRows.length > 0 ? initialRows[0].disabilityPercentage : 1
    };

    const { control, handleSubmit, reset, getValues, setValue, formState: { errors } } = useForm({
        defaultValues: initialDefaultValues
    });

    const [rows, setRows] = useState([]);

    useEffect(() => {
        setRows(initialRows);
        if (initialRows.length > 0) {
            const firstRow = initialRows[0];
            setRangeValue(firstRow.disabilityPercentage);
            setValue("udidid", firstRow.udidid);
            setValue("disabilitytype", firstRow.disabilitytype);
        }
    }, [initialRows, setValue]);

    const addRow = (data) => {
        const updatedRows = [...rows, { ...data, disabilityPercentage: rangeValue }];
        setRows(updatedRows);
        reset(initialDefaultValues);
        setRangeValue(1);
        onUpdate(updatedRows); // Call the callback function to update the parent component
    };

    return (
        <React.Fragment>
            <div className="bmc-row-card-header">
                <div className="bmc-card-row">
                    <div className="bmc-title">Disability</div>
                    <div className="bmc-col3-card">
                        <LabelFieldPair>
                            <CardLabel className="bmc-label">{t("BMC_UDID_Id*")}</CardLabel>
                            <Controller
                                control={control}
                                name={"udidid"}
                                render={(props) => (
                                    <TextInput
                                        {...props}
                                        isMandatory={true}
                                        placeholder={"Enter the udid ID"}
                                        autoFocus={focusIndex.index === props.name}
                                        onChange={(e) => {
                                            props.onChange(e.target.value);
                                            setFocusIndex({ index: props.name });
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
                            <CardLabel className="bmc-label">{t("BMC_Disability_Type*")}</CardLabel>
                            <Controller
                                control={control}
                                name={"disabilitytype"}
                                rules={{
                                    required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                                }}
                                render={(props) => (
                                    <Dropdown
                                        placeholder="Select the Disability Type"
                                        selected={props.value}
                                        select={(divyang) => props.onChange(divyang)}
                                        onBlur={props.onBlur}
                                        option={divyangs}
                                        optionKey="i18nKey"
                                        t={t}
                                        isMandatory={true}
                                    />
                                )}
                            />
                        </LabelFieldPair>
                    </div>
                    <div className="bmc-col2-card">
                        <CardLabel className="bmc-label">{t("BMC_Disability_Percentage*")}</CardLabel>
                        <div className="bmc-range-container">
                            <input type="range" min="1" max="100" className="bmc-range-slider" value={rangeValue} onChange={handleChange} list="tickmarks" />
                            <datalist id="tickmarks">
                                {Array.from({ length: 100 }, (_, i) => (
                                    <option key={i} value={i + 1}></option>
                                ))}
                            </datalist>
                            <span className="range-value">Selected value: {rangeValue}%</span>
                        </div>
                    </div>
                    <div className="bmc-col3-card">
                        <button type="button" onClick={handleSubmit(addRow)} className="bmc-add-button">
                            Add Disability
                        </button>
                    </div>
                </div>
            </div>
            <div className="bmc-card-row">
                <table className="bmc-hover-table">
                    <thead>
                        <tr>
                            <th>UDID ID</th>
                            <th>Disability Type</th>
                            <th>Disability Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <tr key={index}>
                                <td>{row.udidid}</td>
                                <td>{row.disabilitytype?.i18nKey}</td>
                                <td>{row.disabilityPercentage}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
};

export default DisabilityCard;
