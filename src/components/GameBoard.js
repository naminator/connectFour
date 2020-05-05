import React, { Component } from 'react';
import './GameBoard.scss';

class GameBoard extends Component {
    static propTypes = {};

    constructor(props) {
        super(props);

        this.state = {
            gameBoardArr: [
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
            ],
        };
    }

    handleUnitClick = (rowIndex, unitIndex, unitRow) => {
        const { gameBoardArr } = this.state;
        let updatedBoard = [...gameBoardArr];

        // Update board with updated unit index
        unitRow.splice(unitIndex, 1, 1);
        updatedBoard.splice(rowIndex, 1, unitRow);

        console.log('updatedBoard', updatedBoard);
    };

    render() {
        const { gameBoardArr } = this.state;

        const gameUnitRow = gameBoardArr.map((unitRow, rowIndex) => {
            return unitRow.map((unit, unitIndex) => {
                return (
                    <div
                        className="gameboard__unit"
                        onClick={this.handleUnitClick.bind(
                            this,
                            rowIndex,
                            unitIndex,
                            unitRow
                        )}
                        key={unitIndex}
                    >
                        {unit}
                    </div>
                );
            });
        });

        return <div className="gameboard">{gameUnitRow}</div>;
    }
}

export default GameBoard;
