export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  { value: 3,  suffix: '+', label: 'Years Experience' },
  { value: 5,  suffix: '',  label: 'Projects Shipped' },
  { value: 12, suffix: '+', label: 'Tools in Stack' },
  { value: 50, suffix: '+', label: 'PMs Mentored' },
];
