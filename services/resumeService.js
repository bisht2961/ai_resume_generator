import axiosClient from "./axiosClient";
import { apiWrapper } from "./apiHelper";

export const UpdateResume = (data) =>
  apiWrapper(axiosClient.post("/resumes/add", data));

export const GetAllResume = (userEmail) =>
  apiWrapper(axiosClient.get(`/resumes/fetch/all/${userEmail}`));


export const GetPersonalInfo = (resume_id) =>
  apiWrapper(axiosClient.get(`/personal-info/user/resume/${resume_id}`));


export const UpdatePersonalInfoDetail = (data) =>
  apiWrapper(axiosClient.post('/personal-info/update', data));

export const GetResumeById = (resume_id) =>
  apiWrapper(axiosClient.get(`/resumes/fetch/id/${resume_id}`));

export const DeleteResumeById = (resume_id) =>
  apiWrapper(axiosClient.delete(`/resumes/delete/${resume_id}`));

export const GetEducationById = (resume_id) =>
  apiWrapper(axiosClient.get(`/education/fetch/all/${resume_id}`));

export const GetExperienceById = (resume_id) =>
  apiWrapper(axiosClient.get(`/experience/fetch/all/${resume_id}`));

export const GetSkillsById = (resume_id) =>  
  apiWrapper(axiosClient.get(`/skills/fetch/all/${resume_id}`));

export const GetSummaryById = (resume_id) =>
  apiWrapper(axiosClient.get(`/summary/fetch/${resume_id}`));

export const GetAISummary = (job_title)=>
  apiWrapper(axiosClient.get(`/ai/summary/${job_title}`));

export const UpdateResumeSummary = (data) =>
  apiWrapper(axiosClient.post(`/summary/update`, data));

export const UpdateExperienceResume = (resumeId,data) =>
  apiWrapper(axiosClient.post(`/experience/add/${resumeId}`, data));

export const GetAIExperience = (experience) =>
  apiWrapper(axiosClient.post(`/ai/experience`,experience));

export const RegenerateAIExperience = (experience) =>
  apiWrapper(axiosClient.post(`/ai/regenerate`,experience));

export const DeleteExperienceById = (experience_id) =>
  apiWrapper(axiosClient.delete(`/experience/delete/${experience_id}`));

export const UpdateEducation = (resumeId, data) =>
  apiWrapper(axiosClient.post(`/education/add/${resumeId}`, data));

export const DeleteEducationById = (education_id) =>
  apiWrapper(axiosClient.delete(`/education/delete/${education_id}`));

export const UpdateSkills = (data) =>
  apiWrapper(axiosClient.post(`/skills/add`, data));

export const DeleteSkillsById = (skill_id) =>
  apiWrapper(axiosClient.delete(`/skills/delete/${skill_id}`));

