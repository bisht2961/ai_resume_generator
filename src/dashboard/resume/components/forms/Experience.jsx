import React, { useContext, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../../../services/GlobalApi";
import { LoaderCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummary: "",
};

function Experience({ enableNext }) {
  const params = useParams();
  const [experienceList, setExperienceList] = useState([formField]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    resumeInfo?.experience && setExperienceList(resumeInfo?.experience);
  }, []);

  const handleChange = (index, event) => {
    const newEntries = experienceList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  const addNewExperience = () => {
    setExperienceList([...experienceList, formField]);
  };

  const removeExperience = () => {
    setExperienceList((experienceList) => experienceList.slice(0, -1));
  };

  const handleRickTextEditor = (event, name, index) => {
    const newEntries = experienceList.slice();
    newEntries[index][name] = event.target.value;
    setExperienceList(newEntries);
  };

  const onSave = () => {
    setLoading(true);
    enableNext(true);
    const data = {
      data: {
        experience: experienceList.map(({ id, ...rest }) => rest),
      },
    };
    console.log(experienceList)
    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (res) => {
        console.log(res);
        enableNext(true);
        setLoading(false);
        toast.success("Personal Details Saved Successfully");
      },
      (error) => {
        setLoading(false);
        console.log(error);
        toast.error("Error Occured. Please try again later");
      }
    );
  };

  useEffect(() => {
    setResumeInfo({ ...resumeInfo, experience: experienceList });
  }, [experienceList]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Professional Experience</h2>
      <p>Add your job experience</p>
      <div>
        {experienceList?.map((experience, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div>
                <label className="text-xs"> Position Title</label>
                <Input
                  name="title"
                  defaultValue={experience?.title}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div>
                <label className="text-xs"> Company Name</label>
                <Input
                  name="companyName"
                  defaultValue={experience?.companyName}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div>
                <label className="text-xs">City</label>
                <Input
                  name="city"
                  defaultValue={experience?.city}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div>
                <label className="text-xs"> State</label>
                <Input
                  name="state"
                  defaultValue={experience?.state}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div>
                <label className="text-xs"> Start Date</label>
                <Input
                  name="startDate"
                  type="date"
                  defaultValue={experience?.startDate}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div>
                <label className="text-xs"> End Date</label>
                <Input
                  name="endDate"
                  type="date"
                  defaultValue={experience?.endDate}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div className="col-span-2">
                <RichTextEditor
                  index={index}
                  onRichTextEditorChange={(event) =>
                    handleRickTextEditor(event, "workSummary", index)
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="text-primary"
            onClick={addNewExperience}
          >
            + Add More Experience
          </Button>
          <Button
            variant="outline"
            className="text-primary"
            onClick={removeExperience}
          >
            - Remove 
          </Button>
        </div>
        <Button onClick={()=>onSave()}>{loading ? <LoaderCircle className="animate-spin" /> : "Save"}</Button>
      </div>
    </div>
  );
}

export default Experience;
