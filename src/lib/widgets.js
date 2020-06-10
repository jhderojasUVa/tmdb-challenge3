import {Router} from "wpe-lightning-sdk";

export default () =>{
    Router.widget("splash")
    Router.widget("movies", ["Menu", "Logo"])
    // We add this to have the widgets on the tv (aka series) route
    Router.widget("tv", ["Menu", "Logo"])
}