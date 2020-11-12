let app = {
	// ----------------------------------------------------------------------------------------------------------------
	// MANIPULATION DU DOM DE L'APPLICATION
	// ----------------------------------------------------------------------------------------------------------------
	dom: {
		setLoginState: function (user) {
			if (user !== null) {
				const { displayName = null, email = null, photoURL = null } = user;
				// indiquer via une classe CSS dans la navbar qu'on est connecté
				document.querySelector("nav.navbar").classList.add("logged");
				// rajouter un marqueur au bout de la navbar avec les infos de l'user
				const image = photoURL
					? ` <img class="nav-avatar" src="${photoURL}" alt="${
							displayName || email
					  }">`
					: "";
				document.querySelector(
					"nav.navbar .navbar-nav:last-child"
				).innerHTML += `<li class="nav-item user"><a class="nav-link" href="#">${
					displayName || email
				}${image}</a></li>`;
			} else {
				document.querySelector("nav.navbar").classList.remove("logged");
				const userElt = document.querySelector("nav.navbar .user");
				if (userElt) userElt.remove();
			}
		},
		wrapMsg: function (msg, type = "primary") {
			return `<div class="alert alert-${type}" role="alert">
			<strong>${msg}</strong>
		</div>`;
		},
	},

	user: {
		logout: function () {
			firebase
				.auth()
				.signOut()
				.then(() => {
					app.mvc.router.navigateTo("/#/");
				})
				.catch(function (error) {
					console.log(error);
				});
		},
	},

	// ----------------------------------------------------------------------------------------------------------------
	// ARCHITECTURE MVC DE L'APPLICATION
	// ----------------------------------------------------------------------------------------------------------------
	mvc: {
		router: null,
		dispatchRoute: function (controllerInstance) {
			if (
				!controllerInstance.hasOwnProperty("viewUrl") ||
				controllerInstance.executeHttpRequest === undefined ||
				typeof controllerInstance.executeHttpRequest !== "function"
			) {
				return console.error(
					`Le controller ${controllerInstance.constructor.name} est invalide.`
				);
			}
			fetch(controllerInstance.viewUrl)
				.then((response) => response.text())
				.then((htmlContent) => {
					// viser le main, y écrire le contenu de la vue associée
					document.querySelector("main").innerHTML = htmlContent;
					// executer la méthode executeHttpRequest
					controllerInstance.executeHttpRequest();
				});
		},
	},
};

// L'application est exportée afin d'être accessible par d'autres modules.
export default app;