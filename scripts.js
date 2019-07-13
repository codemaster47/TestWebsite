// Listen to the windows "DOMContentLoaded" event (fired when the page has loaded)
window.addEventListener("DOMContentLoaded", onPageLoad)

// Called after the page has loaded
function onPageLoad () {
	// Get the stored files object from local storage
	var storedFilesObj = getStoredFilesObject()

	// Get the html container element for the uploaded images
	var container = document.getElementById("uploaded-images")

	// Get the files array of the stored files object
	var files = storedFilesObj.files

	// Loop from 0 to the number of image files stored
	for (var i = 0; i < files.length; i++) {

		// Create a new image html element
		var img = document.createElement('img')

		// Set the 'src' property of the image element
		//  to the "ith" file src in the stored object
		img.src = files[i]

		// Add the new image element to the html container
		container.append(img)
	}
}

// Listen to the "submit" event on the "upload-image-form"
document.getElementById("upload-image-form")
	.addEventListener("submit", onSubmitUploadImageForm)

// Called when the "submit" event is triggered on the "upload-image-form"
function onSubmitUploadImageForm () {
	// Get the form element
	var form = document.getElementById("upload-image-form")

	// Get the file input field (which we know is the first)
	var input = form.elements[0]

	// Loop from 0 to the number of files uploaded
	for (var i = 0; i < input.files.length; i++) {
		// Get the "i'th" file
		var file = input.files[i]

		// Test whether the file is valid
		if (file && file.size > 1) {
			// If the file is valid, save it
			saveFileInput(file)	
		}
	}	
}

// Method to save the given file input
function saveFileInput(fileInput) {
	// Create a JavaScript FileReader
	var reader = new FileReader()	

	// Listen for the "loadend" event (when the file reader is done loading)
	reader.addEventListener("loadend", function onLoadEnd () {
		// Get the binary representation of the loaded file
		var binary = reader.result

		// Convert the binary representation to a base64 representation of the file
		var base64 = btoa(binary)

		// Create the necessary parts for the "img.src" property
		var src = "data:" + fileInput.type + ";base64," + base64

		// Add the new file to the stored files
		addStoredFile(src)
	}, false)

	// Start the reading/loading of the file
	reader.readAsBinaryString(fileInput)	
}

// Returns a JavaScript object representing the stored files through a '.files' property
function getStoredFilesObject () {
	// Get the pure JSON from the local storage
	var storedFilesJSON = window.localStorage.getItem('joe_storedFiles')

	// Return the JSON parsed to a JavaScript object
	// If there is no stored JSON we create an empty object, with an empty files array
	return JSON.parse(storedFilesJSON) || { files: [] }
}

// Adds the src for the image of a file to the local storage
function addStoredFile (src) {
	// Get the stored files object 
	var storedFilesObj = getStoredFilesObject()

	// Add the new file to the files array 
	storedFilesObj.files.push(src)

	// Convert the file to JSON
	var storedFilesJSON = JSON.stringify(storedFilesObj)

	// Save the file in browser's local storage
	window.localStorage.setItem('joe_storedFiles', storedFilesJSON)
}

////****** Hide and show helpful text on button toggle *****/////

document.getElementById("show-help-text")
	.addEventListener("click", onShowHelpText)

function onShowHelpText () {
	// Get all elements with the "helpful-texts" class
	var helpfulTexts = document.getElementsByClassName("helpful-texts")

	// Loop from 0 to the number of helpful texts
	for (var i = 0; i < helpfulTexts.length; i++) {
		// Get the i'th helpful text element in the list
		var element = helpfulTexts[i]

		// Get the list of classes on the element
		var classList = element.classList

		// Test whether the element has the "hidden" class currently
		if (classList.contains("hidden")) {
			// If the element is hidden, remove the class
			classList.remove("hidden")	
		} else {
			// If the element is shown, add the hidden class
			classList.add("hidden")
		}		
	}
}


////***** Simple text and number input form shows alert ****///

document.getElementById("input-text-form").addEventListener("submit", onSubmitTextForm)

function onSubmitTextForm () {
	var form = document.getElementById("input-text-form")
	var text = form.elements[0]
	var number = form.elements[1]
	alert(text.value + ": " + number.value)
}

////****** Help button that adds text ********////

// Add click event listener (like 'onclick') to the button which adds the helpful text
document.getElementById("add-help-text").addEventListener("click", addHelpText)

function addHelpText () {
	// Test whether the element already exists, before creating it
	if (document.getElementById("helpful-text")) {
		// Element already exists, log text to console
		console.log("Text already exists")
	} else {		
		// Create new <p id="{id}">{innerHTML}</p> element
		var p = document.createElement("p")

		// Assign element properties
		p.id = "helpful-text"
		p.innerHTML = "Don't shoot yourself, please"
		
		// Add element to container
		var container = document.getElementById("added-help-btns")
		container.append(p)
	}
}

////****** Random size button ******/////

document.getElementById("random-size-button")
	.addEventListener("click", setRandomButtonSize)

function setRandomButtonSize () {
	// Generate a random width from 0 to the window's width
	var width = Math.floor(Math.random() * window.innerWidth)

	// Generate a random height from 0 to the window's height
	var height = Math.floor(Math.random() * window.innerHeight)

	// Generate the css with the random width and height
	var css = "width: " + width + "px; height: " + height + "px;"

	// Get the button html element
	var button = document.getElementById("random-size-button")

	// Set the style property of the button to the generated css
	button.style = css
}

////****** Help button with Google link ********////

document.getElementById("add-help-btn").addEventListener("click", addHelpBtn)

function addHelpBtn () {
	// console.log("Add help button clicked")	
	const googleLinkId = "google-link"
	if (document.getElementById(googleLinkId)) {
		console.log("Button already exists")
	} else {		
		var a = document.createElement("a")
		a.id = googleLinkId
		a.href = "http://google.com"
		a.innerHTML = "Google"	
		a.target = "_blank"	
		
		var container = document.getElementById("added-help-btns")
		container.append(a)
	}
}

////**** Change to random background color on resize event ****////

window.addEventListener("resize", onResize)

function onResize () {
	// Get the element to color
	var container = document.getElementById("random-color-container")

	// Set the style attribute to a random background color
	container.style = "background-color: " + getRandomColor()
}

function getRandomColor() { 
	// Get random red, green and blue values between 0 and 254   
    var red = Math.floor(Math.random() * 255)
    var green = Math.floor(Math.random() * 255)
    var blue = Math.floor(Math.random() * 255)
    
    // Get a random alpha value between 0.0 and 1.0 (only 1 decimal!)
    var alpha = Math.ceil(Math.random() * 10) / 10

    // Return the full rgba string needed in css
    return "rgba(" + red +
    		 "," + green + 
    		 "," + blue + 
    		 "," + alpha + ")"
}

/////This is a code that changes the color of the button key with the namr klik her 
 document.getElementById("chance-color").addEventListener("click", chancecolor)
 
 function chancecolor(){
	
   ///Here do we make two variables, one fore the random color and one fore the button id
   var button = document.getElementById("chance-color")
   var color = getRandomColor()


	//Here do we make the buttons backgroundcolor random
   button.style = "background-color: " + color



}
