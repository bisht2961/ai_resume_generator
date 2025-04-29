import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { useResumeApi } from "../../../../hooks/useResumeApi";
import useSkills from "../../../../hooks/useSkills";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

function Skills({ enableNext }) {
  const { resumeId } = useParams();
  const {
    skillsList,
    updateSkillsContext,
    addSkillContext,
    removeSkillContext,
  } = useSkills();

  const { updateSkills, deleteSkills } = useResumeApi();
  const [loading, setLoading] = useState(false);

  const handleChange = (index, name, value) => {
    const newEntries = skillsList.slice();
    newEntries[index][name] = value;
    updateSkillsContext(newEntries);
  };

  const handleRemoveSkill = async (index) => {
    setLoading(true);
    if (skillsList[index]?.id) {
      const res = await deleteSkills(skillsList[index]?.id);
      if (res.data) {
        setLoading(false);
        removeSkillContext(index);
        toast.success("Skill deleted successfully");
      } else {
        setLoading(false);
        toast.error("Error deleting skill");
      }
    } else {
      removeSkillContext(index);
      toast.success("Skill deleted successfully");
      setLoading(false);
    }
  };

  const onSave = async () => {
    setLoading(true);
    const data = skillsList.map(({ id, ...rest }) => {
      return {
        ...rest,
        resumeId: resumeId,
      };
    });
    // console.log(data);
    const res = await updateSkills(data);
    if (res.data) {
      toast.success("Skills updated successfully");
      enableNext(true);
      setLoading(false);
    } else {
      toast.error("Error updating skills");
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Skills</h2>
        <p>Add your skills</p>
        <div>
          {skillsList.map((skill, index) => (
            <div
              key={index}
              className="relative flex items-center gap-4 border rounded-lg p-3 mb-2"
            >
              <div className="flex-1">
                <label className="text-xs">Name</label>
                <Input
                  className="w-full"
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  defaultValue={skill.name}
                />
              </div>
              <Rating
                style={{ maxWidth: 120 }}
                value={skill.rating}
                onChange={(value) => handleChange(index, "rating", value)}
              />
              {/* Remove button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute w-5 h-5 top-2 right-2 bg-transparent text-red-500 hover:bg-transparent hover:text-red-700"
                title="Remove this skill"
                onClick={() => handleRemoveSkill(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="text-primary"
              onClick={addSkillContext}
            >
              + Add Skill
            </Button>
          </div>
          <Button onClick={() => onSave()}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Skills;
