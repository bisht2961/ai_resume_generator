// src/hooks/usePersonalInfo.js
import { useContext } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

const usePersonalInfo = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const updatePersonalInfoContext = (key, value) => {
    setResumeInfo((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [key]: value,
      },
    }));
  };

  return {
    personalInfo: resumeInfo?.personalInfo || {},
    updatePersonalInfoContext,
  };
};

export default usePersonalInfo;
