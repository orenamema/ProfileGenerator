// Prompting user library
const prompt = require("prompt-async");
// Using axios for github API call
const axios = require('axios');
// for file storing
const fs = require('fs')
// for pdf converting
// https://www.npmjs.com/package/electron-html-to
const convertFactory = require('electron-html-to');

// create variable
var conversion = convertFactory({
  converterPath: convertFactory.converters.PDF
});

// Color dictionary
const colors = {
  green: {
    wrapperBackground: "#E6E1C3",
    headerBackground: "#C1C72C",
    headerColor: "black",
    photoBorderColor: "#black"
  },
  blue: {
    wrapperBackground: "#5F64D3",
    headerBackground: "#26175A",
    headerColor: "white",
    photoBorderColor: "#73448C"
  },
  pink: {
    wrapperBackground: "#879CDF",
    headerBackground: "#FF8374",
    headerColor: "white",
    photoBorderColor: "#FEE24C"
  },
  red: {
    wrapperBackground: "#DE9967",
    headerBackground: "#870603",
    headerColor: "white",
    photoBorderColor: "white"
  }
};



// General variables
var data = {};
var user = 'orenamema';
var color = 'green';

// I - Promt user to get data
// This is from te prompt.js library
// https://nodejs.org/en/knowledge/command-line/how-to-prompt-for-command-line-input/

async function promptr() {
	// Available only with `prompt-async`!
	prompt.start();
	var {GitHubUsername, favoriteColor} = await prompt.get(['GitHubUsername', 'favoriteColor']);
	console.log(GitHubUsername + "---" + favoriteColor);
	user = GitHubUsername;
	color = favoriteColor;
	return {'user':GitHubUsername, 'color': favoriteColor};
}

// II - Use Axios to pull user data from github API call
async function data_getr(the_input) {
	the_url = 'https://api.github.com/users/' + the_input.user;
	console.log(the_url);
	the_data = await axios.get(the_url);
	// console.log(the_data.data);
	data = the_data.data;
	data['color'] = the_input.color;
	data['location_'] = data['location'].replace(" ", "%20");

}



// III - We run the prompt then run the github API for the username provided
promptr().then(function(the_input){
	data_getr(the_input).then(function(the_input){
		// console.log(data);
		console.log(generateHTML(data));
		converter(generateHTML(data));
	});
});




