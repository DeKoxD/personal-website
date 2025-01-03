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
        label: "Bluesky",
        href: "https://bsky.app/profile/deko.pntl.cc",
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
    value: "Porto, Portugal",
  },
];
