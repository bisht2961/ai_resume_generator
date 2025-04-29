import React, { useEffect, useState } from 'react'
import AddResume from './components/addResume'
import { useUser } from '@clerk/clerk-react';
import ResumeCardItem from './components/ResumeCardItem';
import {useResumeApi}  from '../hooks/useResumeApi';
import { toast } from 'sonner';

const Dashboard = () => {

  const {user} = useUser();
  const [resumeList,setResumeList] = useState([]);
  const {getAllResumes,getAllResumesError} = useResumeApi();

  useEffect(() => {
    user&&getResumesList()
  }, [user])

  /**
    Get the list of resumes created by the user
   */
  const getResumesList = async()=> {
    const emailAddress = user?.primaryEmailAddress.emailAddress.split('@')[0];
    const res = await getAllResumes(emailAddress);
    if(res.data){
      // console.log(res.data.data);
      setResumeList(res.data.data);
    }
    if(getAllResumesError){
      toast.error("Error fetching resumes list")
    }
  }

  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start Creating AI Resume for your next job</p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5'>
        <AddResume />
        {resumeList.length > 0&&resumeList.map((resume,index)=>( 
          <ResumeCardItem resume={resume} key={index} refershData={getResumesList}/>
        ))}
      </div>
    </div>
  )
}

export default Dashboard