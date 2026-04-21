export type ProjectSpan = 'half' | 'full';

export interface Project {
  title: string;
  subtitle: string | null;
  description: string | null;
  tags: string[];
  image: string;
  award: string | null;
  span: ProjectSpan;
}

export const projects: Project[] = [
  {
    title: 'Simplifying reimbursement for policyholders',
    subtitle: null,
    description: null,
    tags: [],
    image: 'https://media.base44.com/images/public/69e4d6fd3247f4b649ed641e/96604794f_generated_f7162381.png',
    award: null,
    span: 'half',
  },
  {
    title: 'AI Driven Diabetes Care',
    subtitle: 'Crafting a supportive system to help individuals significantly reduce and manage their diabetes effectively',
    description: null,
    tags: ['Monitoring', 'Tracking', 'Health Care', 'Insights', 'HbA1c Levels', 'AI Integration'],
    image: 'https://media.base44.com/images/public/69e4d6fd3247f4b649ed641e/1d88c215d_generated_58517dd1.png',
    award: null,
    span: 'half',
  },
  {
    title: 'A self-initiated exploration into EV service design',
    subtitle: null,
    description: null,
    tags: [],
    image: 'https://media.base44.com/images/public/69e4d6fd3247f4b649ed641e/2afcebd00_generated_b4820087.png',
    award: null,
    span: 'half',
  },
  {
    title: 'A self-initiated library app to boost discovery and usage',
    subtitle: null,
    description: null,
    tags: [],
    image: 'https://media.base44.com/images/public/69e4d6fd3247f4b649ed641e/00a595568_generated_f803e47c.png',
    award: null,
    span: 'half',
  },
  {
    title: 'Voice Configurator for AI Voice Agent',
    subtitle: 'Powering faster, smarter conversations',
    description: null,
    tags: ['Chips'],
    image: 'https://media.base44.com/images/public/69e4d6fd3247f4b649ed641e/4cd8a0d29_generated_aa98d183.png',
    award: 'SHarp sharK award',
    span: 'full',
  },
];
