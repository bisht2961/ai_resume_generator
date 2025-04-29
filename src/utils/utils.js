
export const mapResumeData = (data) => ({
    id: data.id,
    resumeId: data.id,
    title: data.title,
    themeColor: data.theme_color,
    userEmail: data.user_email,
})

export const mapPersonalInfo = (data) => ({
    firstName: data?.first_name? data?.first_name : "",
    lastName: data?.last_name? data?.last_name : "",
    jobTitle: data?.job_title? data.job_title : "",
    address: data?.address? data.address : "",
    phone: data?.phone? data.phone : "",
    email: data?.email? data.email : "",
    personalInfoId: data?.id? data.id : "",
});

export const mapExperience = (data) => (data.map((item) => ({
    id: item?.id,
    experienceId: item.id,
    title: item.title,
    companyName: item.company_name,
    city: item.city,
    state: item.state,
    startDate: item.start_date,
    endDate: item.end_date,
    workSummary: item.work_summary,
    currentlyWorking: item.currently_working,
})));

export const mapEducation = (data) => (data.map((item) => ({
    id: item.id,
    educationId: item.id,
    universityName: item.university_name,
    degree: item.degree,
    major: item.major,
    startDate: item.start_date,
    endDate: item.end_date,
    description: item.description,
})));

export const mapSkills = (data) => (data.map((item) => ({
    id: item.id,
    skillId: item.id,
    name: item.name,
    rating: item.rating,
})));

export const extractExperienceText=(htmlString)=>{
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const listItems = doc.querySelectorAll("li");
    const experiences = Array.from(listItems).map((li) => li.textContent.trim());
    return experiences.join("\n")
  }