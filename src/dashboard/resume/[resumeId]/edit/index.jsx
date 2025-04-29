import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../../components/FormSection";
import ResumePreview from "../../components/ResumePreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useResumeApi } from "../../../../hooks/useResumeApi";
import { mapPersonalInfo, mapExperience, mapEducation, mapSkills, mapResumeData } from "../../../../utils/utils";
import { LoaderCircle } from "lucide-react";

function EditResume() {
  
  const {resumeId} = useParams();
  const [resumeInfo, setResumeInfo] = useState();
  const { getResume,getPersonalInfo ,getExperienceById, getSkillsById, getEducationById,getSummaryById } = useResumeApi()
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log(resumeId)
    resumeId&&getResumeInfo();
  }, []);


  const getResumeInfo = async () => {
    try {
      setLoading(true);
      const [resume,personalInfo, experience, education, skills, summary ] = await Promise.allSettled([
        getResume(resumeId),
        getPersonalInfo(resumeId),
        getExperienceById(resumeId),
        getEducationById(resumeId),
        getSkillsById(resumeId),        
        getSummaryById(resumeId),
      ]);
  
      const resumeData = resume.status === 'fulfilled' ? mapResumeData(resume.value.data?.data[0]): {};
      const personalInfoData = personalInfo.status === 'fulfilled' ? mapPersonalInfo(personalInfo.value.data?.data[0]) : {};
      const experienceData = experience.status === 'fulfilled' ? mapExperience(experience.value.data?.data) : {};
      const educationData = education.status === 'fulfilled' ? mapEducation(education.value.data?.data) : {};
      const skillsData = skills.status === 'fulfilled' ? mapSkills(skills.value.data?.data) : {};
      const summaryData = summary.status === 'fulfilled' ? summary.value.data?.data[0]: {};

      setResumeInfo({
        resume: resumeData,
        experience: experienceData,
        education: educationData,
        skills: skillsData,
        summary: summaryData,
        personalInfo: personalInfoData,
      });
      console.log({ resumeData, experienceData, educationData, skillsData, summaryData, personalInfoData });
      setLoading(false);
    } catch (err) {
      console.error("Unexpected error:", err); // Only if something weird happens (not in individual API calls)
      setLoading(false);
    }
  };

  return (
    <ResumeInfoContext.Provider value={{resumeInfo, setResumeInfo}}>
      {loading ? (
        <div className="flex items-center justify-center h-screen w-screen">
          <LoaderCircle className="animate-spin" size={50} color="#000" />
        </div>
      ) : (
        <div className="flex gap-10 p-10">
          <div className="w-1/3 border-r-2 pr-5">
            <FormSection resumeInfo={resumeInfo} />
          </div>
          <div className="w-2/3">
            <ResumePreview resumeInfo={resumeInfo} />
          </div>
        </div>
      )}
    </ResumeInfoContext.Provider>
  );
}

export default EditResume;
