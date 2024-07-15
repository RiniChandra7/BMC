import { CardLabel, DatePicker, Dropdown, LabelFieldPair, TextInput } from '@egovernments/digit-ui-react-components';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import dropdownOptions from '../pagecomponents/dropdownOptions.json';

const PersonalDetailCard = ({ onUpdate, initialRows = {}, AllowEdit = false, tenantId}) => {
    const { t } = useTranslation();
    const { control, watch, formState: { errors, isValid }, trigger } = useForm({
        defaultValues: {
            firstName: initialRows.firstName || '',
            middleName: initialRows.middleName || '',
            lastName: initialRows.lastName || '',
            dob: initialRows.dob || '',
            gender: initialRows.gender || '',
            father: initialRows.father || '',
            religion: initialRows.religion || '',
            casteCategory: initialRows.casteCategory || ''
        },
        mode: 'all'
    });
    const headerLocale = Digit.Utils.locale.getTransformedLocale(tenantId);
    const [castes, setCastes] = useState([]);
    const [religions, setReligions] = useState([]);
    const processCommonData = (data, headerLocale) => {
        return (
            data?.CommonDetails?.map((item) => ({
                code: item.id,
                name: item.name,
                i18nKey: `${headerLocale}_ADMIN_${item.name}`,
            })) || []
        );
    };

    const casteFunction = (data) => {
        const castesData = processCommonData(data, headerLocale);
        setCastes(castesData);
        return { castesData };
    };

    const religionFunction = (data) => {
        const religionsData = processCommonData(data, headerLocale);
        setReligions(religionsData);
        return { religionsData };
    };

    const getCaste = { CommonSearchCriteria: { Option: "caste" } };
    const getReligion = { CommonSearchCriteria: { Option: "religion" } };

    Digit.Hooks.bmc.useCommonGet(getCaste, { select: casteFunction });
    Digit.Hooks.bmc.useCommonGet(getReligion, { select: religionFunction });
    const formValues = watch();

    useEffect(() => {
        onUpdate(formValues, isValid);
    }, [formValues, isValid, onUpdate]);

    useEffect(() => {
        trigger(); // Validate the form on mount to show errors if fields are empty
    }, [trigger]);

    return (
        <React.Fragment>
            <form className="bmc-row-card-header">
                <div className="bmc-title">{t('Personal Details')}</div>
                <div className="bmc-card-row">
                    <div className="bmc-col1-card">
                        <LabelFieldPair>
                            <CardLabel className="bmc-label">{t('BMC_First_Name')}</CardLabel>
                            <Controller
                                control={control}
                                name="firstName"
                                rules={{ required: t('CORE_COMMON_REQUIRED_ERRMSG') }}
                                render={(props) => (
                                    <div>
                                        <TextInput
                                            disabled={!AllowEdit}
                                            readOnly={!AllowEdit}
                                            value={props.value}
                                            onChange={(e) => props.onChange(e.target.value)}
                                            onBlur={props.onBlur}
                                        />
                                        {errors.firstName && <span style={{ color: 'red' }}>{errors.firstName.message}</span>}
                                    </div>
                                )}
                            />
                        </LabelFieldPair>
                    </div>
                    <div className="bmc-col1-card">
                        <LabelFieldPair>
                            <CardLabel className="bmc-label">{t('BMC_Middle_Name')}</CardLabel>
                            <Controller
                                control={control}
                                name="middleName"
                                rules={{ required: t('CORE_COMMON_REQUIRED_ERRMSG') }}
                                render={(props) => (
                                    <div>
                                        <TextInput
                                            disabled={!AllowEdit}
                                            readOnly={!AllowEdit}
                                            value={props.value}
                                            onChange={(e) => props.onChange(e.target.value)}
                                            onBlur={props.onBlur}
                                        />
                                        {errors.middleName && <span style={{ color: 'red' }}>{errors.middleName.message}</span>}
                                    </div>
                                )}
                            />
                        </LabelFieldPair>
                    </div>
                    <div className="bmc-col1-card">
                        <LabelFieldPair>
                            <CardLabel className="bmc-label">{t('BMC_Last_Name')}</CardLabel>
                            <Controller
                                control={control}
                                name="lastName"
                                rules={{ required: t('CORE_COMMON_REQUIRED_ERRMSG') }}
                                render={(props) => (
                                    <div>
                                        <TextInput
                                            disabled={!AllowEdit}
                                            readOnly={!AllowEdit}
                                            value={props.value}
                                            onChange={(e) => props.onChange(e.target.value)}
                                            onBlur={props.onBlur}
                                        />
                                        {errors.lastName && <span style={{ color: 'red' }}>{errors.lastName.message}</span>}
                                    </div>
                                )}
                            />
                        </LabelFieldPair>
                    </div>
                </div>
                <div className="bmc-card-row">
                    <div className="bmc-col1-card">
                        <LabelFieldPair>
                            <CardLabel className="bmc-label">{t('BMC_Date_Of_Birth')}</CardLabel>
                            <Controller
                                control={control}
                                name="dob"
                                rules={{ required: t('CORE_COMMON_REQUIRED_ERRMSG') }}
                                render={(props) => (
                                    <div>
                                        <DatePicker
                                            disabled={!AllowEdit}
                                            date={props.value}
                                            onChange={props.onChange}
                                            onBlur={props.onBlur}
                                        />
                                        {errors.dob && <span style={{ color: 'red' }}>{errors.dob.message}</span>}
                                    </div>
                                )}
                            />
                        </LabelFieldPair>
                    </div>
                    <div className="bmc-col1-card">
                        <LabelFieldPair>
                            <CardLabel className="bmc-label">{t('BMC_Gender')}</CardLabel>
                            <Controller
                                control={control}
                                name="gender"
                                rules={{ required: t('CORE_COMMON_REQUIRED_ERRMSG') }}
                                render={(props) => (
                                    <div>
                                        {AllowEdit ? (
                                            <Dropdown
                                                placeholder={t('Select Gender')}
                                                selected={props.value}
                                                select={props.onChange}
                                                onBlur={props.onBlur}
                                                option={dropdownOptions.gender}
                                                optionKey="label"
                                                t={t}
                                                isMandatory={true}
                                            />
                                        ) : (
                                            <TextInput
                                                readOnly
                                                value={props.value?.label || ''}
                                            />
                                        )}
                                        {errors.gender && <span style={{ color: 'red' }}>{errors.gender.message}</span>}
                                    </div>
                                )}
                            />
                        </LabelFieldPair>
                    </div>
                    <div className="bmc-col1-card">
                        <LabelFieldPair>
                            <CardLabel className="bmc-label">{t('BMC_Father')}</CardLabel>
                            <Controller
                                control={control}
                                name="father"
                                rules={{ required: t('CORE_COMMON_REQUIRED_ERRMSG') }}
                                render={(props) => (
                                    <div>
                                        <TextInput
                                            disabled={!AllowEdit}
                                            readOnly={!AllowEdit}
                                            value={props.value}
                                            onChange={(e) => props.onChange(e.target.value)}
                                            onBlur={props.onBlur}
                                        />
                                        {errors.father && <span style={{ color: 'red' }}>{errors.father.message}</span>}
                                    </div>
                                )}
                            />
                        </LabelFieldPair>
                    </div>
                </div>
                <div className="bmc-card-row">
                    <div className="bmc-col1-card">
                        <LabelFieldPair>
                            <CardLabel className="bmc-label">{t('BMC_Religion*')}</CardLabel>
                            <Controller
                                control={control}
                                name="religion"
                                rules={{ required: t('CORE_COMMON_REQUIRED_ERRMSG') }}
                                render={(props) => (
                                    <div>
                                        {AllowEdit ? (
                                            <Dropdown
                                                placeholder={t('Select Religion')}
                                                selected={props.value}
                                                select={props.onChange}
                                                onBlur={props.onBlur}
                                                option={religions}
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
                                        {errors.religion && <span style={{ color: 'red' }}>{errors.religion.message}</span>}
                                    </div>
                                )}
                            />
                        </LabelFieldPair>
                    </div>
                    <div className="bmc-col1-card">
                        <LabelFieldPair>
                            <CardLabel className="bmc-label">{t('BMC_CasteCategory*')}</CardLabel>
                            <Controller
                                control={control}
                                name="casteCategory"
                                rules={{ required: t('CORE_COMMON_REQUIRED_ERRMSG') }}
                                render={(props) => (
                                    <div>
                                        {AllowEdit ? (
                                            <Dropdown
                                                placeholder={t('Select Caste Category')}
                                                selected={props.value}
                                                select={props.onChange}
                                                onBlur={props.onBlur}
                                                option={castes}
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
                                        {errors.casteCategory && <span style={{ color: 'red' }}>{errors.casteCategory.message}</span>}
                                    </div>
                                )}
                            />
                        </LabelFieldPair>
                    </div>
                </div>
            </form>
        </React.Fragment>
    );
};

export default PersonalDetailCard;
