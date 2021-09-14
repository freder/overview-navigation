const { St, Graphene } = imports.gi
const Clutter = imports.gi.Clutter

var FOCUS_WINDOW_STYLE = 'extension-overview-navigation-window-tooltip'

var Label = class Label {
  constructor (settings, parent) {
    this.settings = settings
    this.gLabel = new St.Label({ })
    this.gLabel.set_style_class_name(FOCUS_WINDOW_STYLE)

    // align with parent element
    this.gLabel.add_constraint(new Clutter.AlignConstraint({
      source: parent,
      align_axis: Clutter.AlignAxis.X_AXIS,
      factor: 0.5,
    }));
    this.gLabel.add_constraint(new Clutter.AlignConstraint({
      source: parent,
      align_axis: Clutter.AlignAxis.Y_AXIS,
      // pivot_point: new Graphene.Point({ x: 0.5, y: 1.0 }),
      factor: 1.0,
    }));
    parent.add_child(this.gLabel)

    // add offset
    this.gLabel.translation_x = -50;
    // this.gLabel.translation_y = -2;
  }

  updateFontColor (color) {
    this._setLabelStyle(color)
  }

  getText () {
    return this.gLabel.text
  }

  setText (text) {
    this.gLabel.text = text
  }

  destroy () {
    this.gLabel.destroy()
  }

  setPosition (x, y) {
    this.gLabel.set_position(x, y)
  }

  show () {
    this.gLabel.show()
  }

  hide () {
    this.gLabel.hide()
  }

  _setLabelStyle (fontColor) {
    this.gLabel.set_style(`
      background: ${this.settings.getBackgroundColor()};
      color: ${fontColor};
      border: ${this.settings.getBorderSize()}px solid ${this.settings.getBorderColor()};
    `)
  }
}

module.exports = {
  Label
}
