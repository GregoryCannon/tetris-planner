import React from 'react';
import _ from 'lodash';
import '../style/App.css';
import filledGrid from '../reusable/filled-grid';
import TetrisGrid from '../reusable/tetris-grid';
import Block from '../reusable/block';

interface FillPlayfieldProps {
  grid: number[][];
  setGrid: (grid: number[][]) => void;
};

interface ComponentState {
  hoverBlock: { row: number, column: number } | null,
};

class FillPlayfield extends React.Component<FillPlayfieldProps, ComponentState> {
  constructor(props: FillPlayfieldProps) {
    super(props);

    this.state = {
      hoverBlock: null
    };

    this.setHoverBlock = this.setHoverBlock.bind(this);
    this.clickBlock = this.clickBlock.bind(this);
    this.getBlock = this.getBlock.bind(this);
  }

  setHoverBlock(row: number, column: number): void {
    this.setState({ hoverBlock: { row, column } });
  }

  clickBlock(row: number, column: number): void {
    console.log(row, column);
    const grid = _.cloneDeep(this.props.grid);

    for (var i = 0; i < 22; i++) {
      if (i >= row) {
        grid[i][column] = filledGrid[i][column];
      } else {
        grid[i][column] = 0;
      }
    }

    this.setState({ hoverBlock: null });
    this.props.setGrid(grid);
  }

  getBlock(row: number, column: number, value: number): JSX.Element {
    const { hoverBlock } = this.state;
    const slightlyHidden = !!hoverBlock && row >= hoverBlock.row && column === hoverBlock.column;
    const nearInvisible = !!hoverBlock && row < hoverBlock.row && column === hoverBlock.column;
    return (
      <Block
        value={value}
        slightlyHidden={slightlyHidden}
        nearInvisible={nearInvisible}
        row={row}
        column={column}
        onMouseEnter={() => this.setHoverBlock(row, column)}
        onClick={() => this.clickBlock(row, column)}
      />
    );
  }

  render() {
    return <TetrisGrid grid={this.props.grid} getBlock={this.getBlock} />;
  }
}

export default FillPlayfield;

// drawGrid(this.props.grid, (row: number, column: number, value: number) => {
//   const { hoverBlock } = this.state;
//   const slightlyHidden = !!hoverBlock && row >= hoverBlock.row && column === hoverBlock.column;
//   const nearInvisible = !!hoverBlock && row < hoverBlock.row && column === hoverBlock.column;
//   return (
//     <Block
//       value={value}
//       slightlyHidden={slightlyHidden}
//       nearInvisible={nearInvisible}
//       row={row}
//       column={column}
//       onMouseEnter={() => this.setHoverBlock(row, column)}
//       onClick={() => this.clickBlock(row, column)}
//     />
//   );
// }, () => (this.setState({ hoverBlock: null })))