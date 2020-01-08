# ProfileGenerator
# Introduction

I have created a command-line application that dynamically generates a PDF profile from a GitHub username. The command that I've used is ```node index.js```

The purpose of this application is to generate a PDF with the user's information on one page after the user is asked for his/her Github username and favorite color.

The username is supposed to target a specific user and the favorite color determines the theme color for the page. This ProfileGenerator PDF is supposed to make it easier to prepare reports for stakeholders.

The technology that I've used to complete this project is:
* Electron
* GitHub API

There are 2 files:

* `index.js`
* `test.js`

The PDF will be located in the Assets folder.

## Website


![alt text](https://github.com/orenamema/ProfileGenerator/raw/master/assets/images/profile.gif)

Here is the [link](https://orenamema.github.io/ProfileGenerator/) to the page

## Requirements

Following are the minimum requirements and what is displayed on this application:
Functional, deployed application.


* GitHub repository with a unique name and a README describing project.
* The application generates a PDF resume from the user provided GitHub profile.
* The generated resume includes a bio image from the user's GitHub profile.
* The generated resume includes the user's location and a link to their GitHub profile.
* The generated resume includes the number of: public repositories, followers, GitHub stars and following count.
* The background color of the generated PDF matches the color that the user provides.

## Code
I have followed the following 3 steps to pull the data from Github API:

* I - Promt user to get data
* II - Use Axios to pull user data from github API call
* III - We run the prompt then run the github API for the username provided

```async function promptr() {
	// Available only with `prompt-async`!
	prompt.start();
	var {GitHubUsername, favoriteColor} = await prompt.get(['GitHubUsername', 'favoriteColor']);
	console.log(GitHubUsername + "---" + favoriteColor);
	user = GitHubUsername;
	color = favoriteColor;
	return {'user':GitHubUsername, 'color': favoriteColor};
}

async function data_getr(the_input) {
	the_url = 'https://api.github.com/users/' + the_input.user;
	console.log(the_url);
	the_data = await axios.get(the_url);
	data = the_data.data;
	data['color'] = the_input.color;
	data['location_'] = data['location'].replace(" ", "%20");
}

promptr().then(function(the_input){
	data_getr(the_input).then(function(the_input){
		// console.log(data);
		console.log(generateHTML(data));
		converter(generateHTML(data));
	});
});```
