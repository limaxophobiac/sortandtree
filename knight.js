
function knightMoves(startPoint, destination){

    let board = new Array(8).fill(0).map(elem => new Array(8).fill(0));
    const moveFact = (parent, xPos, yPos) => ({parent, xPos, yPos});
    const validMove = (xPos, yPos) =>  (xPos >= 8 || yPos >= 8 || xPos < 0 || yPos < 0 || board[xPos, yPos] == 1) ? false : true;

    if (!validMove(startPoint[0], startPoint[1]) || !validMove(destination[0], destination[1])) throw new Error("invalid start or destination");
    
    let moveQueue = [moveFact(null, startPoint[0], startPoint[1])];
    let solutionArray = [];

    while (moveQueue.length > 0){
        let move = moveQueue.shift();
        if (move.xPos == destination[0] && move.yPos == destination[1]){
            while (move != null){
                solutionArray.unshift([move.xPos, move.yPos]);
                move = move.parent;
            }
            break;
        }
        if (validMove(move.xPos+1, move.yPos+2)) moveQueue.push(moveFact(move, move.xPos+1, move.yPos+2));
        if (validMove(move.xPos+2, move.yPos+1)) moveQueue.push(moveFact(move, move.xPos+2, move.yPos+1));
        if (validMove(move.xPos+2, move.yPos-1)) moveQueue.push(moveFact(move, move.xPos+2, move.yPos-1));
        if (validMove(move.xPos+1, move.yPos-2)) moveQueue.push(moveFact(move, move.xPos+1, move.yPos-2));
        if (validMove(move.xPos-1, move.yPos+2)) moveQueue.push(moveFact(move, move.xPos-1, move.yPos+2));
        if (validMove(move.xPos-2, move.yPos+1)) moveQueue.push(moveFact(move, move.xPos-2, move.yPos+1));
        if (validMove(move.xPos-2, move.yPos-1)) moveQueue.push(moveFact(move, move.xPos-2, move.yPos-1));
        if (validMove(move.xPos-1, move.yPos-2)) moveQueue.push(moveFact(move, move.xPos-1, move.yPos-2));
    }

    console.log("You made it in " + solutionArray.length + " moves. Here's the path:\n");
    solutionArray.forEach(elem => console.log("[" + elem.toString() + "]\n"));

    return true;
}