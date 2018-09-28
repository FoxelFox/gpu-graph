export class Settings {
	size: number = 512;
	edges: number = 16;
	indices: number[];
	data
	nodes: number;

	set Size(s) {
		this.size = s;

		const p = [];

		for (let x = 0; x < this.size; ++x) {
			for (let y = 0; y < this.size; ++y) {
				p.push(x);
				p.push(y);
			}
		}

		this.indices = p;
	}

}

export const settings = new Settings();