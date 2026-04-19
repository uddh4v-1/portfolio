import React from 'react';

const experiences = [
  {
    company: 'Myntra',
    logo: '🛍️',
    roles: [{ title: 'Senior UX Designer', period: "Sep'25 — Now" }],
  },
  {
    company: 'Bajaj Finserv Health',
    logo: '🏥',
    roles: [
      { title: 'Senior UX Designer', period: "Feb'25 — Sep'25" },
      { title: 'UX Designer', period: "Nov'23 — Feb'25" },
      { title: 'Jr. UX Designer', period: "Aug'22 — Nov'23" },
    ],
  },
  {
    company: 'Editage — Cactus Communications',
    logo: '📝',
    roles: [{ title: 'UX Intern', period: "Jan'22 — Jun'22" }],
  },
  {
    company: 'Fresh Food Pod, UK',
    logo: '🌿',
    roles: [{ title: 'UX Intern', period: "Jun'21 — Jul'21" }],
  },
  {
    company: 'Samsung',
    logo: '📱',
    roles: [{ title: 'Intern Designer (Live Project)', period: "Oct'20 — Nov'20" }],
  },
];

const education = [
  {
    school: 'MIT Institute of Design, Pune',
    degree: 'BDes | User Experience',
    period: "Jun'18 — May'22",
    logo: '🎓',
  },
  {
    school: 'Podar International School',
    degree: 'ICSE | Grade 10',
    period: '2007 — 16',
    logo: '🏫',
  },
];

export default function ExperienceSection() {
  return (
    <section className="py-12 px-6 max-w-5xl mx-auto space-y-16">
      {/* Experience */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Professional Experience</h2>
        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-xl flex-shrink-0 mt-0.5">
                {exp.logo}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{exp.company}</h3>
                <div className="space-y-0.5">
                  {exp.roles.map((role, j) => (
                    <div key={j} className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{role.title}</span>
                      <span className="text-xs text-gray-400">{role.period}</span>
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
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Education</h2>
        <div className="space-y-6">
          {education.map((edu, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-xl flex-shrink-0">
                {edu.logo}
              </div>
              <div className="flex-1 flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{edu.school}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{edu.degree}</p>
                </div>
                <span className="text-xs text-gray-400 ml-4 flex-shrink-0">{edu.period}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Research Papers */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Published Research Papers</h2>
        <div className="space-y-3">
          {[
            'Adjustable Design Intervention for Rail Sahayakas to Reduce Physical Discomfort',
            'Institutionalizing Individual Development Through Child-Centred Mechanisms in Indian Residential Childcare NGOs',
          ].map((paper, i) => (
            <a
              key={i}
              href="#"
              className="block text-sm text-gray-600 hover:text-gray-900 underline underline-offset-2 leading-relaxed transition-colors"
            >
              {paper}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}