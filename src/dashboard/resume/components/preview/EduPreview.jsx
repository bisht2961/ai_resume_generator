import React from "react";

function EduPreview({ resumeInfo }) {
  const educationList = resumeInfo?.education || [];
  const themeColor = resumeInfo?.resume?.themeColor || "#4B5563";

  const isEmpty =
    educationList.length === 0 ||
    educationList.every(edu => !edu?.universityName?.trim());

  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: themeColor }}
      >
        Education
      </h2>
      <hr style={{ borderColor: themeColor }} />

      {isEmpty ? (
        <div className="my-5 text-gray-400 italic text-xs">
          <h2 className="text-sm font-bold">State University</h2>
          <h2 className="text-xs flex justify-between">
            B.Tech in Computer Science
            <span>2016 - 2020</span>
          </h2>
          <p className="my-2">
            Completed coursework in data structures, machine learning, and cloud computing. Graduated with distinction and led multiple tech club initiatives.
          </p>
        </div>
      ) : (
        educationList.map((edu, index) => (
          <div key={index} className="my-5">
            <h2
              className="text-sm font-bold"
              style={{ color: themeColor }}
            >
              {edu?.universityName}
            </h2>
            <h2 className="text-xs flex justify-between">
              {edu?.degree} in {edu?.major}
              <span>
                {edu?.startDate} - {edu?.endDate}
              </span>
            </h2>
            <p className="text-xs my-2">{edu?.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default EduPreview;
