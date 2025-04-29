import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useResumeApi } from "../../../../hooks/useResumeApi";
import usePersonalInfo from "../../../../hooks/usePersonalInfo";


function PersonalDetails({ enableNext }) {
  const params = useParams();
  const { personalInfo, updatePersonalInfoContext } = usePersonalInfo();
  const [formData, setFormData] = useState({});
  const { updatePersonalInfo, updatePersonalInfoLoading } = useResumeApi();
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (!hasInitialized && personalInfo && Object.keys(personalInfo).length > 0) {
      setFormData(personalInfo);
      setHasInitialized(true); 
    }
  }, [personalInfo, hasInitialized]);

  const handleInputChange = (e) => {
    enableNext(false);
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    updatePersonalInfoContext(name,value);
  };

  const onSave = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      resumeId: parseInt(params.resumeId),
      userId: personalInfo?.personalInfoId
        ? parseInt(personalInfo?.personalInfoId)
        : null,
    };

    try {
      // console.log("Data to be sent: ", data);
      const res = await updatePersonalInfo(data);
      if (res.data) {
        toast.success("Personal Info Updated Successfully");
        enableNext(true);
      } else {
        toast.error("Error Occurred. Please try again later");
        enableNext(false);
      }
    } catch (err) {
      // console.error(err);
      toast.error("Error Occurred. Please try again later");
      enableNext(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get started with basic information</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input
              name="firstName"
              defaultValue={personalInfo?.firstName}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input
              name="lastName"
              defaultValue={personalInfo?.lastName}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input
              name="jobTitle"
              defaultValue={personalInfo?.jobTitle}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input
              name="address"
              defaultValue={personalInfo?.address}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <Input
              name="phone"
              defaultValue={personalInfo?.phone}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input
              name="email"
              defaultValue={personalInfo?.email}
              required
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={updatePersonalInfoLoading}>
            {updatePersonalInfoLoading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetails;
