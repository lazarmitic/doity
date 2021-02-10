import {v4 as uuid} from 'uuid';

export default class Task {
	public _id = uuid();
	public name = '';
	public completed = false;
	public estimate = 0;

	constructor(name: string, estimate: number) {
		this.name = name;
		this.estimate = estimate;
	}
}
