import { useApi } from "./useApi";
import {
  UpdatePersonalInfoDetail,
  GetResumeById,
  DeleteResumeById,
  UpdateResume,
  GetAllResume,
  GetExperienceById,
  GetEducationById,
  GetSkillsById,
  GetPersonalInfo,
  GetSummaryById,
  GetAISummary,
  UpdateResumeSummary,
  UpdateExperienceResume,
  GetAIExperience,
  DeleteExperienceById,
  RegenerateAIExperience,
  UpdateEducation,
  DeleteEducationById,
  UpdateSkills,
  DeleteSkillsById
} from "../../services/resumeService";
import { use } from "react";

export const useResumeApi = () => {


  const updateResume = useApi(UpdateResume);
  const deleteResume = useApi(DeleteResumeById);
  const updatePersonalInfo = useApi(UpdatePersonalInfoDetail);
  const fetchResumeId = useApi(GetResumeById);
  const removeResume = useApi(DeleteResumeById);
  const fetchAllResume = useApi(GetAllResume);
  const fetchExperienceById = useApi(GetExperienceById);
  const fetchEducationById = useApi(GetEducationById); 
  const fetchSkillsById = useApi(GetSkillsById);
  const fetchPersonalInfo = useApi(GetPersonalInfo);
  const fetchSummaryById = useApi(GetSummaryById);
  const fetchAISummary = useApi(GetAISummary);
  const updateSummary = useApi(UpdateResumeSummary);
  const updateExperience = useApi(UpdateExperienceResume);
  const getAIExperience = useApi(GetAIExperience);
  const deleteExperience = useApi(DeleteExperienceById)
  const getRegenerateExperience = useApi(RegenerateAIExperience);
  const updateEducation = useApi(UpdateEducation);
  const deleteEducation = useApi(DeleteEducationById);
  const updateSkills = useApi(UpdateSkills);
  const deleteSkills = useApi(DeleteSkillsById);

  return {
    updatePersonalInfo: updatePersonalInfo.callApi,
    updatePersonalInfoLoading: updatePersonalInfo.loading,
    getResume: fetchResumeId.callApi,
    getResumeLoading: fetchResumeId.loading,
    deleteResume: removeResume.callApi,
    deleteResumeLoading: removeResume.loading,
    createUpdateResume: updateResume.callApi,
    createUpdateResumeLoading: updateResume.loading,
    getAllResumes: fetchAllResume.callApi,
    getAllResumesLoading: fetchAllResume.loading,
    getAllResumesError: fetchAllResume.error,
    getExperienceById: fetchExperienceById.callApi,
    getExperienceByIdLoading: fetchExperienceById.loading,
    getEducationById: fetchEducationById.callApi,
    getEducationByIdLoading: fetchEducationById.loading,
    getSkillsById: fetchSkillsById.callApi,
    getSkillsByIdLoading: fetchSkillsById.loading,
    getPersonalInfo: fetchPersonalInfo.callApi,
    getPersonalInfoLoading: fetchPersonalInfo.loading,
    getSummaryById: fetchSummaryById.callApi,
    getSummaryByIdLoading: fetchSummaryById.loading,
    getAISummary: fetchAISummary.callApi,
    getAISummaryLoading: fetchAISummary.loading,
    updateSummary: updateSummary.callApi,
    updateSummaryLoading: updateSummary.loading,
    updateExperience: updateExperience.callApi,
    updateExperienceLoading: updateExperience.loading,
    updateExperienceError: updateExperience.error,
    getAIExperience: getAIExperience.callApi,
    getAIExperienceLoading: getAIExperience.loading,
    getAIExperienceError: getAIExperience.error,
    deleteExperience: deleteExperience.callApi,
    deleteExperienceError: deleteExperience.error,
    deleteExperienceLoading: deleteExperience.loading,
    regenerateExperience: getRegenerateExperience.callApi,
    regenerateExperienceLoading: getRegenerateExperience.loading,
    regenerateExperienceError: getRegenerateExperience.error,
    updateEducation: updateEducation.callApi,
    updateEducationLoading: updateEducation.loading,
    updateEducationError: updateEducation.error,
    deleteEducation: deleteEducation.callApi,
    deleteEducationLoading: deleteEducation.loading,
    deleteEducationError: deleteEducation.error,
    updateSkills: updateSkills.callApi,
    updateSkillsLoading: updateSkills.loading,
    updateSkillsError: updateSkills.error,
    deleteSkills: deleteSkills.callApi,
    deleteSkillsLoading: deleteSkills.loading,
    deleteSkillsError: deleteSkills.error,
    deleteResume: deleteResume.callApi,
    deleteResumeLoading: deleteResume.loading,
    deleteResumeError: deleteResume.error,
  };
};
