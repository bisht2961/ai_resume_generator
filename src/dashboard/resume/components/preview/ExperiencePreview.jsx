import React from "react";
import useExperience from "../../../../hooks/useExperience";
import DOMPurify from "dompurify";

function ExperiencePreview({ resumeInfo }) {
  // const experienceList = resumeInfo?.experience || [];
  const { experienceList } = useExperience();

  const themeColor = resumeInfo?.resume?.themeColor || "#4B5563";

  // Check if experience section is empty
  const isEmpty =
    experienceList.length === 0 ||
    experienceList.every((exp) => !exp.title?.trim());

  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: themeColor }}
      >
        Professional Experience
      </h2>
      <hr style={{ borderColor: themeColor }} />

      {isEmpty ? (
        <div className="my-5 text-gray-400 italic text-xs">
          <h2 className="text-sm font-bold">Software Engineer</h2>
          <h2 className="text-xs flex justify-between">
            TechCorp - New York, NY
            <span>Jan 2021 - Present</span>
          </h2>
          <p className="my-2">
            Led a team of developers in designing and implementing scalable web
            applications using React and Node.js. Improved performance by 30%
            and collaborated cross-functionally with product and design teams.
          </p>
        </div>
      ) : (
        experienceList.map(
          (exp, index) =>
            exp.title?.trim() && (
              <div key={index} className="my-5">
                <h2 className="text-sm font-bold" style={{ color: themeColor }}>
                  {exp.title}
                </h2>
                <h2 className="text-xs flex justify-between">
                  {exp.companyName} - {exp.city}, {exp.state}
                  <span>
                    {exp.startDate} -{" "}
                    {exp.currentlyWorking ? "Present" : exp?.endDate}
                  </span>
                </h2>
                {exp?.workSummary && (
                  <div
                    className="text-xs my-2 prose prose-sm"
                    dangerouslySetInnerHTML={{ __html: exp.workSummary }}
                  />
                )}
              </div>
            )
        )
      )}
    </div>
  );
}

export default ExperiencePreview;
