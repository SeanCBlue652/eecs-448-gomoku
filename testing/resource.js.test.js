/**
*	@file Testing file for testing resource.js
*/
let s = 'successful';
let e = 'error';
let testf1 = ['testing/testing_images/001.png'];
let testf2 = ['testing/testing_images/001.png', 'testing/testing_images/002.png'];

function resource_test(){
	test_loadImage(1000);
	test_toElem(5000);
}

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
	
	
}

function test_toElem(t){
	let test = 'test_toElem: ';
	let elemf1 = document.getElementById('img1');
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
	setTimeout(() => {
		//
		//load cache
		let rcache = loadImages(arr);
		let state = true;
		for(let i = 0; i < rcache.length; i++){
			try{
				toElem(rcache[i], elem);
			}
			catch(err){
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
	setTimeout(() => {
		//load the images into rCache
		let rCache = loadImages(arr);
		
		let state = true;
		Promise.all(rCache).then(() => {
			try{
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
