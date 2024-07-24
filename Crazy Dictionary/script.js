// async function fetchData(word){
//     const url = `https://wordsapiv1.p.mashape.com/words/${word}`;
//     const data = new FormData();
//     console.log(url);
//     data.append('q', 'English is hard, but detectably so');
    
//     const options = {
//         method: 'POST',
//         body: data
//     };
    
//     try {
//         const response = await fetch(url, options);
//         const result = await response.json();
//         console.log(result);
//     } catch (error) {
//         console.error(error);
//     }
// }

async function wordMeaning(word){
    const url = `https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${word}`;
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '55d9ae8c6dmshf72f34551fb6eb8p14d0edjsn7edd05623ae6',
		'x-rapidapi-host': 'mashape-community-urban-dictionary.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);
    return result;
} catch (error) {
	console.error(error);
}
}


document.addEventListener('DOMContentLoaded', function() {
    // Select the form
    const form = document.getElementById('myForm');

    // Add event listener for form submission
    form.addEventListener('submit', async function(event) {
        // Prevent the form from submitting the traditional way
        event.preventDefault();

        // Access the form data
        const word = document.getElementById('word').value;
        const required_type = document.getElementById('resultType').value;

        // Do something with the form data
        // console.log('Word:', word);
        // console.log('required_type:', required_type);

        // Example: Display the form data on the page
        // const output = document.createElement('p');
        // output.textContent = `Name: ${word}, Type: ${required_type}`;
        // document.body.appendChild(output);

        const response = await wordMeaning(word);
        console.log('response = ',response);
        const result = response.list[2]
        console.log(result);
        if(required_type==="everything"){

            const content = document.getElementById("result");
            
            const definition = `<ul><li> Definition: ${result.definition} </li>`;
            const example = `<li> Example: ${result.example} </li>`;
            const author = `<li> Author: ${result.author} </li></ul>`;
            
            content.innerHTML = "<br>" + definition + example + author + "</br>";

        }
        else if(required_type==="definition"){
            const content = document.getElementById('result');
            content.innerHTML = `<br>Definition: ${result.definition}</br>`
        }
        else if(required_type==="author"){
            const content = document.getElementById('result');
            content.innerHTML = `<br>Author: ${result.author}</br>`
        }

    });
});
