import { CardLabel, Dropdown, LabelFieldPair } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
// Sample data constant
const SCHEME_DATA = {
    "SchemeDetails": [
        {
            "eventName": "Tech Conference 2024",
            "startDate": "2024-05-06",
            "endDate": "2024-08-06",
            "schemeshead": [
                {
                    "schemeHead": "Empowerment",
                    "schemeheadDesc": "Schemes for Citizen Empowerment",
                    "schemeDetails": [
                        {
                            "schemeID": 1,
                            "schemeName": "Women Empowerment",
                            "schemeDesc": "For Empowering Women Citizens",
                            "criteria": [
                                {
                                    "criteriaID": 6,
                                    "criteriaType": "Income",
                                    "criteriaCondition": "<=",
                                    "criteriaValue": "100000"
                                },
                                {
                                    "criteriaID": 4,
                                    "criteriaType": "Age",
                                    "criteriaCondition": ">=",
                                    "criteriaValue": "18"
                                },
                                {
                                    "criteriaID": 5,
                                    "criteriaType": "Age",
                                    "criteriaCondition": "<=",
                                    "criteriaValue": "60"
                                },
                                {
                                    "criteriaID": 1,
                                    "criteriaType": "Gender",
                                    "criteriaCondition": "=",
                                    "criteriaValue": "FEMALE"
                                },
                                {
                                    "criteriaID": 3,
                                    "criteriaType": "Gender",
                                    "criteriaCondition": "=",
                                    "criteriaValue": "TRANSGENDER"
                                }
                            ],
                            "courses": [],
                            "machines": [
                                {
                                    "machID": 3,
                                    "machName": "Laser Cutter",
                                    "machDesc": "A powerful laser cutter for cutting and engraving.",
                                    "machAmount": 3500.0
                                },
                                {
                                    "machID": 1,
                                    "machName": "3D Printer",
                                    "machDesc": "A high-resolution 3D printer for rapid prototyping.",
                                    "machAmount": 2500.0
                                },
                                {
                                    "machID": 2,
                                    "machName": "CNC Machine",
                                    "machDesc": "A versatile CNC machine for precise manufacturing.",
                                    "machAmount": 5000.0
                                }
                            ]
                        },
                        {
                            "schemeID": 4,
                            "schemeName": "Divyang Empowerment",
                            "schemeDesc": "For Empowering Divyang Citizens",
                            "criteria": [
                                {
                                    "criteriaID": 10,
                                    "criteriaType": "Disability",
                                    "criteriaCondition": ">",
                                    "criteriaValue": "70"
                                },
                                {
                                    "criteriaID": 6,
                                    "criteriaType": "Income",
                                    "criteriaCondition": "<=",
                                    "criteriaValue": "100000"
                                },
                                {
                                    "criteriaID": 4,
                                    "criteriaType": "Age",
                                    "criteriaCondition": ">=",
                                    "criteriaValue": "18"
                                }
                            ],
                            "courses": [],
                            "machines": [
                                {
                                    "machID": 1,
                                    "machName": "3D Printer",
                                    "machDesc": "A high-resolution 3D printer for rapid prototyping.",
                                    "machAmount": 2500.0
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "eventName": "Machine Learning Workshop",
            "startDate": "2024-05-06",
            "endDate": "2024-08-06",
            "schemeshead": [
                {
                    "schemeHead": "Skill Development",
                    "schemeheadDesc": "Schemes for Skill Development",
                    "schemeDetails": [
                        {
                            "schemeID": 2,
                            "schemeName": "Women Softskill Development",
                            "schemeDesc": "For Providing Softskills For Women Citizens",
                            "criteria": [
                                {
                                    "criteriaID": 11,
                                    "criteriaType": "Document",
                                    "criteriaCondition": "=",
                                    "criteriaValue": "Ration Card - yellow"
                                },
                                {
                                    "criteriaID": 6,
                                    "criteriaType": "Income",
                                    "criteriaCondition": "<=",
                                    "criteriaValue": "100000"
                                },
                                {
                                    "criteriaID": 4,
                                    "criteriaType": "Age",
                                    "criteriaCondition": ">=",
                                    "criteriaValue": "18"
                                },
                                {
                                    "criteriaID": 5,
                                    "criteriaType": "Age",
                                    "criteriaCondition": "<=",
                                    "criteriaValue": "60"
                                },
                                {
                                    "criteriaID": 1,
                                    "criteriaType": "Gender",
                                    "criteriaCondition": "=",
                                    "criteriaValue": "FEMALE"
                                },
                                {
                                    "criteriaID": 3,
                                    "criteriaType": "Gender",
                                    "criteriaCondition": "=",
                                    "criteriaValue": "TRANSGENDER"
                                }
                            ],
                            "courses": [
                                {
                                    "courseID": 2,
                                    "courseName": "Advanced Data Science",
                                    "courseDesc": "An in-depth course on data science techniques and tools.",
                                    "courseDuration": "12 weeks",
                                    "coursestartdate": "2021-06-14",
                                    "courseenddate": "2021-07-30",
                                    "courseUrl": "http://example.com/ds-course",
                                    "courseImageUrl": "http://example.com/ds-course/img.jpg",
                                    "courseInstitute": "Data Academy",
                                    "instituteAddress": "456 Data Blvd, Data City",
                                    "courseAmount": 2000.0
                                },
                                {
                                    "courseID": 1,
                                    "courseName": "Introduction to Machine Learning",
                                    "courseDesc": "This course covers the basics of machine learning and its applications.",
                                    "courseDuration": "10 weeks",
                                    "coursestartdate": "2021-06-01",
                                    "courseenddate": "2021-07-01",
                                    "courseUrl": "http://example.com/ml-course",
                                    "courseImageUrl": "http://example.com/ml-course/img.jpg",
                                    "courseInstitute": "Tech University",
                                    "instituteAddress": "123 Tech Street, Tech City",
                                    "courseAmount": 1500.0
                                }
                            ],
                            "machines": []
                        }
                    ]
                },
                {
                    "schemeHead": "Pension Schemes",
                    "schemeheadDesc": "Pension Schemes for Citizens",
                    "schemeDetails": [
                        {
                            "schemeID": 5,
                            "schemeName": "Divyang Pension (inr 18000/annum)",
                            "schemeDesc": "For Providing Financial Support to Divyang Citizens",
                            "criteria": [
                                {
                                    "criteriaID": 7,
                                    "criteriaType": "Disability",
                                    "criteriaCondition": ">=",
                                    "criteriaValue": "40"
                                },
                                {
                                    "criteriaID": 9,
                                    "criteriaType": "Disability",
                                    "criteriaCondition": "<=",
                                    "criteriaValue": "80"
                                },
                                {
                                    "criteriaID": 6,
                                    "criteriaType": "Income",
                                    "criteriaCondition": "<=",
                                    "criteriaValue": "100000"
                                }
                            ],
                            "courses": [],
                            "machines": []
                        }
                    ]
                }
            ]
        },
        {
            "eventName": "Data Science Summit",
            "startDate": "2024-05-06",
            "endDate": "2024-08-06",
            "schemeshead": [
                {
                    "schemeHead": "Pension Schemes",
                    "schemeheadDesc": "Pension Schemes for Citizens",
                    "schemeDetails": [
                        {
                            "schemeID": 3,
                            "schemeName": "Divyang Pension (inr 36,000/Annum)",
                            "schemeDesc": "For Providing Financial Support to Divyang Citizens",
                            "criteria": [
                                {
                                    "criteriaID": 8,
                                    "criteriaType": "Disability",
                                    "criteriaCondition": ">=",
                                    "criteriaValue": "80"
                                },
                                {
                                    "criteriaID": 6,
                                    "criteriaType": "Income",
                                    "criteriaCondition": "<=",
                                    "criteriaValue": "100000"
                                }
                            ],
                            "courses": [],
                            "machines": []
                        }
                    ]
                }
            ]
        }
    ]
};

const SearchApplications = () => {
    const { t } = useTranslation();
    const { control } = useForm();
    const [schemeHeads, setSchemeHeads] = useState([]);
    const [schemes, setSchemes] = useState([]);
    const [details, setDetails] = useState([]);
    const [selectedSchemeHead, setSelectedSchemeHead] = useState("");
    const [selectedScheme, setSelectedScheme] = useState("");

    useEffect(() => {
        // Group schemes by scheme head
        const groupedSchemeHeads = [];
        const schemeHeadMap = new Map();

        SCHEME_DATA.SchemeDetails.forEach(event => {
            event.schemeshead.forEach(schemeHead => {
                if (!schemeHeadMap.has(schemeHead.schemeHead)) {
                    schemeHeadMap.set(schemeHead.schemeHead, {
                        schemeHead: schemeHead.schemeHead,
                        schemeheadDesc: schemeHead.schemeheadDesc,
                        schemeDetails: [...schemeHead.schemeDetails]
                    });
                } else {
                    const existingSchemeHead = schemeHeadMap.get(schemeHead.schemeHead);
                    existingSchemeHead.schemeDetails.push(...schemeHead.schemeDetails);
                }
            });
        });

        schemeHeadMap.forEach(value => groupedSchemeHeads.push(value));
        setSchemeHeads(groupedSchemeHeads);
    }, []);

    const handleSchemeHeadChange = (selected) => {
        setSelectedSchemeHead(selected);
        setSelectedScheme("");
        setDetails([]);

        const selectedSchemeDetails = schemeHeads.find(head => head.schemeHead === selected)?.schemeDetails || [];
        setSchemes(selectedSchemeDetails);
        console.log('Selected Scheme Head:', selected); // Debugging line
        console.log('Scheme Options:', selectedSchemeDetails); // Debugging line
    };

    const handleSchemeChange = (selected) => {
        setSelectedScheme(selected);

        const selectedScheme = schemes.find(scheme => scheme.schemeID === selected);
        const details = [...(selectedScheme.courses || []), ...(selectedScheme.machines || [])];
        setDetails(details);
        console.log('Selected Scheme:', selected); // Debugging line
        console.log('Details Options:', details); // Debugging line
    };

    const schemeHeadOptions = schemeHeads.map(head => ({ value: head.schemeHead, label: head.schemeHead }));
    const schemeOptions = schemes.map(scheme => ({ value: scheme.schemeID, label: scheme.schemeName }));
    const detailOptions = details.map(detail => ({ value: detail.machID || detail.courseID, label: detail.machName || detail.courseName }));

    return (
        <div>
            <LabelFieldPair>
                <CardLabel className="bmc-label">{t("Scheme Heads")}</CardLabel>
                <Controller
                    control={control}
                    name="schemeHead"
                    rules={{ required: t("CORE_COMMON_REQUIRED_ERRMSG") }}
                    render={({ value, onChange, onBlur }) => (
                        <Dropdown
                            placeholder={t("Select Scheme Head")}
                            selected={value}
                            select={(value) => {
                                onChange(value);
                                handleSchemeHeadChange(value);
                            }}
                            onBlur={onBlur}
                            option={schemeHeadOptions}
                            optionKey="value"
                            t={t}
                        />
                    )}
                />
            </LabelFieldPair>

            <LabelFieldPair>
                <CardLabel className="bmc-label">{t("Schemes")}</CardLabel>
                <Controller
                    control={control}
                    name="scheme"
                    rules={{ required: t("CORE_COMMON_REQUIRED_ERRMSG") }}
                    render={({ value, onChange, onBlur }) => (
                        <Dropdown
                            placeholder={t("Select Scheme")}
                            selected={value}
                            select={(value) => {
                                onChange(value);
                                handleSchemeChange(value);
                            }}
                            onBlur={onBlur}
                            option={schemeOptions}
                            optionKey="value"
                            t={t}
                            disabled={!selectedSchemeHead}
                        />
                    )}
                />
            </LabelFieldPair>

            <LabelFieldPair>
                <CardLabel className="bmc-label">{t("Details")}</CardLabel>
                <Controller
                    control={control}
                    name="details"
                    rules={{ required: t("CORE_COMMON_REQUIRED_ERRMSG") }}
                    render={({ value, onChange, onBlur }) => (
                        <Dropdown
                            placeholder={t("Select Details")}
                            selected={value}
                            select={onChange}
                            onBlur={onBlur}
                            option={detailOptions}
                            optionKey="value"
                            t={t}
                            disabled={!selectedScheme}
                        />
                    )}
                />
            </LabelFieldPair>
        </div>
    );
};

export default SearchApplications;
