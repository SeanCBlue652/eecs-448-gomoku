/**
*	@file Testing file for testing resource.js
*/
/**
*	global variables
*/

//success message
let s = 'successful';
//error message
let e = 'error';

//test files
let testf1 = ['testing/testing_images/001.png'];
let testf2 = ['testing/testing_images/001.png', 'testing/testing_images/002.png'];

/**
*	@pre must have global variables loaded
*	@post tests the resource handling
*/
function resource_test(){
	//
	//draw function not tested because unused

	//test the loadimage function
	test_loadImage(1000);
	
	//test the toElement function
	test_toElem(5000);
}

/**
*	@pre must have global variables loaded
*	@post tests the loadImages between (0 - 2)
*/
function test_loadImage(t){
	let test = 'test_loadImages: ';
	//
	//test empty filearray
	loadImageTest([], test + 'empty array: ', s, e, t + 1000);
	
	//
	//test 1 element filearray
	loadImageTest(testf1, test + '1 element array: ', s, e, t + 2000);
	
	//
	//test max element filearray (there are no upperbounds)
	loadImageTest(testf2, test + '2 element array: ', s, e, t + 3000);
	
	//
	//invalid files not tested because error is given by browser instead of thrown
	
	
}

/**
*	@pre must have global variables loaded
*	Post tests the to element function
*/
function test_toElem(t){
	//test message
	let test = 'test_toElem: ';
	
	//valid element
	let elemf1 = document.getElementById('img1');
	
	//invalid element
	let elemf2 = document.getElementById('img3');
	
	//
	//test to element with empty cache
	toElemTest(elemf1, [], test + 'empty array: ', s, e, t + 1000);
	//
	//test to element with 1 element cache
	toElemTest(elemf1, testf1, test + '1 element array: ', s, e, t + 2000);
	
	//
	//test to element with 2 element cache
	toElemTest(elemf1, testf2, test + '2 element array: ', s, e, t+ 3000);
	
	//
	//test with missing element
	toElemTest(elemf2, testf1, test + 'missing element: ', s, e, t + 4000);
}

function toElemTest(elem, arr, message1, message2, message3, t){
	//set timeout to compensate for async code
	setTimeout(() => {
		//
		//load cache
		let rcache = loadImages(arr);
		let state = true;
		for(let i = 0; i < rcache.length; i++){
			try{
				//try each element
				toElem(rcache[i], elem);
			}
			catch(err){
				//if throws a error, catch and display
				err;
				state = false;
				if(state){
					console.log(message1 + message2);
				}
				else{
					console.log(message1 + message3);
				}
				return;
			}
		}
		console.log(message1 + message2);
	}, t);
}

function loadImageTest(arr, message1, message2, message3, t){
	//set timeout to compenstate for async code
	setTimeout(() => {
		//load the images into rCache
		let rCache = loadImages(arr);
		
		let state = true;
		//wait until all images have loaded
		Promise.all(rCache).then(() => {
			try{
				//test that teach has a valid src
				for(let i = 0; i < rCache.length; i++){
					rCache[i].then(img => {
						try{
							img.src;
						}
						catch(err){
							state = false;
						}
					});
				}
			}
			//if invalid src, throw error
			catch(err){
				state = false;
			}
			if(state){
				console.log(message1 + message2);
			}
			else{
				console.log(message1 + message3);
			}
		});
	}, t);
}
