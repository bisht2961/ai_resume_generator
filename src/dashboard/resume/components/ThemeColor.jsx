import React, { useContext, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Circle } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../../services/GlobalApi";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

function ThemeColor() {
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#A133FF",
    "#33FFA1",
    "#FF7133",
    "#71FF33",
    "#7133FF",
    "#FF3371",
    "#33FF71",
    "#3371FF",
    "#A1FF33",
    "#33A1FF",
    "#FF5733",
    "#5733FF",
    "#33FF5A",
    "#5A33FF",
    "#FF335A",
    "#335AFF",
  ];
  const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
  const [themeColor, setThemeColor] = useState();
  const {resumeId} = useParams()

  const onColorSelect = (color)=>{
    setThemeColor(color);
    setResumeInfo({...resumeInfo, themeColor: color});
    const data = {
      data:{
        themeColor: color
      }
    }
    GlobalApi.updateResume(resumeId, data).then((res)=>{
      console.log(res);
      toast.success("Theme color updated successfully");
    },
    (error)=>{
      console.log(error);
      toast.error("Failed to update theme color");
    });
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2">
          {" "}
          <Circle /> Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <h2 className="mb-2 text-sm font-bold">Select theme color</h2>
        <div className="grid grid-cols-5 gap-3">
        {colors.map((color,index) => (
            <div
            key={index}
            className={`w-6 h-6 rounded-full m-1 cursor-pointer hover:border-black border ${themeColor === color ? 'border-black' : ''}`}
            style={{ background: color }}
            onClick={()=>onColorSelect(color)}
          ></div>
        ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ThemeColor;
