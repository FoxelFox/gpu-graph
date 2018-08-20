import "./context";
import {startCompute} from "./context";
import {settings} from "./input/settings";

console.log("hello");

window["getSettings"] = () => {
    return settings;
};

window["start"] = () => {
    document.getElementById("settings").hidden = true;
    startCompute();
};