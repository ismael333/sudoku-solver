var puzzle = [
            [5,3,0,0,7,0,0,0,0],
            [6,0,0,1,9,5,0,0,0],
            [0,9,8,0,0,0,0,6,0],
            [8,0,0,0,6,0,0,0,3],
            [4,0,0,8,0,3,0,0,1],
            [7,0,0,0,2,0,0,0,6],
            [0,6,0,0,0,0,2,8,0],
            [0,0,0,4,1,9,0,0,5],
            [0,0,0,0,8,0,0,7,9]];


// selon la position de la case donne a quel  carré elle appartient
function carreToInvoke(posa,posb){

 	let rowandcol = [[0,2],[3,5],[6,8]]
 	let therow = []
 	let thecol = []

 	for(var i = 0 ; i<rowandcol.length ;i++){

 		if(posa >= rowandcol[i][0] && posa <= rowandcol[i][1] ){

 			therow = rowandcol[i] 
 		}
 	}

 	for(var j = 0 ; j<rowandcol.length ;j++){

 		if(posb >= rowandcol[j][0] && posb <= rowandcol[j][1] ){

 			thecol = rowandcol[j] 
 		}
 	}

 	return [therow,thecol]
}



// donne les numbers qu'il ya dans le set carré 
function leSetcarre(rowcol){

 	var myset = new Set

 	for (var i = rowcol[0][0] ;i< rowcol[0][1] +1; i++){

 		

 		for(var j = rowcol[1][0] ; j < rowcol[1][1] +1 ; j++){

 			if(puzzle[i][j] !== 0){

 				myset.add(puzzle[i][j])

 			}
 			

 		}
 	}


 	return myset

}

// on cree un set a partir des nombres dans le row et la colonne relative a la case
function learrayColEtRow(rowa,cola){

	var mysetis = []

	for (var i =0 ; i< puzzle[rowa].length ;i++){
		if(puzzle[rowa][i] !==0){
			mysetis.push(puzzle[rowa][i])

		}
		 
	}
	


	for(var z= 0 ; z< puzzle.length ; z++){

		if(puzzle[z][cola] !== 0){
			mysetis.push(puzzle[z][cola])
		}
		
	}

	return mysetis


}

// va servir a fusionner tous les sets relatifs a une case donc 
//nous donne tous les nombres non autorises pour cette case
function fusioneSet(set1,set2){

	return new Set([...set1,...set2])

}

// nombre de solution pour cette case
//retourne la solution si il y'en a une sinon retourne -1
function solutions(row,col){

	var numnonautorises = fusioneSet(leSetcarre(carreToInvoke(row, col)), learrayColEtRow(row,col))
	var allposibilities = [1,2,3,4,5,6,7,8,9]
	var lasolution = new Set(allposibilities.filter(x=>!numnonautorises.has(x)))
	
	if(lasolution.size === 1){

		return lasolution
	}else{

		return -1
	}

}


// check si le row est plein ou pas
function rowFinished(arr){

	if(arr.indexOf(0) !== -1){

		return false
	}else{

		return true
	}
}

//on check si le sudoku a ete resoud
function sudokuSolved(puzzi){


	for(var i = 0 ; i<puzzi.length ;i++){

		if(rowFinished(puzzi[i]) === false){

			return false
		}
	}

	return true
}


// on imprime le sudoku
function printSudoku(puzzli){

	var puzzlitoprint = []
	for(var i = 0 ; i<puzzli.length ; i++){

		puzzlitoprint.push(puzzli[i])

	}

	return puzzlitoprint
}


/*console.log(solutions(2, 6))*/


function findingSolutions(){

	var solvedornot = sudokuSolved(puzzle)

	while(solvedornot !== true){


		for(var i = 0 ; i< puzzle.length ;i++){


			for(var j = 0 ; j < puzzle[i].length ; j++){


				var cased = puzzle[i][j]

				if(cased === 0){

					var masol = solutions(i, j)	
					if(masol !== -1){
						var iter = masol.values()
						puzzle[i][j] = iter.next().value
/*						console.log("foundone")
						console.log(printSudoku(puzzle))*/
					}else{

						/*console.log("pas found")*/
						// console.log(printSudoku(puzzle))
					}


				}
			}
		}

		solvedornot = sudokuSolved(puzzle)

	}



	return puzzle




}

findingSolutions()
