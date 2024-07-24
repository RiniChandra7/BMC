import { CardLabel, Dropdown, LabelFieldPair, TextInput } from "@egovernments/digit-ui-react-components";
import isEqual from "lodash.isequal";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ToggleSwitch from "./Toggle";

const AddressDetailCard = ({ onUpdate, initialRows = {}, AllowEdit = false, tenantId }) => {
  const { t } = useTranslation();
  const [isEditable, setIsEditable] = useState(AllowEdit);
  const headerLocale = useMemo(() => Digit.Utils.locale.getTransformedLocale(tenantId), [tenantId]);

  const {
    control,
    watch,
    formState: { errors, isValid },
    trigger,
    setValue,
    clearErrors,
    getValues
  } = useForm({
    defaultValues: {
      house: initialRows.house || "",
      street: initialRows.street || "",
      landMark: initialRows.landMark || "",
      locality: initialRows.locality || "",
      city: initialRows.city || "",
      subDistrict: initialRows.subDistrict || "",
      district: initialRows.district || "",
      state: initialRows.state || "",
      zoneName: initialRows.zoneName || "",
      pincode: initialRows.pinCode || "",
      blockName: initialRows.blockName || "",
      wardName: initialRows.wardName || "",
    },
    mode: "onChange"
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

  const selectedWard = watch("wardName");
  const [filteredBlocks, setFilteredBlocks] = useState([]);
  const [filteredZones, setFilteredZones] = useState([]);

  useEffect(() => {
    if (selectedWard && selectedWard.code) {
      const selectedBlockCode = wards.find(ward => ward.code === selectedWard.code)?.blockCode;
      const selectedZoneCode = wards.find(ward => ward.code === selectedWard.code)?.zoneCode;

      if (selectedBlockCode) {
        const filteredBlocks = blocks.filter(block => block.code === selectedBlockCode);
        setFilteredBlocks(filteredBlocks);
        setValue("blockName", filteredBlocks[0]?.i18nKey || ""); // Automatically set the block name text field
      } else {
        setFilteredBlocks([]);
        setValue("blockName", ""); // Reset block text field
      }

      if (selectedZoneCode) {
        const filteredZones = zones.filter(zone => zone.code === selectedZoneCode);
        setFilteredZones(filteredZones);
        setValue("zoneName", filteredZones[0]?.i18nKey || ""); // Automatically set the zone name text field
      } else {
        setFilteredZones([]);
        setValue("zoneName", ""); // Reset zone text field
      }
    } else {
      setFilteredBlocks([]);
      setFilteredZones([]);
    }
  }, [wards, blocks, zones, selectedWard, setValue]);

  useEffect(() => {
    if (!selectedWard) {
      setFilteredBlocks([]);
      setFilteredZones([]);
      setValue("blockName", ""); // Reset block text field
      setValue("zoneName", ""); // Reset zone text field
    }
  }, [selectedWard, setValue]);

  const formValuesRef = useRef(getValues());
  const formValues = watch();

  const stableOnUpdate = useCallback((values, valid) => {
    onUpdate(values, valid);
  }, [onUpdate]);

  useEffect(() => {
    if (!isEqual(formValuesRef.current, formValues)) {
      formValuesRef.current = formValues;
      stableOnUpdate(formValues, isValid);
    }
  }, [formValues, isValid, stableOnUpdate]);

  useEffect(() => {
    trigger(); // Validate the form on mount to show errors if fields are empty
  }, [trigger]);

  function splitStringToArray(inputString, delimiter) {
    if (!inputString) {
      return [];
    }
    const dataArray = inputString.split(delimiter).filter(element => element !== "");
    return dataArray;
  }

  useEffect(() => {
    if (initialRows) {
      const addressArray = splitStringToArray(initialRows?.address, '|');
      const expectedLength = 10; // Number of expected elements in the address array

      // Ensure the address array has the required number of elements, filling missing elements with empty strings
      while (addressArray.length < expectedLength) {
        addressArray.push("");
      }

      setValue("house", addressArray[0] || "");
      setValue("street", addressArray[5] || "");
      setValue("landMark", addressArray[3] || "");
      setValue("locality", addressArray[7] || "");
      setValue("subDistrict", addressArray[4] || "");
      setValue("district", addressArray[8] || "");
      setValue("state", addressArray[9] || "");

      setValue("city", initialRows.city || "");
      setValue("pincode", initialRows.pinCode || "");

      const zonedata = zones.find(zone => zone.code === initialRows.zoneName) || "";
      const blockdata = blocks.find(block => block.code === initialRows.blockName) || "";
      const warddata = wards.find(ward => ward.code === initialRows.wardName) || "";

      setValue("zoneName", zonedata?.name || "");
      setValue("blockName", blockdata?.name || "");
      setValue("wardName", warddata || "");

      if (addressArray[0]) clearErrors("house");
      if (addressArray[5]) clearErrors("street");
      if (addressArray[3]) clearErrors("landMark");
      if (addressArray[7]) clearErrors("locality");
      if (addressArray[4]) clearErrors("subDistrict");
      if (addressArray[8]) clearErrors("district");
      if (addressArray[9]) clearErrors("state");
      if (initialRows.city) clearErrors("city");
      if (initialRows.pinCode) clearErrors("pincode");
      if (zonedata) clearErrors("zoneName");
      if (blockdata) clearErrors("blockName");
      if (warddata) clearErrors("wardName");
    }
  }, [initialRows, setValue, headerLocale, clearErrors, zones, blocks, wards]);

  const handleToggle = () => {
    setIsEditable(!isEditable);
  };

  return (
    <React.Fragment>
      <form className="bmc-row-card-header">
        <div className="bmc-card-row">
          <div className="bmc-col-large-header">
            <div className="bmc-title">{t("ADDRESS DETAILS")}</div>
          </div>
          <div className="bmc-col-small-header" style={{ textAlign: "end" }}>
            <ToggleSwitch
              id={"AddressToggle"}
              isOn={isEditable}
              handleToggle={handleToggle}
              onLabel="Editable"
              offLabel="Readonly"
              disabled={!AllowEdit}
            />
          </div>
        </div>
        <div className="bmc-card-row">
          <div className="bmc-col3-card">
            <LabelFieldPair>
              <CardLabel className="bmc-label">{"BMC_HOUSE"}</CardLabel>
              <Controller
                control={control}
                name={"house"}
                rules={{ required: t("CORE_COMMON_REQUIRED_ERRMSG") }}
                render={(props) => (
                  <div>
                    <TextInput
                      disabled={!isEditable}
                      readOnly={!isEditable}
                      value={props.value}
                      onChange={(e) => props.onChange(e.target.value)}
                      onBlur={props.onBlur}
                    />
                    {errors.house && <span style={{ color: "red" }}>{errors.house.message}</span>}
                  </div>
                )}
              />
            </LabelFieldPair>
          </div>
          <div className="bmc-col3-card">
            <LabelFieldPair>
              <CardLabel className="bmc-label">{"BMC_STREET"}</CardLabel>
              <Controller
                control={control}
                name={"street"}
                rules={{ required: t("CORE_COMMON_REQUIRED_ERRMSG") }}
                render={(props) => (
                  <div>
                    <TextInput
                      disabled={!isEditable}
                      readOnly={!isEditable}
                      value={props.value}
                      onChange={(e) => props.onChange(e.target.value)}
                      onBlur={props.onBlur}
                    />
                    {errors.street && <span style={{ color: "red" }}>{errors.street.message}</span>}
                  </div>
                )}
              />
            </LabelFieldPair>
          </div>
          <div className="bmc-col3-card">
            <LabelFieldPair>
              <CardLabel className="bmc-label">{"BMC_LANDMARK"}</CardLabel>
              <Controller
                control={control}
                name={"landMark"}
                rules={{ required: t("CORE_COMMON_REQUIRED_ERRMSG") }}
                render={(props) => (
                  <div>
                    <TextInput
                      disabled={!isEditable}
                      readOnly={!isEditable}
                      value={props.value}
                      onChange={(e) => props.onChange(e.target.value)}
                      onBlur={props.onBlur}
                    />
                    {errors.landMark && <span style={{ color: "red" }}>{errors.landMark.message}</span>}
                  </div>
                )}
              />
            </LabelFieldPair>
          </div>
          <div className="bmc-col3-card">
            <LabelFieldPair>
              <CardLabel className="bmc-label">{"BMC_LOCALITY"}</CardLabel>
              <Controller
                control={control}
                name={"locality"}
                rules={{ required: t("CORE_COMMON_REQUIRED_ERRMSG") }}
                render={(props) => (
                  <div>
                    <TextInput
                      disabled={!isEditable}
                      readOnly={!isEditable}
                      value={props.value}
                      onChange={(e) => props.onChange(e.target.value)}
                      onBlur={props.onBlur}
                    />
                    {errors.locality && <span style={{ color: "red" }}>{errors.locality.message}</span>}
                  </div>
                )}
              />
            </LabelFieldPair>
          </div>
        </div>
        <div className="bmc-card-row">
          <div className="bmc-col3-card">
            <LabelFieldPair>
              <CardLabel className="bmc-label">{"BMC_CITY"}</CardLabel>
              <Controller
                control={control}
                name={"city"}
                rules={{ required: t("CORE_COMMON_REQUIRED_ERRMSG") }}
                render={(props) => (
                  <div>
                    <TextInput
                      disabled={!isEditable}
                      readOnly={!isEditable}
                      value={props.value}
                      onChange={(e) => props.onChange(e.target.value)}
                      onBlur={props.onBlur}
                    />
                    {errors.city && <span style={{ color: "red" }}>{errors.city.message}</span>}
                  </div>
                )}
              />
            </LabelFieldPair>
          </div>
          <div className="bmc-col3-card">
            <LabelFieldPair>
              <CardLabel className="bmc-label">{"BMC_SUBDISTRICT"}</CardLabel>
              <Controller
                control={control}
                name={"subDistrict"}
                rules={{ required: t("CORE_COMMON_REQUIRED_ERRMSG") }}
                render={(props) => (
                  <div>
                    <TextInput
                      disabled={!isEditable}
                      readOnly={!isEditable}
                      value={props.value}
                      onChange={(e) => props.onChange(e.target.value)}
                      onBlur={props.onBlur}
                    />
                    {errors.subDistrict && <span style={{ color: "red" }}>{errors.subDistrict.message}</span>}
                  </div>
                )}
              />
            </LabelFieldPair>
          </div>
          <div className="bmc-col3-card">
            <LabelFieldPair>
              <CardLabel className="bmc-label">{"BMC_DISTRICT"}</CardLabel>
              <Controller
                control={control}
                name={"district"}
                rules={{ required: t("CORE_COMMON_REQUIRED_ERRMSG") }}
                render={(props) => (
                  <div>
                    <TextInput
                      disabled={!isEditable}
                      readOnly={!isEditable}
                      value={props.value}
                      onChange={(e) => props.onChange(e.target.value)}
                      onBlur={props.onBlur}
                    />
                    {errors.district && <span style={{ color: "red" }}>{errors.district.message}</span>}
                  </div>
                )}
              />
            </LabelFieldPair>
          </div>
          <div className="bmc-col3-card">
            <LabelFieldPair>
              <CardLabel className="bmc-label">{"BMC_STATE"}</CardLabel>
              <Controller
                control={control}
                name={"state"}
                rules={{ required: t("CORE_COMMON_REQUIRED_ERRMSG") }}
                render={(props) => (
                  <div>
                    <TextInput
                      disabled={!isEditable}
                      readOnly={!isEditable}
                      value={props.value}
                      onChange={(e) => props.onChange(e.target.value)}
                      onBlur={props.onBlur}
                    />
                    {errors.state && <span style={{ color: "red" }}>{errors.state.message}</span>}
                  </div>
                )}
              />
            </LabelFieldPair>
          </div>
        </div>
        <div className="bmc-card-row">
          <div className="bmc-col3-card">
            <LabelFieldPair>
              <CardLabel className="bmc-label">{t("BMC_PINCODE")}</CardLabel>
              <Controller
                control={control}
                name="pincode"
                rules={{ required: t("CORE_COMMON_REQUIRED_ERRMSG") }}
                render={(props) => (
                  <div>
                    <TextInput
                      disabled={!isEditable}
                      readOnly={!isEditable}
                      value={props.value}
                      onChange={(e) => props.onChange(e.target.value)}
                      onBlur={props.onBlur}
                    />
                    {errors.pincode && <span style={{ color: "red" }}>{errors.pincode.message}</span>}
                  </div>
                )}
              />
            </LabelFieldPair>
          </div>
          <div className="bmc-col3-card">
            <LabelFieldPair>
              <CardLabel className="bmc-label">{t("BMC_WARD_NAME")}</CardLabel>
              <Controller
                control={control}
                name="wardName"
                rules={{ required: t("CORE_COMMON_REQUIRED_ERRMSG") }}
                render={(props) => (
                  <div>
                    {isEditable ? (
                      <Dropdown
                        placeholder={t("SELECT SUBWARD")}
                        selected={props.value}
                        select={(ward) => props.onChange(ward)}
                        onBlur={props.onBlur}
                        option={wards}
                        optionKey="i18nKey"
                        t={t}
                        isMandatory={true}
                      />
                    ) : (
                      <TextInput readOnly value={props.value?.name || ""} />
                    )}
                    {errors.wardName && <span style={{ color: "red" }}>{errors.wardName.message}</span>}
                  </div>
                )}
              />
            </LabelFieldPair>
          </div>
          <div className="bmc-col3-card">
            <LabelFieldPair>
              <CardLabel className="bmc-label">{t("BMC_ZONENAME")}</CardLabel>
              <Controller
                control={control}
                name="zoneName"
                render={(props) => (
                  <div>
                    <TextInput
                      disabled
                      readOnly
                      value={props.value || ""}
                    />
                  </div>
                )}
              />
            </LabelFieldPair>
          </div>
          <div className="bmc-col3-card">
            <LabelFieldPair>
              <CardLabel className="bmc-label">{t("BMC_BLOCKNAME")}</CardLabel>
              <Controller
                control={control}
                name="blockName"
                render={(props) => (
                  <div>
                    <TextInput
                      disabled
                      readOnly
                      value={props.value || ""}
                    />
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
