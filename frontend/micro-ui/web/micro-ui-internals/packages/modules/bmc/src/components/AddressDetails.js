import { CardLabel, Dropdown, LabelFieldPair, TextInput } from '@egovernments/digit-ui-react-components';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ToggleSwitch from "./Toggle";

const AddressDetailCard = ({ onUpdate, initialRows = {}, AllowEdit = false,tenantId}) => {
    const { t } = useTranslation();
    const [isEditable, setIsEditable] = useState();
    const headerLocale = Digit.Utils.locale.getTransformedLocale(tenantId);
    const { control, watch, formState: { errors, isValid }, trigger, setValue } = useForm({
        defaultValues: {
            house: initialRows.house || '',
            street: initialRows.street || '',
            landMark: initialRows.landMark || '',
            locality: initialRows.locality || '',
            city: initialRows.city || '',
            subDistrict: initialRows.subDistrict || '',
            district: initialRows.district || '',
            state: initialRows.state || '',
            zoneName: initialRows.zoneName || `${headerLocale}_ADMIN_${"Z-1"}`,
            pincode: initialRows.pincode || '',
            blockName: initialRows.blockName || `${headerLocale}_ADMIN_${"Ward-A"}`,
            wardName: initialRows.wardName || `${headerLocale}_ADMIN_${"NG_03"}`
        },
        mode: 'all'
    });
    
    const [zones, setZones] = useState([]);
    const [blocks, setBlocks] = useState([]);
    const [wards, setWards] = useState([]);

    Digit.Hooks.useLocation(tenantId, "Zone", {
        select: (data) => {
            const zonesData = [];
            const blocksData = [];
            const wardsData = [];

            data?.TenantBoundary[0]?.boundary.forEach((zone) => {
                zonesData.push({
                    code: zone.code,
                    name: zone.name,
                    i18nKey: `${headerLocale}_ADMIN_${zone.code}`,
                });

                zone.children.forEach((block) => {
                    blocksData.push({
                        code: block.code,
                        name: block.name,
                        zoneCode: zone.code,
                        i18nKey: `${headerLocale}_ADMIN_${block.code}`,
                    });

                    block.children.forEach((ward) => {
                        wardsData.push({
                            code: ward.code,
                            name: ward.name,
                            zoneCode: zone.code,
                            blockCode: block.code,
                            i18nKey: `${headerLocale}_ADMIN_${ward.code}`,
                        });
                    });
                });
            });
            setZones(zonesData);
            setBlocks(blocksData);
            setWards(wardsData);
            return {
                zonesData,
                blocksData,
                wardsData,
            };
        },
    });

    const selectedZone = watch("zoneName");
    const selectedBlock = watch("blockName");
    const [filteredBlocks, setFilteredBlocks] = useState([]);
    const [filteredWards, setFilteredWards] = useState([]);

    useEffect(() => {
        if (selectedZone && selectedZone.code) {
            const filtered = blocks.filter((block) => block.zoneCode === selectedZone.code);
            setFilteredBlocks(filtered);
            setValue("blockName", null); // Reset block dropdown
            setFilteredWards([]); // Clear wards when zone changes
            setValue("wardName", null); // Reset ward dropdown
        } else {
            setFilteredBlocks([]);
        }
    }, [blocks, selectedZone, setValue]);

    useEffect(() => {
        if (selectedBlock && selectedBlock.code) {
            const filtered = wards.filter((ward) => ward.blockCode === selectedBlock.code && ward.zoneCode === selectedZone.code);
            setFilteredWards(filtered);
            setValue("wardName", null); // Reset ward dropdown
        } else {
            setFilteredWards([]);
        }
    }, [wards, selectedBlock, selectedZone, setValue]);

    const formValues = watch();

    useEffect(() => {
        onUpdate(formValues, isValid);
    }, [formValues, isValid, onUpdate]);

    useEffect(() => {
        trigger(); // Validate the form on mount to show errors if fields are empty
    }, [trigger]);
    
    const handleToggle = () => {
        setIsEditable(!isEditable);
    };
    return (
        <React.Fragment>
            <form className="bmc-row-card-header">
                <div className="bmc-title">{t('Address Details')} <ToggleSwitch id={"AddressToggle"} isOn={isEditable} handleToggle={handleToggle} onLabel="Editable" offLabel="Readonly" disabled={!AllowEdit}/></div>
                <div className="bmc-card-row">
                    <div className="bmc-col3-card">
                        <LabelFieldPair>
                            <CardLabel className="bmc-label">{"BMC_House"}</CardLabel>
                            <Controller
                                control={control}
                                name={"house"}
                                rules={{ required: t('CORE_COMMON_REQUIRED_ERRMSG') }}
                                render={(props) => (
                                    <div>
                                        <TextInput
                                            disabled={!isEditable}
                                            readOnly={!isEditable}
                                            value={props.value}
                                            onChange={(e) => props.onChange(e.target.value)}
                                            onBlur={props.onBlur}
                                        />
                                        {errors.house && <span style={{ color: 'red' }}>{errors.house.message}</span>}
                                    </div>
                                )}
                            />
                        </LabelFieldPair>
                    </div>
                    <div className="bmc-col3-card">
                        <LabelFieldPair>
                            <CardLabel className="bmc-label">{"BMC_Street"}</CardLabel>
                            <Controller
                                control={control}
                                name={"street"}
                                rules={{ required: t('CORE_COMMON_REQUIRED_ERRMSG') }}
                                render={(props) => (
                                    <div>
                                        <TextInput
                                            disabled={!isEditable}
                                            readOnly={!isEditable}
                                            value={props.value}
                                            onChange={(e) => props.onChange(e.target.value)}
                                            onBlur={props.onBlur}
                                        />
                                        {errors.street && <span style={{ color: 'red' }}>{errors.street.message}</span>}
                                    </div>
                                )}
                            />
                        </LabelFieldPair>
                    </div>
                    <div className="bmc-col3-card">
                        <LabelFieldPair>
                            <CardLabel className="bmc-label">{"BMC_Landmark"}</CardLabel>
                            <Controller
                                control={control}
                                name={"landMark"}
                                rules={{ required: t('CORE_COMMON_REQUIRED_ERRMSG') }}
                                render={(props) => (
                                    <div>
                                        <TextInput
                                            disabled={!isEditable}
                                            readOnly={!isEditable}
                                            value={props.value}
                                            onChange={(e) => props.onChange(e.target.value)}
                                            onBlur={props.onBlur}
                                        />
                                        {errors.landMark && <span style={{ color: 'red' }}>{errors.landMark.message}</span>}
                                    </div>
                                )}
                            />
                        </LabelFieldPair>
                    </div>
                    <div className="bmc-col3-card">
                        <LabelFieldPair>
                            <CardLabel className="bmc-label">{"BMC_Locality"}</CardLabel>
                            <Controller
                                control={control}
                                name={"locality"}
                                rules={{ required: t('CORE_COMMON_REQUIRED_ERRMSG') }}
                                render={(props) => (
                                    <div>
                                        <TextInput
                                            disabled={!isEditable}
                                            readOnly={!isEditable}
                                            value={props.value}
                                            onChange={(e) => props.onChange(e.target.value)}
                                            onBlur={props.onBlur}
                                        />
                                        {errors.locality && <span style={{ color: 'red' }}>{errors.locality.message}</span>}
                                    </div>
                                )}
                            />
                        </LabelFieldPair>
                    </div>
                </div>
                <div className="bmc-card-row">
                    <div className="bmc-col3-card">
                        <LabelFieldPair>
                            <CardLabel className="bmc-label">{"BMC_City"}</CardLabel>
                            <Controller
                                control={control}
                                name={"city"}
                                rules={{ required: t('CORE_COMMON_REQUIRED_ERRMSG') }}
                                render={(props) => (
                                    <div>
                                        <TextInput
                                            disabled={!isEditable}
                                            readOnly={!isEditable}
                                            value={props.value}
                                            onChange={(e) => props.onChange(e.target.value)}
                                            onBlur={props.onBlur}
                                        />
                                        {errors.city && <span style={{ color: 'red' }}>{errors.city.message}</span>}
                                    </div>
                                )}
                            />
                        </LabelFieldPair>
                    </div>
                    <div className="bmc-col3-card">
                        <LabelFieldPair>
                            <CardLabel className="bmc-label">{"BMC_SubDistrict"}</CardLabel>
                            <Controller
                                control={control}
                                name={"subDistrict"}
                                rules={{ required: t('CORE_COMMON_REQUIRED_ERRMSG') }}
                                render={(props) => (
                                    <div>
                                        <TextInput
                                            disabled={!isEditable}
                                            readOnly={!isEditable}
                                            value={props.value}
                                            onChange={(e) => props.onChange(e.target.value)}
                                            onBlur={props.onBlur}
                                        />
                                        {errors.subDistrict && <span style={{ color: 'red' }}>{errors.subDistrict.message}</span>}
                                    </div>
                                )}
                            />
                        </LabelFieldPair>
                    </div>
                    <div className="bmc-col3-card">
                        <LabelFieldPair>
                            <CardLabel className="bmc-label">{"BMC_District"}</CardLabel>
                            <Controller
                                control={control}
                                name={"district"}
                                rules={{ required: t('CORE_COMMON_REQUIRED_ERRMSG') }}
                                render={(props) => (
                                    <div>
                                        <TextInput
                                            disabled={!isEditable}
                                            readOnly={!isEditable}
                                            value={props.value}
                                            onChange={(e) => props.onChange(e.target.value)}
                                            onBlur={props.onBlur}
                                        />
                                        {errors.district && <span style={{ color: 'red' }}>{errors.district.message}</span>}
                                    </div>
                                )}
                            />
                        </LabelFieldPair>
                    </div>
                    <div className="bmc-col3-card">
                        <LabelFieldPair>
                            <CardLabel className="bmc-label">{"BMC_State"}</CardLabel>
                            <Controller
                                control={control}
                                name={"state"}
                                rules={{ required: t('CORE_COMMON_REQUIRED_ERRMSG') }}
                                render={(props) => (
                                    <div>
                                        <TextInput
                                            disabled={!isEditable}
                                            readOnly={!isEditable}
                                            value={props.value}
                                            onChange={(e) => props.onChange(e.target.value)}
                                            onBlur={props.onBlur}
                                        />
                                        {errors.state && <span style={{ color: 'red' }}>{errors.state.message}</span>}
                                    </div>
                                )}
                            />
                        </LabelFieldPair>
                    </div>
                </div>
                <div className="bmc-card-row">
                    <div className="bmc-col3-card">
                        <LabelFieldPair>
                            <CardLabel className="bmc-label">{t('BMC_Pincode')}</CardLabel>
                            <Controller
                                control={control}
                                name="pincode"
                                rules={{ required: t('CORE_COMMON_REQUIRED_ERRMSG') }}
                                render={(props) => (
                                    <div>
                                        <TextInput
                                            disabled={!isEditable}
                                            readOnly={!isEditable}
                                            value={props.value}
                                            onChange={(e) => props.onChange(e.target.value)}
                                            onBlur={props.onBlur}
                                        />
                                        {errors.pincode && <span style={{ color: 'red' }}>{errors.pincode.message}</span>}
                                    </div>
                                )}
                            />
                        </LabelFieldPair>
                    </div>
                </div>
                <div className="bmc-card-row">
                    <div className="bmc-col3-card">
                        <LabelFieldPair>
                            <CardLabel className="bmc-label">{t('BMC_ZoneName*')}</CardLabel>
                            <Controller
                                control={control}
                                name="zoneName"
                                rules={{ required: t('CORE_COMMON_REQUIRED_ERRMSG') }}
                                render={(props) => (
                                    <div>
                                        {isEditable ? (
                                            <Dropdown
                                                placeholder={t('Select Zone')}
                                                selected={props.value}
                                                select={(zone) => props.onChange(zone)}
                                                onBlur={props.onBlur}
                                                option={zones}
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
                                        {errors.zoneName && <span style={{ color: 'red' }}>{errors.zoneName.message}</span>}
                                    </div>
                                )}
                            />
                        </LabelFieldPair>
                    </div>
                    <div className="bmc-col3-card">
                        <LabelFieldPair>
                            <CardLabel className="bmc-label">{t('BMC_BlockName*')}</CardLabel>
                            <Controller
                                control={control}
                                name="blockName"
                                rules={{ required: t('CORE_COMMON_REQUIRED_ERRMSG') }}
                                render={(props) => (
                                    <div>
                                        {isEditable ? (
                                            <Dropdown
                                                placeholder={t('Select Caste Category')}
                                                selected={props.value}
                                                select={(block) => props.onChange(block)}
                                                onBlur={props.onBlur}
                                                option={filteredBlocks}
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
                                        {errors.blockName && <span style={{ color: 'red' }}>{errors.blockName.message}</span>}
                                    </div>
                                )}
                            />
                        </LabelFieldPair>
                    </div>
                    <div className="bmc-col3-card">
                        <LabelFieldPair>
                            <CardLabel className="bmc-label">{t('BMC_Ward_Name*')}</CardLabel>
                            <Controller
                                control={control}
                                name="wardName"
                                rules={{ required: t('CORE_COMMON_REQUIRED_ERRMSG') }}
                                render={(props) => (
                                    <div>
                                        {isEditable ? (
                                            <Dropdown
                                                placeholder={t('Select SubWard')}
                                                selected={props.value}
                                                select={(ward) => props.onChange(ward)}
                                                onBlur={props.onBlur}
                                                option={filteredWards}
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
                                        {errors.wardName && <span style={{ color: 'red' }}>{errors.wardName.message}</span>}
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

export default AddressDetailCard;
