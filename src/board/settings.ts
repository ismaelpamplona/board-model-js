import { Board } from "./index";

export class BoardSettings {
  changeTitle(this: Board, newTitle: string): void {
    if (newTitle.trim() === "") {
      throw new Error("Title must be a non-empty string");
    }

    this.title = newTitle.trim();
    this.updatedAt = new Date();
  }

  updateSettings(this: Board, settings: Partial<typeof this.settings>): void {
    Object.keys(settings).forEach((key) => {
      if (!(key in this.settings)) {
        throw new Error(`Invalid setting: ${key}`);
      }
    });

    this.settings = { ...this.settings, ...settings };
    this.updatedAt = new Date();
  }

  changeBackgroundImage(this: Board, url: string): void {
    if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(url)) {
      throw new Error("Invalid image URL format");
    }
    this.backgroundImage = url;
  }

  changeBackgroundColor(this: Board, color: string): void {
    const hexPattern = /^#([0-9A-F]{3}|[0-9A-F]{6})$/i;
    const rgbPattern =
      /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
    const rgbaPattern =
      /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(0|1|0?\.\d+)\s*\)$/;
    const hslPattern =
      /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/;
    const hslaPattern =
      /^hsla\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(0|1|0?\.\d+)\s*\)$/;

    const namedColors = [
      "black",
      "white",
      "red",
      "green",
      "blue",
      "yellow",
      "cyan",
      "magenta",
      "gray",
      "purple",
      "orange",
      "pink",
      "brown",
      "lime",
      "olive",
      "navy",
      "teal",
      "aqua",
    ];

    const isValidRgb = (color: string) => {
      const match = color.match(rgbPattern) || color.match(rgbaPattern);
      if (!match) return false;
      return match
        .slice(1, 4)
        .every((num) => Number(num) >= 0 && Number(num) <= 255);
    };

    const isValidHsl = (color: string) => {
      const match = color.match(hslPattern) || color.match(hslaPattern);
      if (!match) return false;
      const [h, s, l] = match.slice(1, 4).map(Number);
      return h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100;
    };

    if (
      !hexPattern.test(color) &&
      !isValidRgb(color) &&
      !isValidHsl(color) &&
      !namedColors.includes(color.toLowerCase())
    ) {
      throw new Error("Invalid color format");
    }

    this.backgroundColor = color;
  }
}
