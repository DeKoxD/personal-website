type Size = `${number}${"px" | "rem"}`;

type ProjectInfo = {
  title: string;
  height: Size;
  width: Size;
  path: string;
  src: string;
};

export const projects: ProjectInfo[] = [
  {
    title: "Snake React",
    height: "520px",
    width: "280px",
    path: "/snake-react",
    src: "https://dekoxd.github.io/snake-react/",
  },
];
