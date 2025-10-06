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

  // Initializes properties with default values.
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
            background-color: var(--ddd-theme-default-discoveryCoral);
            border: 1px solid var(--ddd-theme-default-original87Pink);
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
            color: var(--ddd-theme-default-potentialMidnight); 
        }
        .eighteen {
            color: var(--ddd-theme-default-forestGreen);
        }
        .twenty-one {
            color: var(--ddd-theme-default-original87Pink);
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
            border: 2px solid var(--ddd-theme-default-athertonViolet);
            background-color: var(--ddd-theme-default-wonderPurple);
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
            background-color: var(--ddd-theme-default-opportunityGreen);
            border-color: var(--ddd-theme-default-inventOrange);
            outline: none; 
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

   /**
   * Increments the counter property by one, as long as it does not exceed the 
   * maximum allowed value (this.max).
   */
  _increment() {
    if (this.counter < this.max) {
        this.counter++;
    }
  }

  /**
   * Decrements the counter property by one, as long as it does not drop below the 
   * minimum allowed value (this.min).
   */
  _decrement() {
    if (this.counter > this.min) {
        this.counter--;
    }
  }

   /**
   * Getter that returns the appropriate CSS class (as a string) based 
   * on the current counter value. This is used to apply conditional color changes
   * based on limits (min/max) and special numbers (18, 21).
   * * @returns {string} The CSS class list for the counter display element.
   */ 
  get _numberClass() {
    // Min/max color
    if (this.counter === this.min || this.counter === this.max) {
        return 'counter-display limit';
    }
    // 21 color
    if (this.counter === 21) {
        return 'counter-display twenty-one';
    }
    // 18 color
    if (this.counter === 18) {
        return 'counter-display eighteen';
    }
    // Default color
    return 'counter-display default';
  }

   /**
   * Lit lifecycle callback that runs after the element's properties have been updated.
   * It specifically watches for changes to the 'counter' property to trigger the 
   * confetti effect when the value hits 21.
   * * @param {Map<string | number | symbol, unknown>} changedProperties - A Map of properties that were changed.
   */
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

   /**
   * Triggers the confetti effect by importing the required library 
   * and setting the 'popped' attribute on the confetti container element in the Shadow DOM.
   */
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