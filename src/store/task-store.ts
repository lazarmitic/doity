import { writable } from 'svelte/store';

import type Task from './../models/task';

export const tasks = writable<Task[]>([]);
