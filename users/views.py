from django.shortcuts import render
from algorithms import *
from django.http import JsonResponse
from django.http import HttpResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import redirect
def handle_moves(request):
    return render(request, 'index.html')
def reset_board(request):
    global board
    board = Board()
    return JsonResponse({'success': True, 'message': 'Board reset successfully'})
board = Board()
def test(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            
            moves = data.get('moves', [])
            n = len(moves)
            if len(moves) > 0:
                text = moves[n-1]
                board.make_move(text)
                best_move, best_value = board.get_bestMove(depth=4, maximize=False)
                board.make_move(best_move)
                # Process the moves array as needed
                # For this example, we'll just echo the best move back in the response
                response_data = {'success': True, 'best_move': best_move}
            else:
                response_data = {'success': False, 'error': 'Empty moves array'}

            return JsonResponse(response_data)
        
        except json.JSONDecodeError as e:
            # Handle JSON decoding error
            response_data = {'success': False, 'error': 'Invalid JSON data'}
            return JsonResponse(response_data, status=400)
    # If the request method is not POST, return an error response
    return JsonResponse({'error': 'Method not allowed'}, status=405)
# views.py

