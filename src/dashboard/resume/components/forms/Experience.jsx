import React, { useContext, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RichTextEditor from "../RichTextEditor";
import { LoaderCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useResumeApi } from "../../../../hooks/useResumeApi";
import useExperience from "../../../../hooks/useExperience";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

function Experience({ enableNext }) {
  const { resumeId } = useParams();
  const [loading, setLoading] = useState(false);
  const {
    updateExperience,
    updateExperienceError,
    deleteExperience,
    deleteExperienceError,
  } = useResumeApi();
  const {
    experienceList,
    updateExperienceContext,
    addNewExperienceContext,
    deleteExperienceContext,
  } = useExperience();

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    updateExperienceContext(index, name, value);
  };

  const handleRickTextEditor = (event, name, index) => {
    updateExperienceContext(index, name, event.target.value);
  };

  const removeExperience = async (index) => {
    setLoading(true);
    if (experienceList[index]?.experienceId) {
      const res = await deleteExperience(experienceList[index]?.educationId);
      if (res.data) {
        setLoading(false);
        deleteExperienceContext(index);
        toast.success("Experience deleted successfully");
      }
      if (deleteExperienceError) {
        setLoading(false);
        toast.error("Something went wrong while deleting experience");
      }
    } else {
      setLoading(false);
      deleteExperienceContext(index);
      toast.success("Experience deleted successfully");
    }
  };

  const onSave = async () => {
    setLoading(true);
    enableNext(true);
    const data = experienceList.map(({ id, ...data }) => ({
      ...data,
      currentlyWorking: String(data.currentlyWorking || false),
    }));

    console.log("data", data);
    const res = await updateExperience(resumeId, data);

    if (res.data) {
      console.log(res.data);
      setLoading(false);
      toast.success("Experience updated successfully");
    }
    if (updateExperienceError) {
      setLoading(false);
      toast.error("Something went wrong while updating experience");
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Professional Experience</h2>
      <p>Add your job experience</p>
      <div>
        {experienceList?.map((experience, index) => (
          <div key={experience?.id}>
            <div className="relative grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              {/* Remove button */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className="absolute w-6 h-6 top-2 right-2 bg-transparent text-red-400 hover:text-red-800 hover:bg-transparent"
                    title="Remove this experience"
                  >
                    <Trash2 size={16} />
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete this experience?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. It will permanently remove
                      this experience from your resume.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => removeExperience(index)}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <div>
                <label className="text-xs"> Position Title</label>
                <Input
                  name="title"
                  defaultValue={experience?.title || ""}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div>
                <label className="text-xs"> Company Name</label>
                <Input
                  name="companyName"
                  defaultValue={experience?.companyName || ""}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div>
                <label className="text-xs">City</label>
                <Input
                  name="city"
                  defaultValue={experience?.city || ""}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div>
                <label className="text-xs"> State</label>
                <Input
                  name="state"
                  defaultValue={experience?.state || ""}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div>
                <label className="text-xs"> Start Date</label>
                <Input
                  name="startDate"
                  type="date"
                  defaultValue={experience?.startDate || ""}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div>
                <label className="text-xs"> End Date</label>
                <Input
                  name="endDate"
                  type="date"
                  disabled={experience?.currentlyWorking}
                  placeholder={
                    experience?.currentlyWorking ? "Currently working" : ""
                  }
                  defaultValue={experience?.endDate || ""}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>

              <div className="col-span-2 flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="currentlyWorking"
                  checked={experience?.currentlyWorking || false}
                  onChange={(e) =>
                    handleChange(index, {
                      target: {
                        name: "currentlyWorking",
                        value: e.target.checked,
                      },
                    })
                  }
                />
                <label className="text-sm">Currently working here</label>
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
            onClick={addNewExperienceContext}
          >
            + Add More Experience
          </Button>
        </div>
        <Button onClick={() => onSave()}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Experience;
