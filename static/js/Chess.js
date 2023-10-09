
// Inserting the Images
count1 = 0
count2 = 0
let moves = []
function insertImage() {

    document.querySelectorAll('.box').forEach(image => {
        if (image.innerText.length !== 0) {
            if (image.innerText == 'Wpawn' || image.innerText == 'Bpawn') {
                image.innerHTML = `${image.innerText} <img class='allimg allpawn' src="${'static/images/'+image.innerText}.png" alt="">`
                image.style.cursor = 'pointer'

            }

            else {

                image.innerHTML = `${image.innerText} <img class='allimg' src="${'static/images/'+image.innerText}.png" alt="">`
                image.style.cursor = 'pointer'
            }
        }
    })
}
insertImage()

document.addEventListener('DOMContentLoaded', function () {
    const resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('click', function () {
        resetGame();
    });

    function resetGame() {
        window.location.reload();
    }
});
//Coloring

function coloring() {
    const color = document.querySelectorAll('.box')

    color.forEach(color => {

        getId = color.id
        arr = Array.from(getId)
        arr.shift()
        aside = eval(arr.pop())
        aup = eval(arr.shift())
        a = aside + aup

        if (a % 2 == 0) {
            color.style.backgroundColor = '#EEEED2'
        }
        if (a % 2 !== 0) {
            color.style.backgroundColor = '#769656'
        }

    })
}
coloring()




//function to not remove the same team element

function reddish() {
    document.querySelectorAll('.box').forEach(i1 => {
        if (i1.style.backgroundColor == 'tan') {

            document.querySelectorAll('.box').forEach(i2 => {

                if (i2.style.backgroundColor == 'palegreen' && i2.innerText.length !== 0) {


                    palegreenText = i2.innerText

                    tanText = i1.innerText

                    tanColor = ((Array.from(tanText)).shift()).toString()
                    palegreenColor = ((Array.from(palegreenText)).shift()).toString()

                    getId = i2.id
                    arr = Array.from(getId)
                    arr.shift()
                    aside = eval(arr.pop())
                    aup = eval(arr.shift())
                    a = aside + aup

                    if (a % 2 == 0 && tanColor == palegreenColor) {
                        i2.style.backgroundColor = 'rgb(240, 201, 150)'
                    }
                    if (a % 2 !== 0 && tanColor == palegreenColor) {
                        i2.style.backgroundColor = 'rgb(100, 75, 43)'
                    }

                }
            })
        }
    })
}










tog = 1
whiteCastleChance=true
blackCastleChance=true

