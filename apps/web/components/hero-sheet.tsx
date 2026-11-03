/**
 * The Home hero's figure: a Stacksheet two sheets deep, holding one colour
 * from a weighted palette. A picture of the component, so it is hidden from
 * assistive technology; the catalogue below links to the working one.
 */
export const HeroSheet = () => (
  <div aria-hidden="true" className="hero-sheet">
    <div className="hero-sheet-root">
      <span>Palette</span>
      <span>4 colours</span>
    </div>
    <div className="hero-sheet-active">
      <div className="hero-sheet-header">
        <span className="hero-sheet-title">
          <span className="hero-sheet-icon">
            <svg fill="none" height="16" viewBox="0 0 16 16" width="16">
              <path
                d="M10 3L5 8l5 5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </span>
          Evergreen
        </span>
        <span className="hero-sheet-icon text-muted-foreground">
          <svg fill="none" height="16" viewBox="0 0 16 16" width="16">
            <path
              d="M4 4l8 8M12 4l-8 8"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
            />
          </svg>
        </span>
      </div>
      <div className="hero-sheet-body">
        <span className="hero-sheet-colour" />
        <dl className="hero-sheet-facts">
          <div>
            <dt>Hex</dt>
            <dd>#315C4B</dd>
          </div>
          <div>
            <dt>OKLCH</dt>
            <dd>0.438 0.056 166.3</dd>
          </div>
          <div>
            <dt>Share of palette</dt>
            <dd>48%</dd>
          </div>
        </dl>
        <span className="hero-sheet-bar">
          <span style={{ background: "#315C4B", width: "48%" }} />
          <span style={{ background: "#D9A441", width: "30%" }} />
          <span style={{ background: "#9B3D32", width: "22%" }} />
        </span>
        <span className="hero-sheet-legend">
          <span>Evergreen 48</span>
          <span>Saffron 30</span>
          <span>Oxblood 22</span>
        </span>
      </div>
    </div>
  </div>
);
