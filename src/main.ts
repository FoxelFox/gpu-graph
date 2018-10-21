import "./context";
import {startCompute} from "./context";
import {Settings, settings} from "./input/settings";
import "./global.css";
import * as buffer from "buffer";

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

const input = document.getElementById("file-selector");
input.addEventListener("change", (file: any) => {
	const reader = new FileReader();

	reader.onload = (data) => {
		parse(data.target.result.match(/[^\r\n]+/g));
	};

	reader.readAsText(file.target.files[0]);
});

function parse(lines: string[]) {

	let maxEdges = 0;
	let maxForce = 0;
	let map = {};
	let index: number = 0;
	for(let i = 1; i < lines.length; ++i) {
		const v = lines[i].split("|");
		const prem = map[v[0]] ? map[v[0]] : map[v[0]] = { id: index++, edges: []};

		const force = parseFloat(v[2]);

		if (maxForce < force) {

			maxForce = force < 500 ? force : maxForce;
		}

		prem.edges.push({
			conc: v[1],
			force: force
		});

		if (maxEdges < prem.edges.length) {
			maxEdges++;
		}
	}

	const data = [];
	// TODO
	let base = Math.sqrt(Object.keys(map).length);
	if (base % 1 !== 0) {
		base = nextPo2(base + 1);
	}
	maxEdges = nextPo2(maxEdges);
	for (const key in map) {

		const edges = [];
		for (const edge of map[key].edges) {
			if (map[edge.conc]) { // check was needed for some data sets
				const index: number = map[edge.conc].id;
				let y = Math.floor(index / base);
				let x = index % base;
				edges.push([x, y, edge.force / maxForce, 0])
			}
		}

		// padding
		for (let p = edges.length; p < maxEdges; p++) {
			edges.push([-1, -1 , -1, 0]);
		}
		data[map[key].id] = edges;
	}


	let buffer = [];
	for(const node of data) {
		for(const edge of node) {
			buffer.push(...edge);
		}
	}

	console.log("Nodes: ", Object.keys(map).length);
	console.log("Size: ", base);
	console.log("Max. edges: ", maxEdges);

	settings.nodes = Object.keys(map).length;
	settings.data = buffer;
	settings.Size = base;
	window.start();
}

function nextPo2(n: number) {
	let i = 0;
	while (n >= Math.pow(2, i)) {
		i++;
	}

	return Math.pow(2, i);
}
