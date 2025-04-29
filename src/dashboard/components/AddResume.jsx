import { Loader2, PlusSquare } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { useResumeApi } from "../../hooks/useResumeApi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddResume = () => {

  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const {user} = useUser();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();
  const {createUpdateResume,updateResumeError} = useResumeApi()

  const onCreate = async()=>{
    setLoading(true);
    const emailAddress = user?.primaryEmailAddress.emailAddress.split('@')[0]
    const data = {
      title: resumeTitle,
      userEmail: emailAddress,
    }
    const res = await createUpdateResume(data);
    if(res.data){
      // console.log(res.data)
      setLoading(false);
      setOpenDialog(false);
      const resumeId = res.data.data[0].id;
      navigation(`/dashboard/resume/${resumeId}/edit`)
    }
    if(updateResumeError){
      setLoading(false);
      setOpenDialog(false);
      toast.error("Error creating resume")
    }
    
  }

  

  return (
    <div>
      <div
        className="p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px] 
      hover:scale-105 transition-all hover:shadow-md cursor-pointer"
      style={{ borderColor: "#FFD700" }}
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <span>Add title for new resume</span>
              <Input className="my-2" placeholder="Ex.Full Stack Resume" onChange={(e)=>setResumeTitle(e.target.value)} />
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button
                variant="ghost"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
              <Button
               disabled={!resumeTitle||loading}
                onClick={() => onCreate()}
              >
                {loading?<Loader2 className="animate-spin"/>:'Create'}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;