// IV - add data to html
function generateHTML(data) {
  // console.log(data);
  return `<!DOCTYPE html>
            <html lang="en">
               <head>
                  <meta charset="UTF-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <meta http-equiv="X-UA-Compatible" content="ie=edge" />

                  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
                  <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
                  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
                  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

                  <title>Document</title>
                  <style>
                      @page {
                        margin: 0;
                      }
                     *,
                     *::after,
                     *::before {
                     box-sizing: border-box;
                     }
                     html, body {
                     padding: 0;
                     margin: 0;
                     }
                     html, body, .wrapper {
                     height: 100%;
                     }
                     .wrapper {
                     background-color: ${colors[data.color].wrapperBackground};
                     padding-top: 100px;
                     }
                     body {
                     background-color: white;
                     -webkit-print-color-adjust: exact !important;
                     font-family: 'Cabin', sans-serif;
                     }
                     main {
                     background-color: #E9EDEE;
                     height: auto;
                     padding-top: 30px;
                     }
                     h1, h2, h3, h4, h5, h6 {
                     font-family: 'BioRhyme', serif;
                     margin: 0;
                     }
                     h1 {
                     font-size: 3em;
                     }
                     h2 {
                     font-size: 2.5em;
                     }
                     h3 {
                     font-size: 2em;
                     }
                     h4 {
                     font-size: 1.5em;
                     }
                     h5 {
                     font-size: 1.3em;
                     }
                     h6 {
                     font-size: 1.2em;
                     }
                     .photo-header {
                     position: relative;
                     margin: 0 auto;
                     margin-bottom: -50px;
                     display: flex;
                     justify-content: center;
                     flex-wrap: wrap;
                     background-color: ${colors[data.color].headerBackground};
                     color: ${colors[data.color].headerColor};
                     padding: 10px;
                     width: 95%;
                     border-radius: 6px;
                     }
                     .photo-header-img {
                     width: 250px;
                     height: 250px;
                     border-radius: 50%;
                     object-fit: cover;
                     margin-top: -75px;
                     border: 6px solid ${colors[data.color].photoBorderColor};
                     box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
                     }
                     .photo-header h1, .photo-header h2 {
                     width: 100%;
                     text-align: center;
                     }
                     .photo-header h1 {
                     margin-top: 10px;
                     }
                     .links-nav {
                     width: 100%;
                     text-align: center;
                     padding: 20px 0;
                     font-size: 1.1em;
                     }
                     .nav-link {
                     display: inline-block;
                     margin: 5px 10px;
                     }
                     .workExp-date {
                     font-style: italic;
                     font-size: .7em;
                     text-align: right;
                     margin-top: 10px;
                     }
                     .container {
                     padding: 50px;
                     padding-left: 100px;
                     padding-right: 100px;
                     }

                     .row {
                       display: flex;
                       flex-wrap: wrap;
                       justify-content: space-between;
                       margin-top: 20px;
                       margin-bottom: 20px;
                     }

                     .card {
                       padding: 20px;
                       border-radius: 6px;
                       background-color: ${colors[data.color].headerBackground};
                       color: ${colors[data.color].headerColor};
                       margin: 20px;
                     }
                     
                     .col {
                     flex: 1;
                     text-align: center;
                     }

                     .img-icon{
                         width: 20px;
                         height: 20px;
                     }

                     a, a:hover {
                     text-decoration: none;
                     color: inherit;
                     font-weight: bold;
                     }

                     @media print { 
                      body { 
                        zoom: .75; 
                      } 
                     }
                  </style>
                </head>
                <body>
	                <div class="container">
	                    <div class="photo-header">
	                        <img src="${data.avatar_url}" class="photo-header-img">
	                        <h1>Hi!</h1>
	                        <h2>My name is ${data.name}!</h2>
	                        <h2>Currently @ ${data.company}</h2>
	                        <h4>
	                            <img src="https://image.flaticon.com/icons/svg/17/17736.svg" class="img-icon">
	                            <a href="https://www.google.com/maps/place/${data.location_}">
	                                ${data.location}
	                            </a> 
	                            <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" class="img-icon">
	                            <a href="${data.html_url}">
	                                Github
	                            </a> 
	                            <img src="https://image.flaticon.com/icons/svg/56/56992.svg" class="img-icon">
	                            <a href="${data.blog}">
	                                Blog
	                            </a> 
	                        </h4>
	                    </div>
	                </div>
                    <div class="container">
                            <div class="col">
	                            <h1>${data.bio}</h1>
                            <div>
                        <div class="row">
                            <div class="col">
                                <div class="card">
                                    <h3>
                                        Public Repositories
                                    </h3>
                                    <h4>
                                       ${data.public_repos} 
                                    </h4>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card">
                                    <h3>
                                        Followers
                                    </h3>
                                    <h4>
                                       ${data.followers} 
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="card">
                                    <h3>
                                        GitHub Stars
                                    </h3>
                                    <h4>
                                       ${data.public_gists} 
                                    </h4>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card">
                                    <h3>
                                        Following
                                    </h3>
                                    <h4>
                                       ${data.following} 
                                    </h4>
                                </div>
                            </div>
                        </div>                        
                    </div>
                </body>
            </html>`
        }

// V - Fuunction to convert html to PDF
function converter(the_html){
	conversion({ html: the_html }, function(err, result) {
	  if (err) {
	  	console.log(`assets/pdf/${user}.pdf`);
	    return console.error(err);
	  }
	 
	  // console.log(result.numberOfPages);
	  // console.log(result.logs);

	  result.stream.pipe(fs.createWriteStream(`assets/pdf/${user}.pdf`));
	  conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
	});
}
