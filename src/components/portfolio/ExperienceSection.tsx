
import { experiences, education } from '../../constants/personal';

export default function ExperienceSection() {
  return (
    <section className="py-12 px-6 max-w-5xl mx-auto space-y-16">
      {/* Experience */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">Professional Experience</h2>
        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center text-xl shrink-0 mt-0.5">
                {exp.logo}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{exp.company}</h3>
                <div className="space-y-0.5">
                  {exp.roles.map((role, j) => (
                    <div key={j} className="flex items-start sm:items-center justify-between gap-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">{role.title}</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">{role.period}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">Education</h2>
        <div className="space-y-6">
          {education.map((edu, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center text-xl shrink-0">
                {edu.logo}
              </div>
              <div className="flex-1 flex items-start justify-between gap-2 min-w-0">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{edu.school}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{edu.degree}</p>
                  {edu.cgpa && <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">CGPA: {edu.cgpa}</p>}
                </div>
                <span className="text-xs text-gray-400 dark:text-gray-500 ml-4 shrink-0">{edu.period}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Research Papers */}
      {/* <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">Published Research Papers</h2>
        <div className="space-y-3">
          {researchPapers.map((paper, i) => (
            <a
              key={i}
              href="#"
              className="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white underline underline-offset-2 leading-relaxed transition-colors"
            >
              {paper}
            </a>
          ))}
        </div>
      </div> */}
    </section>
  );
}
