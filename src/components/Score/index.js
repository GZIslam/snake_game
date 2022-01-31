export const Score = () => {
    let element = document.createElement("div");
    let score = 0;

    const getScore = () => score;
    
    const setScore = value => {
        score = value;
        element.innerHTML = score;
    };

    setScore(score);
    return { element, getScore, setScore };
};