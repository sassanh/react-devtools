/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Draggable = require('./Draggable');

var assign = require('object-assign');

type Props = {
  style?: {[key: string]: any},
  left: () => React$Element,
  right: () => React$Element,
  initialWidth: number,
};

type DefaultProps = {};

type State = {
  moving: boolean,
  height: number,
};

class SplitPane extends React.Component {
  props: Props;
  defaultProps: DefaultProps;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      moving: false,
      height: props.initialWidth,
    };
  }

  onMove(x: number, y: number) {
    var node = ReactDOM.findDOMNode(this);
    this.setState({
      height: (node.offsetTop + node.offsetHeight) - y,
    });
  }

  render() {
    var rightStyle = assign({}, styles.rightPane, {
      height: this.state.height,
    });
    return (
      <div style={styles.container}>
        <div style={styles.leftPane}>
          {this.props.left()}
        </div>
        <Draggable
          style={styles.dragger}
          onStart={() => this.setState({moving: true})}
          onMove={(x, y) => this.onMove(x, y)}
          onStop={() => this.setState({moving: false})}>
          <div style={styles.draggerInner} />
        </Draggable>
        <div style={rightStyle}>
          {this.props.right()}
        </div>
      </div>
    );
  }
}

var styles = {
  container: {
    display: 'flex',
    minHeight: 0,
    flex: 1,
    flexDirection: 'column',
  },

  dragger: {
    padding: '3px 0',
    cursor: 'ns-resize',
    position: 'relative',
    zIndex: 1,
  },

  draggerInner: {
    backgroundColor: '#ccc',
    height: '100%',
    height: 1,
  },

  rightPane: {
    display: 'flex',
    marginTop: -3,
  },

  leftPane: {
    display: 'flex',
    marginRight: -3,
    minHeight: 0,
    flex: 1,
  },
};

module.exports = SplitPane;
