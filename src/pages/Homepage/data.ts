export interface LinkObject {
  label: string;
  href: string;
}

export interface LinkCategory {
  label: string;
  links: LinkObject[];
}

export const linkCategories: LinkCategory[] = [
  {
    label: "Personal",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/DeKoxD",
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/itzdeko",
      },
      {
        label: "YouTube",
        href: "https://www.youtube.com/c/AndrePantaleao",
      },
      {
        label: "Bluesky",
        href: "https://bsky.app/profile/andre.pntl.cc",
      },
      {
        label: "LinkedIn",
        href: "https://linkedin.com/in/pantaleaoandre",
      },
    ],
  },
];

export interface InfoObject {
  label: string;
  value: string;
}

export const info: InfoObject[] = [
  {
    label: "Name",
    value: "André Pantaleão",
  },
  {
    label: "Age",
    value: (new Date().getFullYear() - 1993).toString(),
  },
  {
    label: "Location",
    value: "Vila Nova de Gaia, Portugal",
  },
  {
    label: "Profession",
    value: "Software Engineer",
  },
];
