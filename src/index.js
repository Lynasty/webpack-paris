import node from 'node-loader!./file.node';
import Router from "vanilla-router";
import app from "./app.js";
import Home from "../controllers/Home.js";
import Search from "../controllers/Search.js";
import SearchMustLogin from "../controllers/SearchMustLogin.js";
import About from "../controllers/About.js";
import Signup from "../controllers/Signup.js";
import Login from "../controllers/Login.js";
import _ from 'lodash';
import './style.css';
import Icon from './subtle-grey.png';

import config from "./config.js";

// --------------------------------------------------------------------------------------------------------------------
// INITIALISATION DE L'APPLICATION
// --------------------------------------------------------------------------------------------------------------------

function initializeRouter(loggedIn = false) {
    // Instancier ici le Vanilla Router dans l'objet "app.mvc.router"
    app.mvc.router = new Router({
        mode: "hash",
    });

    // Définition des différentes routes disponibles
    app.mvc.router
            .add("/", () => app.mvc.dispatchRoute(new Home()))
            .add("/about", () => app.mvc.dispatchRoute(new About()));
    if (!loggedIn) {
        app.mvc.router
                .add("/signup", () => app.mvc.dispatchRoute(new Signup()))
                .add("/login", () => app.mvc.dispatchRoute(new Login()))
                .add("/search", () => app.mvc.dispatchRoute(new SearchMustLogin()));
    } else {
        app.mvc.router
                .add("/logout", () => app.user.logout())
                .add("/search", () => app.mvc.dispatchRoute(new Search()));
    }

    // Synchronisation puis activation du routeur (c.f. https://www.npmjs.com/package/vanilla-router#addurilistener)
    app.mvc.router.check().addUriListener();
}

// --------------------------------------------------------------------------------------------------------------------
// CODE PRINCIPAL
// --------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    // initialisation de firebase
    firebase.initializeApp(config.firebase);
    // Initialisation du routeur.
    initializeRouter();
    // vérifier si l'utilisateur est déjà connecté (et tous les futurs changements d'état de connexion)
    firebase.auth().onAuthStateChanged(function (user) {
        app.dom.setLoginState(user ? user : null);
        initializeRouter(user !== null);
    });
	 // Add the image to our existing div.
	  const myIcon = new Image();
	  myIcon.src = Icon;

	  element.appendChild(myIcon);
});