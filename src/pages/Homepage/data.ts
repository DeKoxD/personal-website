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
        label: "Instagram",
        href: "https://www.instagram.com/itzdeko/",
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
  {
    label: "TEST",
    links: Array(10)
      .fill(null)
      .map((_, index) => ({
        label: `Test ${index.toString().padStart(2, "0")}`,
        href: "#",
      })),
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
    label: "Location",
    value: "Vila Nova de Gaia, Portugal",
  },
];
