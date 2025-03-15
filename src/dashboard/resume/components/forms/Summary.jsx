import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import GlobalApi from "../../../../../services/GlobalApi";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, LoaderCircle } from "lucide-react";
import { AIChatSession } from "../../../../../services/AIModel";
import { toast } from "sonner";

const PROMPT =
  "Job Title: {jobTitle}, based on the job title, provide a sample summary for a resume in JSON format with the following fields: summary and experience_level. Provide sample summaries with experience Fresher(0-1 years), Mid-level(2-5 years) and High-level(5+ years) experience.";

function Summary({ enableNext }) {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [aiGeneratedSummary, setAiGeneratedSummary] = useState();

  useEffect(() => {
    setSummary(resumeInfo?.summary);
  }, []);

  useEffect(() => {
    enableNext(false);
    summary &&
      setResumeInfo({
        ...resumeInfo,
        summary: summary,
      });
  }, [summary]);

  const generateSummaryWithAI = async () => {
    setLoading(true);
    const prompt = PROMPT.replace("{jobTitle}", resumeInfo?.jobTitle);
    const result = await AIChatSession.sendMessage(PROMPT);
    console.log(result.response)
    setAiGeneratedSummary(JSON.parse(result.response.text()));
    setLoading(false);
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: {
        summary: summary,
      },
    };
    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (res) => {
        // console.log(res);
        enableNext(true);
        setLoading(false);
        toast.success("Summary saved successfully");
      },
      (error) => {
        // console.log(error);
        setLoading(false);
        toast.error("Error Occured. Please try again later");
      }
    );
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add summary for your resume</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label htmlFor="">Add Summary</label>
            <Button
              variant="outline"
              size="sm"
              className="border-primary text-primary flex gap-2"
              type="button"
              onClick={() => generateSummaryWithAI()}
            >
              <Brain className="h-4 w-4" />
              Generate with AI
            </Button>
          </div>
          <Textarea
            className="mt-5"
            required
            onChange={(e) => setSummary(e.target.value)}
            defaultValue={summary}
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {" "}
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
      {aiGeneratedSummary && (
        <div>
          <h2 className="font-bold text-lg">Suggestion</h2>
          {aiGeneratedSummary?.map((item, index) => (
            <div key={index} className="p-5 shadow-lg my-4 rounded-lg cursor-pointer" onClick={()=>setSummary(item?.summary)}>
              <h2 className="font-bold my-1 text-primary">
                Level: {item?.experience_level}
              </h2>
              <p>{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summary;
