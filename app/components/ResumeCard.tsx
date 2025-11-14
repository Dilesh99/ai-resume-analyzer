import React from 'react';
import { useEffect, useState } from 'react';

import { usePuterStore } from '~/lib/puter';
import { Link } from 'react-router';
import ScoreCircle from './ScoreCircle';

const ResumeCard = ({
  resume: { id, companyName, jobTitle, feedback, imagePath },
}: {
  resume: Resume;
}) => {
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState('');

  useEffect(() => {
    const loadResumes = async () => {
      const blob = await fs.read(imagePath);
      if (!blob) {
        console.log('Failed to load image');
        return;
      }

      let url = URL.createObjectURL(blob);
      setResumeUrl(url);
    };

    loadResumes();
  }, [imagePath]);

  return (
    <Link
      to={`/resume/${id}`}
      className="resume-card animate-in fade-in duration-1000"
    >
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
          {companyName && (
            <h2 className=" !text-black font-bold break-words">
              {companyName ? companyName : 'Unknown Company'}
            </h2>
          )}
          {jobTitle && (
            <h3 className="text-lg break-words text-gray-500">
              {jobTitle ? jobTitle : 'Unknown Job Title'}
            </h3>
          )}
          {!companyName && !jobTitle && (
            <h2 className=" !text-black font-bold ">Resume</h2>
          )}
        </div>
        <div className="flex-shrink-0">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>

      {resumeUrl && (
        <div className="gradient-border animate-in fade-in duration-1000">
          <div className="w-full md:h-88 h-72  overflow-hidden rounded-md">
            <img
              src={resumeUrl}
              alt="resume"
              className="w-full h-auto   object-cover object-top"
            />
          </div>
        </div>
      )}
    </Link>
  );
};

export default ResumeCard;
