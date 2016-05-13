'use strict';

Editor.Panel.extend({
  style: `
    :host {
      display: flex;
      flex-direction: column;
    }

    .toolbar {
      display: flex;
      flex-direction: row;

      margin: 10px;
    }

    #view {
      flex: 1;

      margin: 10px;
      overflow-y: auto;
      overflow-x: hidden;
    }

    div.section {
      border-bottom: 1px solid #666;
      padding-bottom: 10px;
    }

    div.section:last-child {
      border-bottom: 0px;
    }

    div.group {
      margin-bottom: 5px;

      display: flex;
      flex-direction: row;
      align-items: center;
    }
  `,

  template: `
    <div class="toolbar">
      <select id="select">
        <option value="button">ui-button</option>
        <option value="checkbox">ui-checkbox</option>
        <option value="input">ui-input</option>
      </select>
    </div>
    <div id="view"></div>
  `,

  listeners: {
  },

  ready () {
    this.$ = {
      select: this.shadowRoot.querySelector('#select'),
      view: this.shadowRoot.querySelector('#view'),
    };

    this.$.select.addEventListener('change', event => {
      let value = event.target.value;

      this.profiles.local.scrollTop = 0;
      this.profiles.local.select = value;
      this.profiles.local.save();

      this.showPreview(value);
    });

    this.$.select.value = this.profiles.local.select;
    this.showPreview(this.profiles.local.select);
  },

  close () {
    this.profiles.local.scrollTop = this.$.view.scrollTop;
    this.profiles.local.save();
  },

  showPreview (name) {
    Editor
      .import(`packages://ui-kit-preview/panel/${name}-preview.js`)
      .then(initFn => {
        initFn(this.$.view);
        setTimeout(() => {
          this.$.view.scrollTop = this.profiles.local.scrollTop;
        }, 10);
      });
  },
});