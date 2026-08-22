import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [value, setValue] = useState('');
  const [num, setNum] = useState(false);
  const [char, setChar] = useState(false);
  const [range, setRange] = useState(12);
  const [copied, setCopied] = useState(false);

  let pass;

  const genrator = () => {
    pass = '';
    setValue('');
    let variable = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let numbers = '12345678901234567890';
    let characs = '~!@#$%^&*()_=-=!@#$%^&*()_-=[]\\{}+';

    for (let i = 0; i <= range; i++) {
      let random = Math.floor(Math.random() * variable.length + 1);
      if (char) variable += characs;
      else if (num) variable += numbers;
      pass += variable[random];
      setValue(pass);
    }
    console.log(pass);
  };

  useEffect(() => {
    genrator();
  }, [setValue, num, char, range]);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1400);
    return () => clearTimeout(timer);
  }, [copied]);

  const strengthScore =
    (range >= 16 ? 1 : 0) +
    (range >= 20 ? 1 : 0) +
    (num ? 1 : 0) +
    (char ? 1 : 0);

  let strengthLabel = 'Weak';

  if (strengthScore >= 4) {
    strengthLabel = 'Very Strong';
  } else if (strengthScore >= 3) {
    strengthLabel = 'Strong';
  } else if (strengthScore >= 2) {
    strengthLabel = 'Medium';
  }

  const handleCopy = async () => {
    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  return (
    <div className="app-shell">
      <div className="generator-card">
        <div className="card-header">
          <span className="product-badge">Secure</span>
          <span className="header-dot" aria-hidden="true" />
        </div>

        <div className="password-box" tabIndex={0}>
          <input
            className="password-input"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            readOnly
            aria-label="Generated password"
          />

          <button
            type="button"
            className={`copy-button ${copied ? 'is-copied' : ''}`}
            onClick={handleCopy}
            aria-label="Copy password"
          >
            {copied ? (
              <span className="copy-success">Copied!</span>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 9.75A2.75 2.75 0 0 1 11.75 7h6.5A2.75 2.75 0 0 1 21 9.75v6.5A2.75 2.75 0 0 1 18.25 19h-6.5A2.75 2.75 0 0 1 9 16.25v-6.5Zm-2.75 1.5A2.75 2.75 0 0 0 3.5 14v5.25A2.75 2.75 0 0 0 6.25 22h5.25A2.75 2.75 0 0 0 14.25 19.25V14a2.75 2.75 0 0 0-2.75-2.75H6.25Z" />
              </svg>
            )}
          </button>
        </div>

        <div className="strength-panel" aria-live="polite">
          <div className="strength-header">
            <span>Password strength</span>
            <span className="strength-value">{strengthLabel}</span>
          </div>

          <div className="strength-bar" aria-hidden="true">
            {[1, 2, 3, 4].map((level) => (
              <span
                key={level}
                className={`strength-segment ${level <= (strengthLabel === 'Weak' ? 1 : strengthLabel === 'Medium' ? 2 : strengthLabel === 'Strong' ? 3 : 4) ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>

        <div className="controls">
          <div className="range-header">
            <label htmlFor="length-range">Password length</label>
            <span className="range-value">{range}</span>
          </div>

          <input
            id="length-range"
            className="length-slider"
            type="range"
            max={100}
            min={0}
            value={range}
            onChange={(event) => setRange(Number(event.target.value))}
          />

          <div className="options-grid">
            <label className="option-toggle">
              <input type="checkbox" checked={true} onChange={() => { }} readOnly />
              <span className="toggle-ui" aria-hidden="true" />
              <span>Uppercase</span>
            </label>

            <label className="option-toggle">
              <input type="checkbox" checked={true} onChange={() => { }} readOnly />
              <span className="toggle-ui" aria-hidden="true" />
              <span>Lowercase</span>
            </label>

            <label className="option-toggle">
              <input
                type="checkbox"
                checked={num}
                onChange={() => setNum((prev) => !prev)}
              />
              <span className="toggle-ui" aria-hidden="true" />
              <span>Numbers</span>
            </label>

            <label className="option-toggle">
              <input
                type="checkbox"
                checked={char}
                onChange={() => setChar((prev) => !prev)}
              />
              <span className="toggle-ui" aria-hidden="true" />
              <span>Symbols</span>
            </label>
          </div>
        </div>

        <button type="button" className="generate-button" onClick={genrator}>
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
