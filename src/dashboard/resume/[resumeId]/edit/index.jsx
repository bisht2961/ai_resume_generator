import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../../components/FormSection";
import ResumePreview from "../../components/ResumePreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import dummy from "@/data/dummy";
import GlobalApi from "../../../../../services/GlobalApi";

function EditResume() {
  const {resumeId} = useParams();
  const [resumeInfo, setResumeInfo] = useState();
  useEffect(() => {
    getResumeInfo();
  }, []);


  const getResumeInfo = () => {

    GlobalApi.GetResumeById(resumeId)
      .then((res) => {
        setResumeInfo(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <ResumeInfoContext.Provider value={{resumeInfo, setResumeInfo}}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        {/* <FormSection /> */}
        <FormSection />

        {/* <ResumePreview /> */}
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default EditResume;
