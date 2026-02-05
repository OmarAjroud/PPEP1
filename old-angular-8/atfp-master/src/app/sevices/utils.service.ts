import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import { dropRight } from 'lodash';

@Injectable()
export class UtilsService {
	constructor(private router: Router) {}

	/**
	 * Build url parameters key and value pairs from array or object
	 * @param obj
	 */
	urlParam(obj: any): string {
		return Object.keys(obj)
			.map(k => k + '=' + encodeURIComponent(obj[k]))
			.join('&');
	}

	/**
	 * Simple object check.
	 * @param item
	 * @returns {boolean}
	 */
	isObject(item) {
		return item && typeof item === 'object' && !Array.isArray(item);
	}

	/**
	 * Deep merge two objects.
	 * @param target
	 * @param ...sources
	 * @see https://stackoverflow.com/a/34749873/1316921
	 */
	mergeDeep(target, ...sources) {
		if (!sources.length) {
			return target;
		}
		const source = sources.shift();

		if (this.isObject(target) && this.isObject(source)) {
			for (const key in source) {
				if (this.isObject(source[key])) {
					if (!target[key]) {
						Object.assign(target, { [key]: {} });
					}
					this.mergeDeep(target[key], source[key]);
				} else {
					Object.assign(target, { [key]: source[key] });
				}
			}
		}

		return this.mergeDeep(target, ...sources);
	}

	getPath(obj, val, path?) {
		path = path || '';
		let fullpath = '';
		for (const b in obj) {
			if (obj[b] === val) {
				return path + '/' + b;
			} else if (typeof obj[b] === 'object') {
				fullpath =
					this.getPath(obj[b], val, path + '/' + b) || fullpath;
			}
		}
		return fullpath;
	}

	getFindHTTPParams(queryParams): HttpParams {
		const params = new HttpParams()
			.set('lastNamefilter', queryParams.filter)
			.set('sortOrder', queryParams.sortOrder)
			.set('sortField', queryParams.sortField)
			.set('pageNumber', queryParams.pageNumber.toString())
			.set('pageSize', queryParams.pageSize.toString());

		return params;
	}

	getHTTPHeader() {
		return {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		};
	}
	handleError<T>(operation = 'operation', result?: any) {
		return (error: any): Observable<any> => {
			console.error(error); // log to console instead

			// Let the app keep running by returning an empty result.
			return of(result);
		};
	}

	numberOnly(event, acceptStar = false): boolean {
		const charCode = (event.which) ? event.which : event.keyCode;
		if (acceptStar) {
			if (charCode === 42) {
				return true;
			}
		}
		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
			return false;
		}
		return true;

	}

	public getValueFromPaste(e: any, selector: string, length: number) {
		if ( e.target['name'] === selector) {
			const text = e.clipboardData.getData('text');
			let numb = text.match(/\d/g);
			if (numb) {
				if (numb.length > length ) {
					numb = dropRight(numb, numb.length - length);
				}
				numb = numb.join('');
				return numb;
			}

			return null;
		}
	}
}


export function isInteger(value: any): value is number {
	return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}


export function isString(value: any): value is string {
	return typeof value === 'string';
}
