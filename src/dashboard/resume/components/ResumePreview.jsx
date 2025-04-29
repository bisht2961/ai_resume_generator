import React, { useContext } from "react";
import PersonalDetailPreview from "./preview/PersonalDetailPreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import SummaryPreview from "./preview/SummaryPreview";
import ExperiencePreview from "./preview/ExperiencePreview";
import EduPreview from "./preview/EduPreview";
import SkillsPreview from "./preview/SkillsPreview";

function ResumePreview() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  return (
    <div
      className="shadow-lg h-full p-14 border-t-[20px]"
      style={{
        borderColor: resumeInfo?.resume?.themeColor || "#4B5563",
      }}
    >
      {/* Personal Details */}
      <PersonalDetailPreview resumeInfo={resumeInfo} />

      {/* Summary */}
      <SummaryPreview resumeInfo={resumeInfo} />

      {/* Professional Experience */}
      <ExperiencePreview resumeInfo={resumeInfo} />

      {/* Education */}
      <EduPreview resumeInfo={resumeInfo} />

      {/* Skills */}
      <SkillsPreview resumeInfo={resumeInfo} />
    </div>
  );
}

export default ResumePreview;
