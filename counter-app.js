/**
 * Copyright 2025 chloemartin312
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `counter-app`
 * 
 * @demo index.html
 * @element counter-app
 */
export class CounterApp extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.counter = 0;
    this.min = -5;
    this.max = 5;
  }

  // Lit reactive properties
  static get properties() {
    return {
      counter: { type: Number },
      min: { type: Number },
      max: { type: Number },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
            display: block; 
            padding: var(--ddd-spacing-4);
            border: 1px solid var(--ddd-theme-default-potentialMidnight);
            text-align: center;
        }
        
        /* Counter Number Styling */
        .counter-display {
            font-size: var(--ddd-font-size-8xl);
            margin-bottom: var(--ddd-spacing-8);
            font-weight: var(--ddd-font-weight-bold);
            transition: color 0.3s ease-in-out;
        }
        
        /* Conditional Colors */
        .default {
            color: var(--ddd-theme-default-limestoneGray); 
        }
        .eighteen {
            color: var(--ddd-theme-default-original87Yellow);
        }
        .twenty-one {
            color: var(--ddd-theme-default-jukeGreen);
        }
        .limit {
            color: var(--ddd-theme-default-brickRed);
        }

        /* Button Container */
        .controls {
            display: flex;
            justify-content: center;
            gap: var(--ddd-spacing-4); 
        }

        /* Button Styling */
        button {
            font-size: var(--ddd-font-size-h3);
            padding: var(--ddd-spacing-2) var(--ddd-spacing-6);
            border: 2px solid var(--ddd-theme-default-potentialMidnight);
            background-color: var(--ddd-theme-default-potentialMidnight);
            color: var(--ddd-theme-default-isoWhite);
            cursor: pointer;
            border-radius: var(--ddd-radius-sm);
            transition: 
                background-color 0.2s, 
                color 0.2s, 
                border-color 0.2s;
        }
        
        /* Hover / Focus States */
        button:hover,
        button:focus {
            background-color: var(--ddd-theme-default-beastBlue);
            border-color: var(--ddd-theme-default-beastBlue);
            outline: none; /* remove default focus outline */
        }

        /* Disabled State */
        button:disabled {
            background-color: var(--ddd-theme-default-coalyGray);
            border-color: var(--ddd-theme-default-coalyGray);
            color: var(--ddd-theme-default-limestoneGray);
            cursor: not-allowed;
            opacity: 0.6;
        }
    `];
  }

  // Method to increment counter
  _increment() {
    if (this.counter < this.max) {
        this.counter++;
    }
  }

  // Method to decrement counter
  _decrement() {
    if (this.counter > this.min) {
        this.counter--;
    }
  }

  // Determine CSS class based on counter value
  get _numberClass() {
    if (this.counter === this.min || this.counter === this.max) {
        return 'counter-display limit'; // min/max color
    }
    if (this.counter === 21) {
        return 'counter-display twenty-one'; // 21 color
    }
    if (this.counter === 18) {
        return 'counter-display eighteen'; // 18 color
    }
    return 'counter-display default'; // default color
  }

  // Confetti effect method(s)
  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }
    if (changedProperties.has('counter')) {
      if (this.counter === 21) {
              this.makeItRain();
      }
    }
  }
  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        setTimeout(() => {
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }

  // Lit render the HTML
  render() {
    return html`
      <confetti-container id="confetti">
        <div class="${this._numberClass}">${this.counter}</div> 
          <div class="controls">
                <button 
                    @click=${this._decrement} 
                    ?disabled="${this.counter <= this.min}"
                    aria-label="Decrement"
                >-</button>
                <button 
                    @click=${this._increment} 
                    ?disabled="${this.counter >= this.max}"
                    aria-label="Increment"
                >+</button>
          </div>
      </confetti-container>
    `;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(CounterApp.tag, CounterApp);