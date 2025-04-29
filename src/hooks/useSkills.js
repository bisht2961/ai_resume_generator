// src/hooks/usePersonalInfo.js
import { useContext } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { v4 as uuidv4 } from "uuid";

const useSkills = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const updateSkillsContext = (index,key, value) => {
    setResumeInfo((prev) => {
        const updatedSkills = [...(prev.skills || [])];
        if (updatedSkills[index]) {
            updatedSkills[index] = {
            ...updatedExperience[index],
            [key]: value,
          };
        }
        return {
          ...prev,
          skills: updatedSkills,
        };
      });
  };

  const removeSkillContext = (index) => {
    setResumeInfo((prev) => {
      const updatedSkills = [...(prev.skills || [])];
      if (updatedSkills.length > 0 && index >= 0) {
        updatedSkills.splice(index, 1); 
      }
      return {
        ...prev,
        skills: updatedSkills,
      };
    });
  };    

  const addSkillContext = () => {
    setResumeInfo((prev) => ({
      ...prev,
      skills: [
        ...(prev.skills || []),
        {
          id: uuidv4(), 
          name: "",
          rating: 0,
        },
      ]
    }));
  };
  return {
    skillsList: resumeInfo?.skills || [],
    updateSkillsContext,
    addSkillContext,
    removeSkillContext
  };
};

export default useSkills;
