import { Button } from "@/components/ui/button";
import { Brain, LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { toast } from "sonner";
import { useResumeApi } from "../../../hooks/useResumeApi";
import useExperience from "../../../hooks/useExperience";
import EditableBulletsModal from "./EditableBulletsModal ";
import { extractExperienceText } from "../../../utils/utils";

const validation_checks = [
  { field: "title", message: "Please add position title first." },
  { field: "companyName", message: "Please add company name first." },
  { field: "startDate", message: "Please add start date first." },
];

const parseHtmlToBulletPoints = (htmlString) => {
  const container = document.createElement("div");
  container.innerHTML = htmlString;
  const listItems = container.querySelectorAll("li");
  return Array.from(listItems).map((li) => li.innerHTML);
};

function RichTextEditor({ index, onRichTextEditorChange }) {
  const [value, setValue] = useState();

  const [loading, setLoading] = useState(false);
  const { experienceList } = useExperience();
  const {
    getAIExperience,
    getAIExperienceError,
    regenerateExperience,
    regenerateExperienceError,
  } = useResumeApi();
  const [bullets, setBullets] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    experienceList && setValue(experienceList[index]?.workSummary);
  }, []);

  const handleSaveSummary = () => {
    const htmlSummary = `<ul>${bullets
      .map((b) => `<li>${b}</li>`)
      .join("")}</ul>`;
    setValue(htmlSummary);
    onRichTextEditorChange({ target: { value: htmlSummary } });
    setShowModal(false);
  };

  const checkValidations = () => {
    for (const { field, message } of validation_checks) {
      if (!experienceList[index]?.[field]) {
        return { validation: false, message };
      }
    }

    // Special case for endDate / currentlyWorking
    const current = experienceList[index];
    if (!current?.endDate && current?.currentlyWorking === false) {
      toast.error("Please add end date or currently working first.");
      setLoading(false);
      return {
        validation: false,
        message: "Please add end date or currently working first.",
      };
    }

    return { validation: true, message: "" };
  };

  const generateSummaryWithAi = async () => {
    setLoading(true);
    // console.log("index", index);
    // console.log("experienceList", experienceList[index]);

    const { validation, message } = checkValidations();
    if (!validation) {
      toast.error(message);
      setLoading(false);
      return;
    }
    const current = experienceList[index];
    const data = {
      experience_str: `Position: ${current?.title}, Company: ${
        current?.companyName
      }, Start Date: ${current?.startDate}, End Date: ${
        current?.endDate || "Currently Working"
      }`,
    };
    const res = await getAIExperience(data);
    if (res.data) {
      // console.log(res.data);
      setValue(res.data);
      // const resp = JSON.parse(res.data);
      const bulletsFromAI = parseHtmlToBulletPoints(res.data);
      setBullets(bulletsFromAI);
      setShowModal(true);
      setLoading(false);
      // onRichTextEditorChange({ target: { value: res.data } });
      toast.success("Summary generated successfully");
    }
    if(getAIExperienceError) {
      setLoading(false);
      toast.error("Something went wrong while generating summary");
    }
    
  };

  const regenerateSummaryWithAi = async () => {
    setLoading(true);
    const exper_str = extractExperienceText(value);
    const data = {
      experience_str: exper_str
    };
    const res = await regenerateExperience(data);

    if (res.data) {
      // console.log(res.data);
      setValue(res.data);
      const bulletsFromAI = parseHtmlToBulletPoints(res.data);
      setBullets(bulletsFromAI);
      setShowModal(true);
      setLoading(false);
      toast.success("Summary generated successfully");
    }

    if (regenerateExperienceError) {
      setLoading(false);
      toast.error("Something went wrong while generating summary");
    }
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summary</label>
        <Button
          variant="outline"
          size="sm"
          onClick={generateSummaryWithAi}
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Brain className="h-4 w-4" /> Generate with AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            onRichTextEditorChange(event);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
      {/* Modal goes here */}
      <EditableBulletsModal
        open={showModal}
        bullets={bullets}
        onBulletChange={(i, val) =>
          setBullets((prev) => prev.map((b, idx) => (idx === i ? val : b)))
        }
        onRemove={(i) =>
          setBullets((prev) => prev.filter((_, idx) => idx !== i))
        }
        onRegenerate={regenerateSummaryWithAi}
        onClose={() => setShowModal(false)}
        onSave={handleSaveSummary}
      />
    </div>
  );
}

export default RichTextEditor;
