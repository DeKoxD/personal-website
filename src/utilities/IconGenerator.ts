import { DefaultTheme } from "styled-components";
import { getTheme, ThemeOption } from "./Theme";

export function createIcon(
  text: string,
  primaryColor: string,
  secondaryColor: string
): string {
  const ctx = document.createElement("canvas").getContext("2d");
  if (ctx == null) throw Error("Canvas context not found");
  const canvas = ctx.canvas;
  const font = '900 100px "Source Code Pro"';
  ctx.font = font;
  const measurement = ctx.measureText(text);
  const width = ctx.measureText(text).width;
  const height =
    measurement.actualBoundingBoxAscent + measurement.actualBoundingBoxDescent;
  const size = Math.max(width, height);
  canvas.width = size;
  canvas.height = size;
  ctx.fillStyle = primaryColor;
  ctx.fillRect(0, 0, size, size);
  ctx.font = font;
  ctx.fillStyle = secondaryColor;
  ctx.fillText(text, 0, size / 2 + measurement.actualBoundingBoxAscent / 2);
  return ctx.canvas.toDataURL();
}

export function setCustomIcon(theme: ThemeOption, customTheme?: DefaultTheme) {
  const themeObject = getTheme(theme, customTheme);
  let link: HTMLLinkElement | null = document.querySelector("link[rel='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.getElementsByTagName("head")[0].appendChild(link);
  }

  document.fonts.ready.then(() => {
    link.href = createIcon(
      "AP",
      themeObject.primaryColor,
      themeObject.secondaryColor
    );
  });
}
