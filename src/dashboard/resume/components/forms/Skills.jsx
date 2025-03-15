import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../services/GlobalApi";
import { toast } from "sonner";

const formField = {
    name: '',
    rating: 0
}

function Skills({ enableNext }) {

    const {resumeId} = useParams();
    const [skillsList, setSkillsList] = useState([formField]);
    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    
    useEffect(() => {   
        resumeInfo?.skills && setSkillsList(resumeInfo?.skills);
    }, [])

    const handleChange = (index, name, value) => {
        const newEntries = skillsList.slice();
        newEntries[index][name] = value;
        console.log(newEntries);
        setSkillsList(newEntries);
    }

    const addNewSkills = () => {
        setSkillsList([...skillsList, formField]);
    }
    const removeSkills = () => {
        setSkillsList((skillsList) => skillsList.slice(0, -1));
    }
    const onSave = () => {
        setLoading(true)
        const data = {
            data:{
                skills: skillsList.map(({ id, ...rest }) => rest),
            }
        }

        GlobalApi.UpdateResumeDetail(resumeId, data).then(
            (response) => {
              console.log(response);
              setLoading(false);
              toast.success("Skills details updated");
            },
            (error) => {
              setLoading(false);
              console.log(error);
              toast.error("Error Occured. Please try again later");
            }
          );

    }
    useEffect(() => {   
        setResumeInfo({...resumeInfo, skills:skillsList});
    }, [skillsList])
  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Skills </h2>
        <p>Add your skills</p>
        <div>
            {skillsList.map((skill, index) => (
               <div key={index} className="flex justify-between border rounded-lg p-3 mb-2">
                <div>
                    <label className="text-xs">Name</label>
                    <Input className='w-full' onChange={(e)=>handleChange(index,'name',e.target.value)} defaultValue={skill.name} />
                </div>
                <Rating style={{ maxWidth: 120 }} value={skill.rating} onChange={(value)=>handleChange(index,'rating',value)} />
               </div> 
            ))}
        </div>
        <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="text-primary"
            onClick={addNewSkills}
          >
            + Add Skill
          </Button>
          <Button
            variant="outline"
            className="text-primary"
            onClick={removeSkills}
          >
            - Remove
          </Button>
        </div>
        <Button onClick={()=>onSave()}>{loading ? <LoaderCircle className="animate-spin" /> : "Save"}</Button>
      </div>
      </div>
    </div>
  );
}

export default Skills;
