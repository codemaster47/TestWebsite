document.getElementById("contact-form").addEventListener("submit", onContactFormSubmit)

function onContactFormSubmit (evt) {
	// Prevent the form from refreshing the page
	evt.preventDefault()

	// Prepare the output text
	var output = ""

	// Get the form
	var form = document.getElementById("contact-form")

	// Get the list of form elements / input fields
	var inputs = form.elements

	// Iterate from 0 to the number of input fields in the form
	for (var i = 0; i < inputs.length; i++) {
		// Get the "i'th" input field in the form
		var input = inputs[i]

		// Get the input field's value
		var value = input.value

		// Test whether the value is empty
		if (value) {
			// Only add to the output text if the value is not empty
			output += i + ": " + value + " ~ "	
		}		

		// Log to console
		console.log(i + ": " + value)
	}

	// Create p element and set its innerHTML
	var p = document.createElement("p")
	p.innerHTML = output

	// Append the p element to the form
	form.append(p)
}