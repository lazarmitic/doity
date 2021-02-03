import {v4 as uuid} from 'uuid';

export default class Task {
	public _id = uuid();
	public name = '';
	public completed = false;

	constructor(name: string) {
		this.name = name;
	}
}
