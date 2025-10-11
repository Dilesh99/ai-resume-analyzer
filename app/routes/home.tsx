import Navbar from '~/components/Navbar';
import type { Route } from './+types/home';
import { resumes } from '../../constants';
import ResumeCard from '~/components/ResumeCard';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { usePuterStore } from '~/lib/puter';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Resume Tracker' },
    { name: 'description', content: 'Resume Tracker' },
  ];
}

export default function Home() {
  const { auth } = usePuterStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated]);
  return (
    <main className="bg-[url('images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading ">
          <h1>Track Your Resume Progress with Ease</h1>
          <h2>Review your submissions and check AI-powered feedback.</h2>
        </div>

        {resumes?.length > 0 ? (
          <div className="resumes-section">
            {resumes.map(resume => (
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
    </main>
  );
}
