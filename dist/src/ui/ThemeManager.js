export class ThemeManager {
  constructor(buttonElement) {
    this._button = buttonElement;
    this._themes = [
      { key: "dark",   label: "🌑 Dark"   },
      { key: "light",  label: "☀️ Light"  },
      { key: "ocean",  label: "🌊 Ocean"  },
      { key: "forest", label: "🌿 Forest" },
      { key: "sunset", label: "🌅 Sunset" },
    ];
    this._index = 0;
    this._apply();
    this._button.addEventListener("click", () => this.cycle());
  }

  cycle() {
    this._index = (this._index + 1) % this._themes.length;
    this._apply();
  }

  _apply() {
    const theme = this._themes[this._index];
    document.documentElement.setAttribute("data-theme", theme.key);
    this._button.textContent = theme.label;
  }
}