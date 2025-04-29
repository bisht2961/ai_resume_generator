import React from 'react';

function SummaryPreview({ resumeInfo }) {
  const summary = resumeInfo?.summary?.summary;
  const isEmpty = !summary;

  return (
    <p
      className={`text-xs text-justify ${
        isEmpty ? 'text-gray-400 italic' : ''
      }`}
    >
      {isEmpty
        ? 'Passionate and results-driven professional with a proven track record in delivering high-quality software solutions, collaborating with cross-functional teams, and continuously learning new technologies.'
        : summary}
    </p>
  );
}

export default SummaryPreview;
