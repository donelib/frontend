export const numToHexColor = (rgb: number) => {
  return "#" + rgb.toString(16).padEnd(6, "0");
};

export const hexColorToNum = (hexRgb: string) => {
  if (hexRgb.startsWith("#"))
  hexRgb = hexRgb.slice(1);
  return Number.parseInt(hexRgb, 16);
};

export const isDarker = (rgb: number) => {
  var r = (rgb >> 16) & 0xff;  // extract red
  var g = (rgb >>  8) & 0xff;  // extract green
  var b = (rgb >>  0) & 0xff;  // extract blue

  var brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

  return brightness < 128;
}