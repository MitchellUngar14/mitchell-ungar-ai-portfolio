"use client";

import { useState, useEffect } from 'react';
import ProjectCard from '@/components/ProjectCard';
import ResumeModal from '@/components/ResumeModal';

export default function Home() {
  const [showResume, setShowResume] = useState(false);
  const [resumeContent, setResumeContent] = useState('');

  useEffect(() => {
    fetch('/resume-2025.md')
      .then((res) => res.text())
      .then((text) => setResumeContent(text));
  }, []);

  return (
    <>
      <div className="bg-black text-white min-h-screen">
        <main className="container mx-auto px-4">
          {/* Hero Section */}
          <section className="text-center py-20">
            <h1 className="text-5xl font-bold">Mitchell Ungar</h1>
            <p className="text-2xl mt-2">AI Portfolio</p>
            <p className="mt-4 max-w-2xl mx-auto">
              AI Developer, Innovator & Architect, passionate about building intelligent systems that solve real-world problems.
            </p>
            <button
              onClick={() => setShowResume(true)}
              className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              View Resume
            </button>
          </section>

          {/* Projects Section */}
          <section className="py-20">
            <h2 className="text-3xl font-bold text-center mb-10">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ProjectCard
                title="The Tribunal"
                description="An AI-powered application for collaborative decision-making."
                techStack={['Next.js', 'Vercel', 'OpenAI API']}
                liveSiteUrl="https://the-tribunal-app.vercel.app/"
                sourceCodeUrl="https://github.com/MitchellUngar14/the-tribunal-app"
              />
              <ProjectCard
                title="Apogee Insurance"
                description={<>
                  A microserviced insurance platform built with modern web technologies.
                  <br /><br />
                  For demonstration purposes, you can use the following administrator credentials:
                  <br />
                  <strong>Username:</strong> admin@example.com
                  <br />
                  <strong>Password:</strong> password123
                </>}
                techStack={['Next.js', 'React', 'Drizzle ORM', 'PostgreSQL', 'Tailwind CSS', 'Microservice']}
                liveSiteUrl="https://apogee-insurance.vercel.app/"
                sourceCodeUrl="https://github.com/MitchellUngar14/apogee-insurance"
              />
              <ProjectCard
                title="Bad Advice For Free"
                description="A Q&A platform with a tiered role system - ask questions, submit answers, and moderate content."
                techStack={['Next.js', 'React', 'Prisma', 'PostgreSQL', 'Tailwind CSS']}
                liveSiteUrl="https://bad-advice-for-free.vercel.app/"
                sourceCodeUrl="https://github.com/MitchellUngar14/BadAdviceForFree"
              />
              <ProjectCard
                title="Legion Branch 560"
                description="A community hub for Royal Canadian Legion Branch 560, serving veterans with an events calendar, member information, restaurant menu, and contact details. Features admin tools for content management and can be installed as a mobile app via PWA."
                techStack={['React', 'Vite', 'Vercel', 'PWA']}
                liveSiteUrl="https://legion560.vercel.app/"
                sourceCodeUrl="https://github.com/MitchellUngar14/Legion"
              />
              <ProjectCard
                title="Whiteboard"
                description="An interactive digital whiteboard for staying organized with task cards, sticky notes, and images. Features rich text editing, drag-and-drop positioning, resizable cards, a radial context menu, theme switching, and offline support as an installable PWA."
                techStack={['React 19', 'Vite', 'IndexedDB', 'PWA']}
                liveSiteUrl="https://muwhiteboard.vercel.app/"
                sourceCodeUrl="https://github.com/MitchellUngar14/Whiteboard"
              />
              <ProjectCard
                title="MythWeaver"
                description="A D&D companion app that connects parties in real-time. Features character management, an animated dice roller, world building tools, a combat tracker, an AI Dungeon Master assistant, and live sessions via room codes."
                techStack={['Next.js', 'TypeScript', 'Drizzle ORM', 'Tailwind CSS']}
                liveSiteUrl="https://mythweavers.vercel.app/"
                sourceCodeUrl="https://github.com/MitchellUngar14/MythWeaver"
              />
              <ProjectCard
                title="DeckTutor"
                description="A Magic: The Gathering deck analysis tool. Import decks from Moxfield, view card images from Scryfall, analyze mana curves and color distributions, detect existing combos, get combo suggestions via EDHREC data, and export decks back to Moxfield."
                techStack={['Next.js', 'TypeScript', 'Drizzle ORM', 'PostgreSQL', 'FastAPI', 'Tailwind CSS']}
                liveSiteUrl="https://decktutor.vercel.app/"
                sourceCodeUrl="https://github.com/MitchellUngar14/DeckTutor"
              />
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="text-center py-10 border-t border-gray-800">
          <div className="flex justify-center space-x-4 mb-4">
            <a href="https://github.com/MitchellUngar14" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">GitHub</a>
            <a href="https://www.linkedin.com/in/mitchell-ungar-552879168/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">LinkedIn</a>
          </div>
          <p className="text-gray-500">© 2024 Mitchell Ungar</p>
        </footer>
      </div>
      {showResume && <ResumeModal onClose={() => setShowResume(false)} content={resumeContent} />}
    </>
  );
}
