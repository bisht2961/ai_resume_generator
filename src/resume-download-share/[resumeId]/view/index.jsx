import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import ResumePreview from "@/dashboard/resume/components/ResumePreview";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../services/GlobalApi";
import { toast } from "sonner";
import { RWebShare } from "react-web-share";

const base_url = import.meta.env.VITE_APP_URL

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeId } = useParams();
  useEffect(() => {
    console.log(resumeId);
    getResumeInfo();
  }, []);

  const getResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then(
      (res) => {
        console.log(res.data.data);
        setResumeInfo(res.data.data);
      },
      (error) => {
        console.log(error);
        toast.error("Problem fetching resume info");
      }
    );
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />
        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            Your AI generated resume is ready to downaload and share.
          </h2>
          <div className="flex justify-between mx-44 my-10">
            <Button onClick={handleDownload}>Download</Button>
            <RWebShare
              data={{
                text: "Checkout my awesome resume generated using AI.",
                url: base_url,
                title: resumeInfo?.firstName+" "+resumeInfo?.lastName+" Resume",
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <Button>Share 🔗</Button>
            </RWebShare>
          </div>
        </div>
      </div>
      <div id="print-area" className="my-10 mx-10 md:mx-20 lg:mx-36">
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
