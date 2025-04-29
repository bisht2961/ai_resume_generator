import { useContext } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

const useSummary = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const updateSummaryContext = (key, value) => {
    setResumeInfo((prev) => ({
      ...prev,
      summary: {
        ...prev.summary,
        [key]: value,
      },
    }));
  };

  return {
    resume_summary: resumeInfo?.summary || {},
    updateSummaryContext,
  };
};

export default useSummary;
