import React from 'react';
import _ from 'lodash';
import './style/App.css';
import { drawGrid } from './draw-grid';
import filledGrid from './filled-grid';
import Block from './block';

interface SetupPlayfieldProps {
  grid: number[][];
  setGrid: (grid: number[][]) => void;
};

interface ComponentState {
  hoverBlock: { row: number, column: number } | null,
};

class SetupPlayfield extends React.Component<SetupPlayfieldProps, ComponentState> {
  constructor(props: SetupPlayfieldProps) {
    super(props);

    this.state = {
      hoverBlock: null
    };

    this.setHoverBlock = this.setHoverBlock.bind(this);
    this.clickBlock = this.clickBlock.bind(this);
  }

  setHoverBlock(row: number, column: number): void {
    this.setState({ hoverBlock: { row, column } });
  }

  clickBlock(row: number, column: number): void {
    const grid = _.cloneDeep(this.props.grid);

    for (var i = 0; i < 22; i++) {
      if (i > row) {
        grid[i][column] = filledGrid[i][column];
      } else {
        grid[i][column] = 0;
      }
    }

    this.setState({ hoverBlock: null });
    this.props.setGrid(grid);
  }

  render() {
    return (
      <>
        {
          drawGrid(this.props.grid, (row: number, column: number, value: number) => {
            const { hoverBlock } = this.state;
            const showHover = !!hoverBlock && row > hoverBlock.row && column === hoverBlock.column;
            const removeValue = !!hoverBlock && row <= hoverBlock.row && column === hoverBlock.column;
            return (
              <Block
                value={removeValue ? 0 : value}
                showHover={showHover}
                row={row}
                column={column}
                onMouseEnter={() => this.setHoverBlock(row, column)}
                onClick={() => this.clickBlock(row, column)}
              />
            );
          }, () => (this.setState({ hoverBlock: null })))
        }
      </>
    );
  }
}

export default SetupPlayfield;
