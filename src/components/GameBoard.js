import React, { Component } from 'react';
import './GameBoard.scss';

// Helper function to check to see if array has consecutive ints
const hasConsecutive = (arr, amount) => {
    var last = null;
    var count = 0;

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== last || arr[i] === 0) {
            last = arr[i];
            count = 0;
        }

        count += 1;

        if (amount <= count) {
            return true;
        }
    }

    return false;
};

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
            winner: 0,
        };

        this.handleReset = this.handleReset.bind(this);
    }

    componentWillUnmount() {
        this.handleReset();
    }

    handleUnitClick = (rowIndex, unitIndex, unitRow) => {
        const { gameBoardArr, playersTurn, winner } = this.state;
        let updatedBoard = [...gameBoardArr];
        let nextPlayer = 1;

        if (winner !== 0) {
            return;
        }

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

        const unitColumn = updatedBoard.map((unitRow) => {
            return unitRow[unitIndex];
        });

        // If rows have playersTurn number 4 times in a row
        if (hasConsecutive(unitRow, 4) || hasConsecutive(unitColumn, 4)) {
            this.setState({
                winner: playersTurn,
            });

            return;
        }
    };

    handleReset = () => {
        this.setState({
            gameBoardArr: [
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
            ],
            playersTurn: 1,
            winner: 0,
        });
    };

    render() {
        const { gameBoardArr, winner } = this.state;

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
        const winnerText = winner !== 0 && `Player ${winner} wins!`;
        const resetButton = winner !== 0 && (
            <button className="button" onClick={this.handleReset}>
                Play Again
            </button>
        );

        return (
            <div>
                <div className="gameboard">{gameUnitRow}</div>
                <p className="text-medium">{winnerText}</p>
                <p>{resetButton}</p>
            </div>
        );
    }
}

export default GameBoard;
