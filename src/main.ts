import "./context";
import {startCompute} from "./context";
import {Settings, settings} from "./input/settings";
import "./global.css";

declare global {
    interface Window { 
        getSettings: () => Settings;
        start: () => void;
    }
}

window.getSettings = () => {
    return settings;
};

window.start = () => {
    document.getElementById("settings").hidden = true;
    startCompute();
};