import {useState} from "react";
import classNames from "classnames";

const bingoTexts: string[] = [
    "Technical difficulties",
    "Family member walks in",
    "Sorry I am late",
    "Only half of face visible on screen",
    "Let's take this offline after the call",
    "Someone wearing pajamas",
    "I am sorry can you repeat that",
    "Kid interrupts call",
    "Can everyone see my screen?",
    "Loud typing",
    "Catch someone rolling eyes",
    "Let's wait few minutes before starting",
    "",
    "Question avoided",
    "Awkward silence",
    "Can everyone hear me?",
    "Dog barking",
    "I'll get back on that",
    "Mixed metaphor",
    "Your screen is frozen",
    "someone missed the call",
    "We are waiting on...",
    "Coworker with new haircut / facial hair",
    "Can everyone turn on mute?",
    "People talking over each other"
];

function generateWinningIndexes(): number[][] {
    const winningIndexes: number[][] = [];
    const fiveNumbers = [0, 1, 2, 3, 4];
    for (let i = 0; i < 5; i++) {
        if (i === 2)
            continue;

        const horizontal = fiveNumbers.map(e => i * 5 + e)
        const vertical = fiveNumbers.map(e => e * 5 + i);
        winningIndexes.push(horizontal);
        winningIndexes.push(vertical)
    }

    return winningIndexes;
}

const allPossibleWinningIndexes: number[][] = generateWinningIndexes();


export function BingoComponent() {
    const [selected, setSelected] = useState<number[]>([]);
    const [won, setWon] = useState<boolean>(false);
    const [winningIndexes, setWinningIndexes] = useState<number[]>([]);

    function addSelected(index: number) {
        if (won || index === 12)
            return;

        const selectedIndex = selected.indexOf(index)
        if (selectedIndex === -1) {
            const newSelected = [...selected, index].sort();
            checkIsWon(newSelected);
            setSelected(newSelected);
        }
        else
        {
            selected.splice(selectedIndex, 1);
            const newSelected = [...selected];
            setSelected(newSelected);
        }
    }

    function checkIsWon(selected: number[]) {
        const checker = (arr: number[], target: number[]) => target.every(v => arr.includes(v));

        for (let i = 0; i < allPossibleWinningIndexes.length; i++) {

            if (checker(selected, allPossibleWinningIndexes[i])) {
                setWon(true);
                setWinningIndexes(allPossibleWinningIndexes[i]);
                return;
            }
        }

    }

    return <>
        <h2>{won.toString()}</h2>
        <div className="bingo-container">
        {bingoTexts.map((name, index) => {
            const cardClasses = classNames({
                "bingo-card": true,
                "bingo-card-selected": selected.indexOf(index) > -1,
                "bingo-card-winning": winningIndexes.indexOf(index) > -1,
            });
            return <button
                className={cardClasses}
                onClick={() => addSelected(index)}>{name}
            </button>})}
    </div></>;
}