import Navbar from '~/components/Navbar';
import type { Route } from './+types/home';

import ResumeCard from '~/components/ResumeCard';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { usePuterStore } from '~/lib/puter';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Resume Tracker' },
    { name: 'description', content: 'Resume Tracker' },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();

  const navigate = useNavigate();
  const [resume, setResume] = useState<Resume[]>([]);
  const [loadingResume, setLoadingResume] = useState(false);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResume(true);
      const resumes = (await kv.list('resume:*', true)) as KVItem[];

      const parseResumes = resumes?.map(
        resume => JSON.parse(resume.value) as Resume
      );

      console.log('Loaded resumes:', parseResumes);
      setResume(parseResumes || []);
      setLoadingResume(false);
    };
    loadResumes();
  }, [kv]);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated]);

  return (
    <main className="bg-[url('images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading ">
          <h1>Track Your Resume Progress with Ease</h1>
          {!loadingResume && resume?.length === 0 ? (
            <h2>Upload your first resume to get feedback.</h2>
          ) : (
            <h2>Review your submissions and check AI-powered feedback.</h2>
          )}
        </div>
        {loadingResume && (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/resume-scan-2.gif" className="w-[200px]" />
          </div>
        )}

        {!loadingResume && resume?.length > 0 ? (
          <div className="resumes-section">
            {resume.map(resume => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-300">
              No resumes found. Upload your first resume to get started!
            </p>
          </div>
        )}
      </section>
      {!loadingResume && resume?.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-10 gap-4">
          <Link
            to="/upload"
            className="primary-button w-fit text-xl font-semibold"
          >
            Upload Resume
          </Link>
        </div>
      )}
    </main>
  );
}
