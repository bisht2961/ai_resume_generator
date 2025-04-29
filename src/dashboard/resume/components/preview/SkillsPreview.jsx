import React from "react";

function SkillsPreview({ resumeInfo }) {
  const skillsList = resumeInfo?.skills || [];
  const themeColor = resumeInfo?.resume?.themeColor || "#4B5563";

  const isEmpty =
    skillsList.length === 0 ||
    skillsList.every(skill => !skill?.name?.trim());

  const placeholderSkills = [
    { name: "JavaScript", rating: 4 },
    { name: "React", rating: 5 },
    { name: "Node.js", rating: 3 },
  ];
  
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: themeColor }}
      >
        Skills
      </h2>
      <hr style={{ borderColor: themeColor }} />

      <div className="grid grid-cols-2 gap-3 my-4">
        {(isEmpty ? placeholderSkills : skillsList).map((skill, index) => (
          <div
            key={index}
            className={`flex items-center justify-between ${
              isEmpty ? "text-gray-400 italic" : ""
            }`}
          >
            <h2 className="text-xs">{skill?.name}</h2>
            <div className="h-2 bg-gray-200 w-[120px]">
              <div
                className="h-2"
                style={{
                  backgroundColor: themeColor,
                  width: skill?.rating * 20 + "%",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsPreview;
