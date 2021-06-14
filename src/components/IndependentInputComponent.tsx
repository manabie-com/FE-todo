import React, {Component, RefObject} from 'react';

export default class IndependentInputComponent extends Component<any, { value: string, oldValue: string, active: boolean }> {
  private readonly doubleClickToActive: boolean;
  private readonly clearOnEnter: boolean;
  private readonly inputRef!: RefObject<HTMLInputElement>;
  private mapAction: Map<string, any> = new Map();

  constructor(props: any) {
    super(props);

    const {value, doubleClickToActive, clearOnEnter} = props;

    this.inputRef = React.createRef();
    this.doubleClickToActive = ('boolean' === typeof doubleClickToActive) && doubleClickToActive;
    this.clearOnEnter = ('boolean' === typeof clearOnEnter) && clearOnEnter;
    this.state = {
      oldValue: value || '',
      value: value || '',
      active: !this.doubleClickToActive,
    };

    if (this.doubleClickToActive) {
      this.mapAction.set('click', (e: MouseEvent) => {
        this.clickOutside(e);
      });
    }
  }

  componentDidMount() {
    this.mapAction.forEach((action: any, key: string) => {
      document.addEventListener(key, action);
    });
  }

  componentWillUnmount() {
    this.mapAction.forEach((action: any, key: string) => {
      document.removeEventListener(key, action);
    });
  }

  onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!this.inputRef.current) {
      return;
    }

    switch (e.key) {
      case 'Enter':
        if (this.doubleClickToActive) {
          this.setState({oldValue: this.state.value, active: false});
        } else {
          this.setState({oldValue: this.state.value});
        }

        if (this.props.onEnter) {
          this.props.onEnter(e.target, this.state.value);
        }

        if (this.clearOnEnter) {
          this.setState({value: '', oldValue: ''});
        }
        break;
      default:
        if (this.props.onKeyDown) {
          this.props.onKeyDown(e);
        }
    }
  }

  onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (this.inputRef.current) {
      this.setState({value: this.inputRef.current.value});

      if (this.props.onChange) {
        this.props.onChange(e);
      }
    }
  }

  onInputDoubleClick() {
    if (this.doubleClickToActive && this.inputRef.current) {
      this.setState({active: true});

      setTimeout(() => {
        this.inputRef.current?.setSelectionRange(this.state.value.length, this.state.value.length);
        this.inputRef.current?.focus();
      });
    }
  }

  clickOutside(e: MouseEvent) {
    const flag = this.state.active && !(this.inputRef.current && e.target && this.inputRef.current.contains(e.target as Node));
    if (flag) {
      this.setState({value: this.state.oldValue, active: false});
    }
  }

  render() {
    const {onChange, onEnter, onKeyDown, clearOnEnter, doubleClickToActive, ...props} = this.props;

    return (
      <div onDoubleClick={() => this.onInputDoubleClick()} style={{width: '100%'}}>
        <input
          {...props}
          ref={this.inputRef}
          value={this.state.value}
          disabled={!this.state.active}
          onChange={(e) => this.onInputChange(e)}
          onKeyDown={(e) => this.onInputKeyDown(e)}
        />
      </div>
    );
  }
}
