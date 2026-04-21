export interface Plugin {
  title: string;
  name: string;
  image: string;
  url: string;
}

export const plugins: Plugin[] = [
  {
    title: 'Fix your spacing issues with a click',
    name: 'Spacer',
    image: 'https://media.base44.com/images/public/69e4d6fd3247f4b649ed641e/2afcebd00_generated_b4820087.png',
    url: 'https://www.figma.com/community/plugin/1501801056566105516/spacer',
  },
  {
    title: 'Improve your micro-copies instantly',
    name: 'Wrighty',
    image: 'https://media.base44.com/images/public/69e4d6fd3247f4b649ed641e/00a595568_generated_f803e47c.png',
    url: 'https://www.figma.com/community/plugin/1437496606337348966/wrighty',
  },
];
