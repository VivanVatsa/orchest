import React, { Fragment } from "react";
import { MDCTextField } from "@material/textfield";
import { RefManager, uuidv4 } from "../utils/all";

class MDCTextFieldReact extends React.Component {
  constructor() {
    super();

    this.refManager = new RefManager();

    // This element is necessary to generate synthetic refocus events
    // refocus events allow the input field to show the path right-aligned
    this.ghostFocus = document.createElement("input");
    this.ghostFocus.style.opacity = 0.01;
    this.ghostFocus.style.position = "absolute";
    this.ghostFocus.style.width = "1px";
    this.ghostFocus.style.height = "1px";
    this.ghostFocus.style.top = "0px";
    this.ghostFocus.style.right = "0px";
    document.body.append(this.ghostFocus);
  }

  componentWillUnmount() {
    this.ghostFocus.remove();
  }

  componentDidMount() {
    this.mdc = new MDCTextField(this.refManager.refs.input);
    this.mdc.value = this.getPropValue();
  }

  onChange() {
    if (this.mdc.value !== this.props.value) {
      if (this.props.onChange) {
        this.props.onChange(this.mdc.value);
      }
    }
  }

  getPropValue() {
    return this.props.value ? this.props.value : "";
  }

  focus() {
    this.mdc.focus();
  }

  focusAtEnd() {
    this.ghostFocus.focus();

    setTimeout(() => {
      this.refManager.refs.nativeInput.focus();
      this.refManager.refs.nativeInput.setSelectionRange(
        this.mdc.value.length,
        this.mdc.value.length
      );
    }, 0);
  }

  onBlur(e) {
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  }
  onFocus(e) {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.mdc.value = this.getPropValue();
    }
  }

  render() {
    let randomFor = uuidv4();

    let topClasses = ["mdc-text-field"];

    let formType = "text";

    if (this.props.password === true) {
      formType = "password";
    }

    if (this.props.icon) {
      topClasses.push("mdc-text-field--with-trailing-icon");
    }

    if (this.props.disabled === true) {
      topClasses.push("mdc-text-field--disabled");
    }

    if (this.props.classNames) {
      topClasses = topClasses.concat(this.props.classNames);
    }

    let label = (
      <Fragment>
        <label className="mdc-floating-label" htmlFor={randomFor}>
          {this.props.label}
        </label>
      </Fragment>
    );

    let iconRight;

    if (this.props.icon) {
      iconRight = (
        <i
          className="material-icons mdc-text-field__icon"
          tabIndex="0"
          role="button"
          title={this.props.iconTitle}
        >
          {this.props.icon}
        </i>
      );
    }

    if (this.props.notched === true) {
      label = (
        <Fragment>
          <div className="mdc-notched-outline mdc-notched-outline--upgraded">
            <div className="mdc-notched-outline__leading"></div>
            <div className="mdc-notched-outline__notch">
              <label className="mdc-floating-label" htmlFor={randomFor}>
                {this.props.label}
              </label>
            </div>
            <div className="mdc-notched-outline__trailing"></div>
          </div>
        </Fragment>
      );
    }

    return (
      <div ref={this.refManager.nrefs.input} className={topClasses.join(" ")}>
        <input
          disabled={this.props.disabled}
          onChange={this.onChange.bind(this)}
          onBlur={this.onBlur.bind(this)}
          onFocus={this.onFocus.bind(this)}
          name={this.props.name}
          className="mdc-text-field__input"
          type={formType}
          id={randomFor}
          ref={this.refManager.nrefs.nativeInput}
        />
        {iconRight}
        {label}

        {(() => {
          if (!this.props.notched) {
            return <div className="mdc-line-ripple"></div>;
          }
        })()}
      </div>
    );
  }
}

export default MDCTextFieldReact;
