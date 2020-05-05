import React, { Component } from 'react';
import className from 'classnames';
import './GameBoard.scss';

class GameBoard extends Component {
    static propTypes = {};

    static defaultProps = {
        playerCount: 2,
    };

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
            playersTurn: 1,
        };
    }

    handleUnitClick = (rowIndex, unitIndex, unitRow) => {
        const { gameBoardArr, playersTurn } = this.state;
        let updatedBoard = [...gameBoardArr];
        let nextPlayer = 1;

        if (playersTurn === 1) {
            nextPlayer = 2;
        }

        // Do nothing if this unit has already been claimed by a player
        if (gameBoardArr[rowIndex][unitIndex] !== 0) {
            return;
        }

        // Update board with updated unit index
        unitRow.splice(unitIndex, 1, playersTurn);
        updatedBoard.splice(rowIndex, 1, unitRow);

        this.setState({
            gameBoardArr: updatedBoard,
            playersTurn: nextPlayer,
        });

        console.log(updatedBoard);
    };

    render() {
        const { gameBoardArr } = this.state;

        const gameUnitRow = gameBoardArr.map((unitRow, rowIndex) => {
            return unitRow.map((unit, unitIndex) => {
                const unitClass = `gameboard__piece gameboard__piece--${unit}`;
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
                        <div className="gameboard__piece-container">
                            <div className="gameboard__piece gameboard__piece--empty"></div>
                            <div className={unitClass}></div>
                        </div>
                    </div>
                );
            });
        });

        return <div className="gameboard">{gameUnitRow}</div>;
    }
}

export default GameBoard;
