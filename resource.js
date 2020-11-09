/**
*	Image Loading code
*	Copied from https://github.com/tsopeter/space-invaders.git
*	Note that we need all images to finish loading when the game
*	initally opens. This requires a Promise.all(...).then(() => { }); at
*	load time.
*
*	Resources:
*	https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image
*/

/**
*	This takes one parameter
*	@param {[String]} fileArray	: Takes a array of file names and loads it
*/
function loadImages(fileArray){
	//
	//create a new array to store Promises
	let resourceCache = new Array(fileArray);
	
	//
	//load each image
	for(var i = 0; i < fileArray.length; i++){
	
		//
		//create a promise for each image to resolve
		//on load
		let t_p = new Promise(resolve => {
			let t_img = new Image();
			t_img.addEventListener('load', () => {
				resolve(t_img);
			});
			t_img.src = fileArray[i];
		});
		
		//
		//put the promises into the array
		resourceCache[i] = t_p;
	}
	
	//
	//output the array
	return resourceCache;
}
//
//	Note: Not used in this code
/**
*	This takes 3 parameters
*	@param {Promise} idx     : Takes the element index of the resource array
*	@param {Integer} dx      : x start of the destination image
*	@param {Integer} dy      : y start of the destination image
*/
function draw(idx, dx, dy){
	idx.then(img => {
		//console.log(img.width);
		context.drawImage(img, dx, dy);
	});
}

/**
*	This takes 2 parameters
*	@param {Promise} idx	: Takes the element of the resource array
*	@param {Object} dElem	: Takes in img document object
*/
function toElem(idx, dElem){
	if(dElem == null){
		throw 'missing dElem';
	}
	idx.then(img => {
		//
		//get the src and put into the dElem
		dElem.src = img.src;
	});
}
