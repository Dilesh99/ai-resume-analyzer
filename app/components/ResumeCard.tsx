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
  const { fs, puterReady, isLoading } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState('');
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const loadResumes = async () => {
      // Wait for Puter to be ready before attempting to load images
      if (!puterReady || isLoading) {
        return;
      }

      setImageLoading(true);

      try {
        const blob = await fs.read(imagePath);
        if (!blob) {
          console.log('Failed to load image for path:', imagePath);
          setImageLoading(false);
          return;
        }

        const url = URL.createObjectURL(blob);
        setResumeUrl(url);
        setImageLoading(false);
      } catch (error) {
        console.error('Error loading resume image:', error);
        setImageLoading(false);
      }
    };

    loadResumes();

    // Cleanup function to revoke object URL on unmount
    return () => {
      if (resumeUrl) {
        URL.revokeObjectURL(resumeUrl);
      }
    };
  }, [imagePath, puterReady, isLoading, fs]);

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

      {imageLoading && (
        <div className="gradient-border animate-in fade-in duration-1000">
          <div className="w-full md:h-88 h-60 overflow-hidden rounded-md flex items-center justify-center bg-gray-100">
            <div className="flex flex-col items-center gap-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
              <span className="text-sm text-gray-600">Loading...</span>
            </div>
          </div>
        </div>
      )}

      {!imageLoading && resumeUrl && (
        <div className="gradient-border animate-in fade-in duration-1000">
          <div className="w-full md:h-88 h-60 overflow-hidden rounded-md">
            <img
              src={resumeUrl}
              alt="resume"
              className="w-full h-auto   object-cover object-top"
            />
          </div>
        </div>
      )}

      {!imageLoading && !resumeUrl && (
        <div className="gradient-border animate-in fade-in duration-1000">
          <div className="w-full md:h-88 h-60 overflow-hidden rounded-md flex items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <span className="text-sm text-gray-500">Image unavailable</span>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
};

export default ResumeCard;