document.querySelectorAll('.box').forEach(item => {



    item.addEventListener('click', function () {

        // To delete the opposite element
        
        if (item.style.backgroundColor == 'palegreen' && item.innerText.length == 0) {
            tog = tog + 1
            
            
        }
        else if (item.style.backgroundColor == 'palegreen' && item.innerText.length == 0) {
            tog = tog + 1
            
        }

        else if (item.style.backgroundColor == 'palegreen' && item.innerText.length !== 0) {

            document.querySelectorAll('.box').forEach(i => {
                if (i.style.backgroundColor == 'tan') {
                    tanId = i.id
                    tanText = i.innerText

                    document.getElementById(tanId).innerText = ''
                    item.innerText = tanText
                    coloring()
                    insertImage()
                    tog = tog + 1
                    sanMove1 = convertToSAN(tanId)
                    sanMove2 = convertToSAN(item.id)
                    sanMoveAll = sanMove1 + sanMove2
                    moves.push(sanMoveAll)
                    console.log(moves)
                    
                        
                    
                }
            })
        }



        getId = item.id
        arr = Array.from(getId)
        arr.shift()
        aside = eval(arr.pop())
        arr.push('0')
        aup = eval(arr.join(''))
        a = aside + aup
        

        function promotion(pawnItem)
        {
            promotionChoice = queen
            pawnItem.innerText = `${toggle}${promotionChoice.toLowerCase()}`;
            coloring();
            insertImage();
            
        }
        // Function to display the available paths for all pieces
        function whosTurn(toggle) {

            // PAWN
            

            if (item.innerText == `${toggle}pawn`) {
                item.style.backgroundColor = 'tan'

                if (tog % 2 !== 0 && aup < 800) {

                    if (aup == 200 && document.getElementById(`b${a + 100}`).innerText.length == 0) {
                        document.getElementById(`b${a + 100}`).style.backgroundColor = 'palegreen'
                        if (aup == 200 && document.getElementById(`b${a + 200}`).innerText.length == 0) {
                            document.getElementById(`b${a + 200}`).style.backgroundColor = 'palegreen'
                        }
                    }

                    if (aup !== 200 && document.getElementById(`b${a + 100}`).innerText.length == 0) {
                        document.getElementById(`b${a + 100}`).style.backgroundColor = 'palegreen'
                    }

                    if (aside < 8 && document.getElementById(`b${a + 100 + 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a + 100 + 1}`).style.backgroundColor = 'palegreen'
                    }

                    if (aside > 1 && document.getElementById(`b${a + 100 - 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a + 100 - 1}`).style.backgroundColor = 'palegreen'

                    }
                    
                }

                if (tog % 2 == 0 && aup > 100) {

                    if (aup == 700 && document.getElementById(`b${a - 100}`).innerText.length == 0) {
                        document.getElementById(`b${a - 100}`).style.backgroundColor = 'palegreen'
                        if (aup == 700 && document.getElementById(`b${a - 200}`).innerText.length == 0) {
                            document.getElementById(`b${a - 200}`).style.backgroundColor = 'palegreen'
                        }
                    }

                    if (aup !== 700 && document.getElementById(`b${a - 100}`).innerText.length == 0) {
                        document.getElementById(`b${a - 100}`).style.backgroundColor = 'palegreen'
                    }
                    if (aside < 8 && document.getElementById(`b${a - 100 + 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a - 100 + 1}`).style.backgroundColor = 'palegreen'
                    }
                    if (aside > 1 && document.getElementById(`b${a - 100 - 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a - 100 - 1}`).style.backgroundColor = 'palegreen'

                    }
                }
                

            }

            // KING

            if (item.innerText == `${toggle}king`) {
                
                if(whiteCastleChance==true && a==105 && document.getElementById('b106').innerText== '' && document.getElementById('b107').innerText== '' && document.getElementById('b108').innerText== 'Wrook'){
                    document.getElementById(`b107`).style.backgroundColor = 'palegreen'
                    
                }
                if(whiteCastleChance==true && a==105 && document.getElementById('b104').innerText== '' && document.getElementById('b103').innerText== '' && document.getElementById('b102').innerText== '' && document.getElementById('b101').innerText== 'Wrook'){
                    document.getElementById(`b103`).style.backgroundColor = 'palegreen'

                }
                if(blackCastleChance==true && a==805 && document.getElementById('b806').innerText== '' && document.getElementById('b807').innerText== '' && document.getElementById('b808').innerText== 'Brook'){
                    document.getElementById(`b807`).style.backgroundColor = 'palegreen'

                }
                if(blackCastleChance==true && a==805 && document.getElementById('b804').innerText== '' && document.getElementById('b803').innerText== '' && document.getElementById('b802').innerText== '' && document.getElementById('b801').innerText== 'Brook'){
                    document.getElementById(`b803`).style.backgroundColor = 'palegreen'

                }
                if (aside < 8) {
                    document.getElementById(`b${a + 1}`).style.backgroundColor = 'palegreen'

                }
                if (aside > 1) {

                    document.getElementById(`b${a - 1}`).style.backgroundColor = 'palegreen'
                }
                if (aup < 800) {

                    document.getElementById(`b${a + 100}`).style.backgroundColor = 'palegreen'
                }
                if (aup > 100) {

                    document.getElementById(`b${a - 100}`).style.backgroundColor = 'palegreen'
                }

                if (aup > 100 && aside < 8) {

                    document.getElementById(`b${a - 100 + 1}`).style.backgroundColor = 'palegreen'
                }
                if (aup > 100 && aside > 1) {

                    document.getElementById(`b${a - 100 - 1}`).style.backgroundColor = 'palegreen'
                }
                if (aup < 800 && aside < 8) {

                    document.getElementById(`b${a + 100 + 1}`).style.backgroundColor = 'palegreen'
                }
                if (aup < 800 && aside > 1) {

                    document.getElementById(`b${a + 100 - 1}`).style.backgroundColor = 'palegreen'
                }
                
                

                item.style.backgroundColor = 'tan'

            }


            // ROOK

            if (item.innerText == `${toggle}rook`) {

                for (let i = 1; i < 9; i++) {

                    if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText == 0) {
                        document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'palegreen'
                    }
                    else if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText !== 0) {
                        document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'palegreen'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText == 0) {
                        document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'palegreen'
                    }
                    else if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText !== 0) {
                        document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'palegreen'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if ((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText == 0) {
                        document.getElementById(`b${a + i}`).style.backgroundColor = 'palegreen'
                    }
                    else if ((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText !== 0) {
                        document.getElementById(`b${a + i}`).style.backgroundColor = 'palegreen'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if ((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText == 0) {
                        document.getElementById(`b${a - i}`).style.backgroundColor = 'palegreen'
                    }
                    else if ((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText !== 0) {
                        document.getElementById(`b${a - i}`).style.backgroundColor = 'palegreen'
                        break
                    }
                }

                item.style.backgroundColor = 'tan'
            }



            // BISHOP

            if (item.innerText == `${toggle}bishop`) {


                for (let i = 1; i < 9; i++) {
                    if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = 'palegreen'
                    }
                    else if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = 'palegreen'
                        break
                    }
                }


                for (let i = 1; i < 9; i++) {
                    if (i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = 'palegreen'
                    }
                    else if (i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = 'palegreen'
                        break
                    }
                }


                for (let i = 1; i < 9; i++) {
                    if (i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = 'palegreen'
                    }
                    else if (i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = 'palegreen'
                        break
                    }

                }


                for (let i = 1; i < 9; i++) {
                    if (i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = 'palegreen'
                    }
                    else if (i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = 'palegreen'
                        break
                    }
                }



                item.style.backgroundColor = 'tan'

            }



            // QUEEN

            if (item.innerText == `${toggle}queen`) {


                for (let i = 1; i < 9; i++) {

                    if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText == 0) {
                        document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'palegreen'
                    }
                    else if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText !== 0) {
                        document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'palegreen'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText == 0) {
                        document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'palegreen'
                    }
                    else if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText !== 0) {
                        document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'palegreen'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if ((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText == 0) {
                        document.getElementById(`b${a + i}`).style.backgroundColor = 'palegreen'
                    }
                    else if ((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText !== 0) {
                        document.getElementById(`b${a + i}`).style.backgroundColor = 'palegreen'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if ((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText == 0) {
                        document.getElementById(`b${a - i}`).style.backgroundColor = 'palegreen'
                    }
                    else if ((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText !== 0) {
                        document.getElementById(`b${a - i}`).style.backgroundColor = 'palegreen'
                        break
                    }
                }



                for (let i = 1; i < 9; i++) {
                    if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = 'palegreen'
                    }
                    else if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = 'palegreen'
                        break
                    }
                }


                for (let i = 1; i < 9; i++) {
                    if (i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = 'palegreen'
                    }
                    else if (i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = 'palegreen'
                        break
                    }
                }


                for (let i = 1; i < 9; i++) {
                    if (i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = 'palegreen'
                    }
                    else if (i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = 'palegreen'
                        break
                    }
                }


                for (let i = 1; i < 9; i++) {
                    if (i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = 'palegreen'
                    }
                    else if (i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = 'palegreen'
                        break
                    }
                }



                item.style.backgroundColor = 'tan'

            }

            // KNIGHT

            if (item.innerText == `${toggle}knight`) {


                if (aside < 7 && aup < 800) {
                    document.getElementById(`b${a + 100 + 2}`).style.backgroundColor = 'palegreen'
                }
                if (aside < 7 && aup > 200) {
                    document.getElementById(`b${a - 100 + 2}`).style.backgroundColor = 'palegreen'
                }
                if (aside < 8 && aup < 700) {
                    document.getElementById(`b${a + 200 + 1}`).style.backgroundColor = 'palegreen'
                }
                if (aside > 1 && aup < 700) {
                    document.getElementById(`b${a + 200 - 1}`).style.backgroundColor = 'palegreen'
                }
                if (aside > 2 && aup < 800) {
                    document.getElementById(`b${a - 2 + 100}`).style.backgroundColor = 'palegreen'
                }
                if (aside > 2 && aup > 100) {
                    document.getElementById(`b${a - 2 - 100}`).style.backgroundColor = 'palegreen'
                }
                if (aside < 8 && aup > 200) {
                    document.getElementById(`b${a - 200 + 1}`).style.backgroundColor = 'palegreen'
                }
                if (aside > 1 && aup > 200) {
                    document.getElementById(`b${a - 200 - 1}`).style.backgroundColor = 'palegreen'
                }

                item.style.backgroundColor = 'tan'

            }
            
        }
        

        // Toggling the turn

        if (tog % 2 !== 0) {
            document.getElementById('tog').innerText = "Human's Turn"
            count1++;
            isWhiteTurn = true
            whosTurn('W')
            if (count1 == 1)
            {
                updateClock()
                setInterval(updateClock, 1000);
            }
            
        }
        if (tog % 2 == 0) {
            isWhiteTurn = false
            count2++
            document.getElementById('tog').innerText = "Computer's Turn"
            whosTurn('B')
            if(count2 == 1)
            {
                updateClock2()
                setInterval(updateClock2, 1000);
            }
        }

        reddish()



        // winning()

        numOfKings = 0


        document.querySelectorAll('.box').forEach(win => {
            if (win.innerText == 'Wking' || win.innerText == 'Bking') {
                numOfKings += 1
            }

        })

        if (numOfKings == 1) {
            setTimeout(() => {
                if (tog % 2 == 0) {
                    alert('White Wins !!')
                    location.reload()
                }
                else if (tog % 2 !== 0) {
                    alert('Black Wins !!')
                    location.reload()
                }
            }, 100)
        }



    })

})

// b208 change to h8 

function convertToSAN(move) {
    // Define a mapping of board coordinates to chess notation
    const fileToLetter = { '1': 'a', '2': 'b', '3': 'c', '4': 'd', '5': 'e', '6': 'f', '7': 'g', '8': 'h' };
    text = fileToLetter[move[3]]
    num = move[1]
    return text + num
}
function unconvertToSAN(move)
{
    const LetterTofile = { 'a': '1', 'b': '2', 'c': '3', 'd': '4', 'e': '5', 'f': '6', 'g': '7', 'h': '8' };
    text = LetterTofile[move[0]] // 
    num = move[1]
    return 'b' + num + '0' + text
}

// Moving the element
document.querySelectorAll('.box').forEach(item => {

    item.addEventListener('click', function () {


        if (item.style.backgroundColor == 'tan') {
            
            tanId = item.id
            tanText = item.innerText
            document.querySelectorAll('.box').forEach(item2 => {
                
                item2.addEventListener('click', function () {
                    getId = item2.id
                    arr = Array.from(getId)
                    arr.shift()
                    aside = eval(arr.pop())
                    arr.push('0')
                    aup = eval(arr.join(''))
                    a = aside + aup
                    if (tanId[1] > 6)
                        {
                        if (tanText == `Wpawn` && aup == 800 ) {
                            document.getElementById(`b${a}`).innerText = 'Wqueen'
                            document.getElementById(tanId).innerText = ''
                            coloring()
                            insertImage()
                            sanMove1 = convertToSAN(tanId)
                            sanMove2 = convertToSAN(item2.id)
                            sanMoveAll = sanMove1 + sanMove2
                            sanMoveAll += 'b'
                            moves.push(sanMoveAll)
                            console.log(sanMoveAll)
                        }
                    }
            
                    if(whiteCastleChance==true && a==107 && document.getElementById('b106').innerText== '' && document.getElementById('b105').innerText== '' && document.getElementById('b108').innerText== 'Wrook'){
                        document.getElementById('b106').innerText = 'Wrook'
                        document.getElementById('b107').innerText = 'Wking'
                        document.getElementById('b108').innerText = ''
                        document.getElementById('b105').innerText = ''
                        coloring()
                        insertImage()
                        moves.push('O-O')
                    }
                    if(whiteCastleChance==true && a==103 && document.getElementById('b104').innerText== '' && document.getElementById('b103').innerText== '' && document.getElementById('b102').innerText== '' && document.getElementById('b101').innerText== 'Wrook'){
                        document.getElementById('b104').innerText = 'Wrook'
                        document.getElementById('b103').innerText = 'Wking'
                        document.getElementById('b101').innerText = ''
                        document.getElementById('b105').innerText = ''
                        document.getElementById('b102').innerText = ''
                        coloring()
                        insertImage()
                        moves.push('O-O-O')
                    }
                    if(blackCastleChance==true && a==807 && document.getElementById('b806').innerText== '' && document.getElementById('b807').innerText== '' && document.getElementById('b808').innerText== 'Brook'){
                        document.getElementById('b806').innerText = 'Brook'
                        document.getElementById('b807').innerText = 'Bking'
                        document.getElementById('b808').innerText = ''
                        document.getElementById('b805').innerText = ''
                        coloring()
                        insertImage()
                        moves.push('O-O')
    
                    }
                    if(blackCastleChance==true && a==803 && document.getElementById('b804').innerText== '' && document.getElementById('b803').innerText== '' && document.getElementById('b802').innerText== '' && document.getElementById('b801').innerText== 'Brook'){
                        document.getElementById('b804').innerText = 'Brook'
                        document.getElementById('b803').innerText = 'Bking'
                        document.getElementById('b801').innerText = ''
                        document.getElementById('b805').innerText = ''
                        document.getElementById('b802').innerText = ''
                        coloring()
                        insertImage()
                        moves.push('O-O-O')
    
                    }
                
                    if (tanId[1] < 3){
                        if (tanText == `Bpawn` && aup == 100  ) {
                            document.getElementById(`b${a}`).innerText = 'Bqueen'
                            document.getElementById(tanId).innerText = ''
                            coloring()
                            insertImage()
                            
                            sanMove1 = convertToSAN(tanId)
                            sanMove2 = convertToSAN(item2.id)
                            sanMoveAll = sanMove1 + sanMove2
                            moves.push(sanMoveAll)
                            
                        }
                    }

                    if (item2.style.backgroundColor == 'palegreen' && item2.innerText.length == 0) {
                        

                        document.getElementById(tanId).innerText = ''
                        item2.innerText = tanText
                        coloring()
                        insertImage()
                        
                        sanMove1 = convertToSAN(tanId)
                        sanMove2 = convertToSAN(item2.id)
                        sanMoveAll = sanMove1 + sanMove2
                        moves.push(sanMoveAll)
                        console.log(moves)

                    }

                    else if (item2.style.backgroundColor == 'palegreen') {
                        if(item2.id=='b103'){
                            document.getElementById('b101').innerText = ''
                            document.getElementById('b102').innerText = ''
                            document.getElementById('b103').innerText = 'Wking'
                            document.getElementById('b104').innerText = 'Wrook'
                            document.getElementById('b105').innerText = ''
                            document.getElementById(tanId).innerText = ''
                            whiteCastleChance=false
                            coloring()
                            insertImage()
                            sanMove1 = convertToSAN(tanId)
                            sanMove2 = convertToSAN(item2.id)
                            sanMoveAll = sanMove1 + sanMove2
                            moves.push(sanMoveAll)
                            console.log(moves)
                            
                        }
                        else if(item2.id=='b107'){
                            document.getElementById('b105').innerText = ''
                            document.getElementById('b106').innerText = 'Wrook'
                            document.getElementById('b107').innerText = 'Wking'
                            document.getElementById('b108').innerText = ''
                            document.getElementById(tanId).innerText = ''
                            whiteCastleChance=false
                            coloring()
                            insertImage()
                            
                            sanMove1 = convertToSAN(tanId)
                            sanMove2 = convertToSAN(item2.id)
                            sanMoveAll = sanMove1 + sanMove2
                            moves.push(sanMoveAll)
                            console.log(moves)
                        }
                        else if(item2.id=='b803'){
                            document.getElementById('b801').innerText = ''
                            document.getElementById('b802').innerText = ''
                            document.getElementById('b803').innerText = 'Bking'
                            document.getElementById('b804').innerText = 'Brook'
                            document.getElementById('b805').innerText = ''
                            document.getElementById(tanId).innerText = ''
                            blackCastleChance=false
                            coloring()
                            insertImage()
                            
                            sanMove1 = convertToSAN(tanId)
                            sanMove2 = convertToSAN(item2.id)
                            sanMoveAll = sanMove1 + sanMove2
                            moves.push(sanMoveAll)
                            console.log(moves)
                            
                        }
                        else if(item2.id=='b807'){
                            document.getElementById('b805').innerText = ''
                            document.getElementById('b806').innerText = 'Brook'
                            document.getElementById('b807').innerText = 'Bking'
                            document.getElementById('b808').innerText = ''
                            document.getElementById(tanId).innerText = ''
                            blackCastleChance=false
                            coloring()
                            insertImage()
                            sanMove1 = convertToSAN(tanId)
                            sanMove2 = convertToSAN(item2.id)
                            sanMoveAll = sanMove1 + sanMove2
                            moves.push(sanMoveAll)
                            console.log(moves)

                        }
                        

                    }
                    
                })
            })

        }
        
        debugMove(moves)
        
    })
})
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
$(document).ready(function () {
    function resetBoard() {
        $.ajax({
            type: "GET",
            url: "/reset_board/",  // Use the correct URL for the reset endpoint
            success: function (data) {
                if (data.success) {
                    // Handle success, e.g., update the UI
                    console.log('Board reset successfully');
                    // Add code here to reset the UI, if needed
                } else {
                    // Handle error, e.g., display an error message
                    console.error('Board reset failed:', data.message);
                }
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
            }
        });
    }

    // Event listener for the reset board button
    $("#reset-button").click(function () {
        resetBoard();
    });
    var selectedAlgorithm = ''
    function updateChessboard(){
        var csrftoken = getCookie('csrftoken');
        var lastMove = moves[moves.length-1];
        if (selectedAlgorithm === "MCTS") {
            algorithmUrl = "/mcts_moves/"; // Replace with the actual URL for MCTS moves
        } else if(selectedAlgorithm === "test") {
            algorithmUrl = "/test/"; // Replace with the actual URL for alpha-beta moves
        }    
        $.ajax({
            type: "POST",
            url: algorithmUrl,
            data: JSON.stringify({'moves': [lastMove]}),
            contentType: "application/json; charset=utf-8", // Set content type to JSON
            dataType: "json", // Expect JSON response
            headers: {
                "X-CSRFToken": csrftoken  // Include the CSRF token in the request headers
            },
            success: function (data) {
                // Handle the response from the backend
                var bestMove = data.best_move;
                console.log('Best Move:', bestMove);
                if(bestMove === 'O-O' || bestMove === 'e8g8')
                {
                    document.getElementById('b806').innerText = 'Brook'
                    document.getElementById('b807').innerText = 'Bking'
                    document.getElementById('b808').innerText = ''
                    document.getElementById('b805').innerText = ''
                    coloring()
                    insertImage()
                }
                if(bestMove === 'O-O-O')
                {
                    document.getElementById('b804').innerText = 'Wrook'
                    document.getElementById('b803').innerText = 'Wking'
                    document.getElementById('b801').innerText = ''
                    document.getElementById('b805').innerText = ''
                    document.getElementById('b802').innerText = ''
                    coloring()
                    insertImage()
                }
                else
                {
                    c1 = bestMove[0] + bestMove[1]
                    c2 = bestMove[2] + bestMove[3]
                    fromMove = unconvertToSAN(c1)
                    toMove = unconvertToSAN(c2)
                    
                    moveForBlack(fromMove, toMove)
                }
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
                console.error("Error message:", error);
                console.error("Server response:", status);
            }
        })
       
    }
    function machineVsMachine() {
        var csrftoken = getCookie('csrftoken');
        var lastMove = moves[moves.length-1];
        mlmoves = []
        $.ajax({
            type: "POST",
            url: "/match_moves/", // Replace with the actual URL for match moves
            data: JSON.stringify({'moves': lastMove}),
            contentType: "application/json; charset=utf-8", // Set content type to JSON
            dataType: "json", // Expect JSON response
            headers: {
                "X-CSRFToken": csrftoken // Include the CSRF token in the request headers
            },
            success: function (data) {
                var bestMove = data.best_move;
                console.log('Best Move:', bestMove);
                c1 = bestMove[0] + bestMove[1]
                c2 = bestMove[2] + bestMove[3]
                fromMove = unconvertToSAN(c1)
                toMove = unconvertToSAN(c2)
                
                moveForBlack(fromMove, toMove)
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
                console.error("Error message:", error);
                console.error("Server response:", status);
            }
        });
    }
    $("#ajaxButton3").click(function (){
        setInterval(machineVsMachine, 3000);
    });
    $("#ajaxButton").click(function (){
        selectedAlgorithm = "test"
        setInterval(updateChessboard, 4000);
    });
    
    $("#ajaxButton2").click(function (){
        selectedAlgorithm = "MCTS";
        setInterval(updateChessboard, 5000);
    });
    
});
function moveForBlack(fromMove, toMove) {
    // Check if elements exist before accessing their properties
    var fromElement = document.getElementById(fromMove);
    var toElement = document.getElementById(toMove);
    // tao nuoc di cua black mau vang
    if (fromElement && toElement) {
        if (document.getElementById[`fromElement`] == `Bpawn` && toElement[1] == '1'  ) {
            document.getElementById(`toElement`).innerText = 'Bqueen'
            document.getElementById(`fromElement`).innerText = ''
            coloring()
            insertImage()
        }
        else{
            var save = fromElement.innerText;
            fromElement.innerText = '';
            toElement.innerText = save;
            coloring();
            insertImage();
            tog++;
            isWhiteTurn = true;
        }
    } else {
        // Handle the case where elements are not found
        console.error('Elements not found:', fromMove, toMove);
    }
}

function debugMove(move) {
    const n = move.length;
    for (let i = n - 1; i >= 0; i--) {
        if (move[i][0] === move[i][2] && move[i][1] === move[i][3]) {
            move.splice(i, 1);
        }
    }
    for (let i = n - 1; i >= 1; i--) {
        if (move[i] === move[i - 1]) {
            move.splice(i, 1);
        }
    }
    return move;
}





// Prvents from selecting multiple elements
z = 0
document.querySelectorAll('.box').forEach(ee => {
    ee.addEventListener('click', function () {
        z = z + 1
        if (z % 2 == 0 && ee.style.backgroundColor !== 'palegreen' && ee.style.backgroundColor !== 'palegreen') {
            coloring()
        }
    })
})
