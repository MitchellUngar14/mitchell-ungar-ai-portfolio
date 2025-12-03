import ProjectCard from '@/components/ProjectCard';

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen">
      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="text-center py-20">
          <h1 className="text-5xl font-bold">Mitchell Ungar</h1>
          <p className="text-2xl mt-2">AI Portfolio</p>
          <p className="mt-4 max-w-2xl mx-auto">
            AI Developer, Innovator & Architect, passionate about building intelligent systems that solve real-world problems.
          </p>
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
              title="Project In Progress"
              description="A future AI project under development."
              techStack={['Coming Soon']}
            />
            <ProjectCard
              title="Future AI Project"
              description="A future AI project in the planning stages."
              techStack={['Coming Soon']}
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-10 border-t border-gray-800">
        <div className="flex justify-center space-x-4 mb-4">
          <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">GitHub</a>
          <a href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">LinkedIn</a>
        </div>
        <p className="text-gray-500">© 2024 Mitchell Ungar</p>
      </footer>
    </div>
  );
}
