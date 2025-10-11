import Navbar from '~/components/Navbar';
import type { Route } from './+types/home';
import { resumes } from '../../constants';
import ResumeCard from '~/components/ResumeCard';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Resume Tracker' },
    { name: 'description', content: 'Resume Tracker' },
  ];
}

export default function Home() {
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
