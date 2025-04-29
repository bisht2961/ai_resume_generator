import React, { useEffect } from "react";
// import usePersonalInfo from '../../../../hooks/usePersonalInfo'

function PersonalDetailPreview({ resumeInfo }) {

  const personal = resumeInfo?.personalInfo || {};
  
  const isEmpty =
    !personal?.firstName &&
    !personal?.lastName &&
    !personal?.jobTitle &&
    !personal?.address &&
    !personal?.phone &&
    !personal?.email;

  const themeColor = resumeInfo?.resume?.themeColor || "#4B5563"; // Default to gray-700

  return (
    <div>
      {isEmpty ? (
        <>
          <h2 className="font-bold text-xl text-center text-gray-400 italic">
            John Doe
          </h2>
          <h2 className="text-center text-sm font-medium text-gray-400 italic">
            Software Engineer
          </h2>
          <h2 className="text-center font-normal text-xs text-gray-400 italic">
            1234 Placeholder Street, City, Country
          </h2>

          <div className="flex justify-between">
            <h2 className="font-normal text-xs text-gray-400 italic">
              +1 (555) 123-4567
            </h2>
            <h2 className="font-normal text-xs text-gray-400 italic">
              johndoe@example.com
            </h2>
          </div>
          <hr className="border-[1.5px] my-2 border-gray-300" />
        </>
      ) : (
        <>
          <h2
            className="font-bold text-xl text-center"
            style={{ color: themeColor }}
          >
            {personal?.firstName} {personal?.lastName}
          </h2>
          <h2
            className="text-center text-sm font-medium"
            style={{ color: themeColor }}
          >
            {personal?.jobTitle}
          </h2>
          <h2
            className="text-center font-normal text-xs"
            style={{ color: themeColor }}
          >
            {personal?.address}
          </h2>

          <div className="flex justify-between">
            <h2
              className="font-normal text-xs"
              style={{ color: themeColor }}
            >
              {personal?.phone}
            </h2>
            <h2
              className="font-normal text-xs"
              style={{ color: themeColor }}
            >
              {personal?.email}
            </h2>
          </div>
          <hr
            className="border-[1.5px] my-2"
            style={{ borderColor: themeColor }}
          />
        </>
      )}
    </div>
  );
}

export default PersonalDetailPreview;
