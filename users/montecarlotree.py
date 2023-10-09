import chess
import random
import math
class TreeNode():
    def __init__(self, board):
        self.M = 0
        self.V = 0
        self.visitedMovesAndNodes = []
        self.nonVisitedLegalMoves = []
        self.board = board
        self.parent = None
        for m in self.board.legal_moves:
            self.nonVisitedLegalMoves.append(m)

    def isMCTSLeafNode(self):
        return len(self.nonVisitedLegalMoves) != 0
    
    def isTerminalNode(self):
        return len ( self . nonVisitedLegalMoves ) == 0 and len ( self.visitedMovesAndNodes ) == 0
    
def uctValue(node, parent):
    val = node.M + 1.1412 * math.sqrt(math.log(parent.V) / node.V)
    return val

def select(node):
    if(node.isMCTSLeafNode() or node.isTerminalNode()):
        return node
    else:
        maxUctChild = None
        maxUctValue = -1000000.
        for move, child in node.visitedMovesAndNodes:
            uctValChild = uctValue(child, node)
            if ( uctValChild > maxUctValue ) :
                maxUctChild = child
                maxUctValue = uctValChild
        if ( maxUctChild == None ) :
            raise ValueError (" could not identify child with bestuct value ")
        else :
            return select ( maxUctChild )

def expand(node):
    moveToExpand = node . nonVisitedLegalMoves . pop ()
    board = node . board . copy ()
    board . push ( moveToExpand )
    childNode = TreeNode ( board )
    childNode . parent = node
    node . visitedMovesAndNodes . append (( moveToExpand , childNode ) )
    return childNode

def simulate(node):
    board = node.board.copy()
    while not board.is_game_over():
        legal_moves = [move for move in board.legal_moves]
        if not legal_moves:
            break  
        move = random.choice(legal_moves)
        board.push(move)

    payout = 0.5
    outcome = board.outcome(claim_draw=True)
    if outcome.winner == chess.WHITE:
        payout = 1
    elif outcome.winner == chess.BLACK:
        payout = 0
    return payout

def backpropagate ( node , payout ) :
    node . M = (( node . M * node . V ) + payout ) / ( node . V + 1)
    node . V = node . V + 1
    if ( node . parent != None ) :
        return backpropagate ( node . parent , payout )
def get_best_move(board):
    root = TreeNode(board)

    for i in range(300):
        node = select(root)
        if not node.isTerminalNode():
            node = expand(node)
            payout = simulate(node)
            backpropagate(node, payout)

    # After the MCTS iterations, sort the child nodes based on their visit counts
    root.visitedMovesAndNodes.sort(key=lambda x: x[1].V, reverse=True)

    # Return the best move as a chess.Move object
    best_move, _ = root.visitedMovesAndNodes[0]
    return best_move.uci()



if __name__ == "__main__":
    board = chess.Board()

    while not board.is_game_over():
        if board.turn == chess.BLACK:
            algorithm_move = get_best_move(board)
            board.push_san(algorithm_move)
            print("Algorithm's Move:", algorithm_move)
        else:
            print(board)
            user_move = input("Enter your move (e.g., 'e2e4'): ")
            try:
                board.push_san(user_move)
            except ValueError:
                print("Invalid move. Try again.")

    # Game over, print the result
    print("Game Over. Result:", board.result())