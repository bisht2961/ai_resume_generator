import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle, Trash2 } from "lucide-react";
import React, { useState } from "react";
import useEducation from "../../../../hooks/useEducation";
import { useResumeApi } from "../../../../hooks/useResumeApi";
import { useParams } from "react-router-dom";
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

function Education({ enableNext }) {
  const { resumeId } = useParams();
  const {
    educationList,
    updateEducationContext,
    addNewEducationContext,
    deleteEducationContext,
  } = useEducation();
  const {
    updateEducation,
    updateEducationError,
    deleteEducation,
    deleteEducationError,
  } = useResumeApi();

  const [loading, setLoading] = useState(false);

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    updateEducationContext(index, name, value);
  };

  const onSave = async () => {
    setLoading(true);
    const data = educationList.map(({ id, ...rest }) => rest);
    const res = await updateEducation(resumeId, data);
    if (res.data) {
      console.log("Education updated successfully", res.data);
      setLoading(false);
    } else {
      setLoading(false);
      console.error(
        "Something went wrong while updating education",
        updateEducationError
      );
    }
  };

  const removeEducation = async (index) => {
    setLoading(true);

    if (educationList[index]?.educationId) {
      const res = await deleteEducation(educationList[index]?.educationId);
      if (res.data) {
        setLoading(false);
        deleteEducationContext(index);
        toast.success("Education deleted successfully");
      }
      if (deleteEducationError) {
        setLoading(false);
        toast.error("Something went wrong while deleting education");
      }
    } else {
      setLoading(false);
      deleteEducationContext(index);
      toast.success("Education deleted successfully");
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add your educational details</p>

      <div>
        {educationList?.map((education, index) => (
          <div
            key={education?.id}
            className="relative border p-4 my-5 rounded-lg"
          >
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="absolute w-6 h-6 top-2 right-2 bg-transparent text-red-400 hover:text-red-800 hover:bg-transparent"
                  title="Remove this education"
                >
                  <Trash2 size={16} />
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to delete this education?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. It will permanently remove
                    this education from your resume.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => removeEducation(index)}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* Education Form Fields */}
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label>University Name</label>
                <Input
                  name="universityName"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={education?.universityName}
                />
              </div>
              <div>
                <label>Degree</label>
                <Input
                  name="degree"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={education?.degree}
                />
              </div>
              <div>
                <label>Major</label>
                <Input
                  name="fieldOfStudy"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={education?.fieldOfStudy}
                />
              </div>
              <div>
                <label>Start Date</label>
                <Input
                  type="date"
                  name="startDate"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={education?.startDate}
                />
              </div>
              <div>
                <label>End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={education?.endDate}
                />
              </div>
              <div className="col-span-2">
                <label>Description</label>
                <Textarea
                  name="description"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={education?.description}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add and Save Buttons */}
      <div className="flex justify-between mt-4">
        <Button
          variant="outline"
          className="text-primary"
          onClick={addNewEducationContext}
        >
          + Add
        </Button>

        <Button onClick={onSave}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Education;
