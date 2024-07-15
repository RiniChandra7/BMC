import { CardLabel, Dropdown, LabelFieldPair, TextInput } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ToggleSwitch from "./Toggle";

const DisabilityCard = ({ tenantId,onUpdate, initialRows = [], AllowEdit = false, ...props }) => {
    const { t } = useTranslation();
    const [isEditable, setIsEditable] = useState();
    const [focusIndex, setFocusIndex] = useState({ index: -1, type: "" });
    const [rangeValue, setRangeValue] = useState(initialRows.length > 0 ? initialRows[0].disabilityPercentage : 1);
    const [divyangs, setDivyangs] = useState([]);
    const headerLocale = Digit.Utils.locale.getTransformedLocale(tenantId);
    const processCommonData = (data, headerLocale) => {
        return (
          data?.CommonDetails?.map((item) => ({
            code: item.id,
            name: item.name,
            i18nKey: `${headerLocale}_ADMIN_${item.name}`,
          })) || []
        );
      };
    const handleChange = (e) => {
        setRangeValue(parseInt(e.target.value));
    };

    const divyangFunction = (data) => {
        const divyangData = processCommonData(data, headerLocale);
        setDivyangs(divyangData);
        return { divyangData };
    };

    const getDivyang = { CommonSearchCriteria: { Option: "divyang" } };
    Digit.Hooks.bmc.useCommonGet(getDivyang, { select: divyangFunction });
    const initialDefaultValues = {
        udidid: initialRows.length > 0 ? initialRows[0].udidid : "",
        disabilitytype: initialRows.length > 0 ? initialRows[0].disabilitytype : "",
        disabilityPercentage: initialRows.length > 0 ? initialRows[0].disabilityPercentage : 1,
    };

    const { control, watch, formState: { errors, isValid }, trigger } = useForm({
        defaultValues: initialDefaultValues,
    });

    const formValues = watch();

    useEffect(() => {
        onUpdate(formValues, isValid);
    }, [formValues, isValid, onUpdate]);

    useEffect(() => {
        trigger(); // Validate the form on mount to show errors if fields are empty
    }, [trigger]);

    useEffect(() => {
        control.setValue("disabilityPercentage", rangeValue);
    }, [rangeValue, control]);
    
    const handleToggle = () => {
            setIsEditable(!isEditable);
    };
    
    return (
        <React.Fragment>
            <div className="bmc-row-card-header">
                <div className="bmc-card-row">
                    <div className="bmc-title">Disability <ToggleSwitch id={"DisabilityToggle"} isOn={isEditable} handleToggle={handleToggle} onLabel="Editable" offLabel="Readonly" disabled={!AllowEdit}/></div>
                    
                    <div className="bmc-col3-card">
                        <LabelFieldPair>
                            <CardLabel className="bmc-label">{t("BMC_UDID_Id*")}</CardLabel>
                            <Controller
                                control={control}
                                name={"udidid"}
                                rules={{ required: t('CORE_COMMON_REQUIRED_ERRMSG') }}
                                render={(props) => (
                                    <div>
                                        <TextInput
                                            {...props}
                                            disabled={!isEditable}
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
                                        {errors.udidid && <span style={{ color: 'red' }}>{errors.udidid.message}</span>}
                                    </div>
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
                                    <div>
                                        {isEditable ? (
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
                                        ) : (
                                            <TextInput
                                                readOnly
                                                value={props.value?.label || ''}
                                            />
                                        )}
                                        {errors.disabilitytype && <span style={{ color: 'red' }}>{errors.disabilitytype.message}</span>}
                                    </div>
                                )}
                            />
                        </LabelFieldPair>
                    </div>
                    <div className="bmc-col2-card">
                        <div className="bmc-range-container">
                            <CardLabel className="bmc-label">{t("BMC_Disability_Percentage*")}</CardLabel>
                            <Controller
                                control={control}
                                name={"disabilityPercentage"}
                                rules={{
                                    required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                                }}
                                render={(props) => (
                                    <div>
                                        <input
                                            disabled={!isEditable}
                                            type="range"
                                            min="1"
                                            max="100"
                                            className="bmc-range-slider"
                                            value={rangeValue}
                                            onChange={(e) => {
                                                handleChange(e);
                                                props.onChange(e.target.value);
                                            }}
                                            list="tickmarks"
                                        />
                                        <datalist id="tickmarks">
                                            {Array.from({ length: 100 }, (_, i) => (
                                                <option key={i} value={i + 1}></option>
                                            ))}
                                        </datalist>
                                        <span className="range-value">Disability: {rangeValue}%</span>
                                        {errors.disabilityPercentage && <span style={{ color: 'red' }}>{errors.disabilityPercentage.message}</span>}
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default DisabilityCard;
