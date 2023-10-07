import chess
import chess.pgn
import chess.svg

def piece_value(piece):
    # Assign values to chess pieces for a basic evaluation function
    if piece.piece_type == chess.PAWN:
        return 100
    elif piece.piece_type == chess.KNIGHT:
        return 310
    elif piece.piece_type == chess.BISHOP:
        return 320
    elif piece.piece_type == chess.ROOK:
        return 500
    elif piece.piece_type == chess.QUEEN:
        return 900
    elif piece.piece_type == chess.KING:
        return 0  # King has no intrinsic value


class Board(object):
    def __init__(self, fen=None):
        self.node_count = 0
        if fen is None:
            self.board = chess.Board()
        else:
            self.board = chess.Board(fen)

    def make_move(self, move):
        # move is defined such as "e2e4"
        self.board.push_san(move)

    def display(self):
        return str(self.board)

    def evaluation(self):
        pieceSquareTable = [
            [-50, -40, -30, -30, -30, -30, -40, -50],
            [-40, -20, 0, 0, 0, 0, -20, -40],
            [-30, 0, 10, 15, 15, 10, 0, -30],
            [-30, 5, 15, 20, 20, 15, 5, -30],
            [-30, 0, 15, 20, 20, 15, 0, -30],
            [-30, 5, 10, 15, 15, 10, 5, -30],
            [-40, -20, 0, 5, 5, 0, -20, -40],
            [-50, -40, -30, -30, -30, -30, -40, -50]
        ]

        scoreWhite = 0
        scoreBlack = 0

        for i in range(8):
            for j in range(8):
                squareIJ = chess.square(i, j)
                pieceIJ = self.board.piece_at(squareIJ)

                if pieceIJ is None:
                    continue

                if pieceIJ.color == chess.WHITE:
                    scoreWhite += (piece_value(pieceIJ) + pieceSquareTable[i][j])
                else:
                    scoreBlack += (piece_value(pieceIJ) + pieceSquareTable[i][j])

        return scoreWhite - scoreBlack

    def alpha_beta(self, depth, alpha, beta, maximize):
        self.node_count += 1
        if depth == 0 or self.board.is_game_over():
            return self.evaluation()

        if self.board.is_checkmate():
            if self.board.turn == chess.WHITE:
                return -10000
            else:
                return 10000
        if self.board.is_stalemate() or self.board.is_insufficient_material():
            return 0
        legals = self.board.legal_moves
        if maximize:
            best_value = -99999
            for move in legals:
                self.board.push(move)
                best_value = max(best_value, self.alpha_beta(depth - 1, alpha, beta, (not maximize)))
                self.board.pop()
                alpha = max(alpha, best_value)
                if alpha >= beta:
                    return best_value
            return best_value
        if not maximize:
            best_value = 99999
            for move in legals:
                self.board.push(move)
                best_value = min(best_value, self.alpha_beta(depth - 1, alpha, beta,(not maximize)))
                self.board.pop()
                beta = min(beta, best_value)
                if beta <= alpha:
                    return best_value
            return best_value

    def get_bestMove(self, depth, maximize):
        legals = self.board.legal_moves
        bestMoves = None
        best_value = -99999 if maximize else 99999
        alpha = -float("inf")
        beta = float("inf")

        for move in legals:
            self.board.push(move)
            value = self.alpha_beta(depth - 1, alpha, beta, (not maximize))
            self.board.pop()

            if maximize:
                if value > best_value:
                    best_value = value
                    bestMoves = move
                alpha = max(alpha, best_value)
                if alpha >= beta:
                    break
            else:
                if value < best_value:
                    best_value = value
                    bestMoves = move
                beta = min(beta, best_value)
                if beta <= alpha:
                    break

        if bestMoves:
            from_square_name = chess.square_name(bestMoves.from_square)
            to_square_name = chess.square_name(bestMoves.to_square)
            bestMoveText = f"{from_square_name}{to_square_name}"
            return bestMoveText, best_value
        else:
            return None, best_value


if __name__ == "__main__":
    board = Board()

    # Game loop
    while not board.board.is_game_over():
        print(board.display())

        # White's turn (human player)
        if board.board.turn == chess.WHITE:
            move = input("Enter your move in SAN format (e.g., e2e4): ")
            board.make_move(move)

        # Black's turn (algorithm)
        else:
            best_move, best_value = board.get_bestMove(depth=4, maximize=False)
            print(f"Best move for Black: {best_move} with evaluation: {best_value}")
            print(f"Nodes expanded in this turn: {board.node_count}")
            # Debugging: Print the move generated by the algorithm
            print("Algorithm's move for Black:", best_move)
            black_move = best_move
            board.make_move(black_move)

    # Print the final result
    print("Game Over")
    result = board.board.result()
    if result == "1-0":
        print("You win!")
    elif result == "0-1":
        print("Black wins!")
    else:
        print("It's a draw!")