import { InvalidAttributeValue } from "./errors";
import { AttributeParams } from "./types";

export class Attribute<T = any, I = false> {

	protected readonly required: boolean;
	public readonly immutable: I;
	private readonly validate: (value: T) => boolean = () => true;

	protected modified: Date | null;
	protected value: T;

	constructor({ required, validate, value, immutable }: AttributeParams<T, I>) {
		this.required = required || false;
		this.value = value;
		this.immutable = immutable!;
		this.validate = validate ? validate : this.validate;
	}

	get() { return this.value; }

	set(value: T, modified: Date = new Date()) {
		if (!this.validate(value)) throw new InvalidAttributeValue();
		this.value = value;
		this.modified = modified;
	}

	/** checks if an attribute can be written to the table */
	isPutable(): boolean {
		const canPut = (this.required ? !this.nullish() : true) && this.validate(this.value);
		return canPut;
	}

	/** checks if an attribute was modified at the same time as the collection it belongs to. */
	isUpdateable(date?: Date): boolean {
		if (this.immutable || (this.nullish() && !this.validate(this.value))) return false;
		if (date && this.modified) return date.valueOf() === this.modified.valueOf();
		else return true;
	}

	/** check if value is null or undefined  */
	nullish() {
		return this.value !== null && this.value !== undefined;
	}

}