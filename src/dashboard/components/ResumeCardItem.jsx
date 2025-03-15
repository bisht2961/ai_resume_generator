import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Loader2Icon, MoreVertical, Notebook } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GlobalApi from "../../../services/GlobalApi";
import { toast } from "sonner";

function ResumeCardItem({ resume, refershData }) {
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.documentId).then((res) => {
      setLoading(false);
      console.log(res);
      toast.success("Resume deleted successfully");
      setOpenAlert(false);
      refershData();
    }).catch((err) => {
      toast.error("Failed to delete resume");
      console.log(err);
      setOpenAlert(false);
      setLoading(false);
    });
  }

  return (
    <div className="">
      <Link to={"/dashboard/resume/" + resume.documentId + "/edit"}>
        <div
          className="p-14 bg-gradient-to-b from-pink-100 via-purple-100 to-blue-100 bg-secondary flex items-center justify-center h-[280px] border
        rounded-lg hover:scale-105 transition-all hover:shadow-md shadow-primary"
          style={{ borderColor: resume?.themeColor }}
        >
          <Notebook />
        </div>
      </Link>
      <div
        className="border p-3 flex justify-between  text-white rounded-b-lg shadow-lg"
        style={{
          background: resume?.themeColor,
        }}
      >
        <h2 className="text-white text-center my-1">{resume.title}</h2>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-50 bg-white text-black border shadow-lg rounded-md">
            <DropdownMenuCheckboxItem
              className=" w-50 py-2 px-1" 
              onClick={() =>
                navigation("/dashboard/resume/" + resume.documentId + "/edit")
              }
            >
              Edit
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              className="py-2 px-1"
              onClick={() =>
                navigation(
                  "/resume-download-share/" + resume.documentId + "/view"
                )
              }
            >
              View
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              className="py-2 px-1"
              onClick={() => setOpenAlert(true)}
            >
              Delete
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                resume.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading}>{loading? <Loader2Icon className="animate-spin"/> : 'Delete'}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default ResumeCardItem;
