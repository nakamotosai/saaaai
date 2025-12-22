export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  url?: string;
}

export interface NavLink {
  label: string;
  href: string;
}