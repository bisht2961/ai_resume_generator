import { Textarea } from "@/components/ui/textarea";
import React, { useContext, useEffect, useState } from "react";
import GlobalApi from "../../../../../services/GlobalApi";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, LoaderCircle } from "lucide-react";
import { AIChatSession } from "../../../../../services/AIModel";
import { toast } from "sonner";
import { useResumeApi } from "../../../../hooks/useResumeApi";
import useSummary from "@/hooks/useSummary";
import usePersonalInfo from "@/hooks/usePersonalInfo";

function Summary({ enableNext }) {
  const params = useParams();
  const { resume_summary, updateSummaryContext } = useSummary();
  const { personalInfo } = usePersonalInfo();
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [aiGeneratedSummary, setAiGeneratedSummary] = useState();
  const { getAISummary, updateSummary } = useResumeApi();
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (
      !hasInitialized &&
      resume_summary &&
      Object.keys(resume_summary).length > 0
    ) {
      setSummary(resume_summary?.summary);
      setHasInitialized(true);
    }
  }, [resume_summary, hasInitialized]);

  useEffect(() => {
    summary && updateSummaryContext("summary", summary);
  }, [summary]);

  const generateSummaryWithAI = async () => {
    setLoading(true);
    if (personalInfo?.jobTitle) {
      // console.log(
      //   "Generating summary with AI for job title: ",
      //   personalInfo?.jobTitle
      // );
      const res = await getAISummary(personalInfo?.jobTitle, summary);
      console.log(res.data);
      if (res.data) {
        setAiGeneratedSummary(res.data);
      }
    }
    setLoading(false);
  };

  const onSave = async(e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      summary: summary,
      resumeId: params.resumeId,
      summaryId: resume_summary?.id,
    };
    const res = await updateSummary(data);
    if(res.data){
      console.log(res.data);
      toast.success("Summary updated successfully");
      enableNext(true);
    }else{
      toast.error("Failed to update summary");
    }
    setLoading(false);
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
          {aiGeneratedSummary &&
            typeof aiGeneratedSummary === "object" &&
            Object.entries(aiGeneratedSummary).map(([level, item], index) => {
              // Format the key like "mid-level" -> "Mid Level"
              const formattedLevel = level
                .replace(/_/g, " ") // replace underscores with space if any
                .split("-") // split on dashes
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" "); // join back with space

              return (
                <div
                  key={index}
                  className="p-5 shadow-lg my-4 rounded-lg cursor-pointer"
                  onClick={() => setSummary(item?.summary)}
                >
                  <h2 className="font-bold my-1 text-primary">
                    Level: {item?.experience_level || formattedLevel}
                  </h2>
                  <p>{item?.summary}</p>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default Summary;
