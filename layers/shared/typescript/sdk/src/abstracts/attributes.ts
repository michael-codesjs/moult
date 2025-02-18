import { ulid } from "ulid";
import { Attribute } from "./attribute";
import { MutateImmutable } from "./errors";
import { Publisher } from "./publisher";
import { EntriesFromAttributesSchema, GetSetMutableAttributes, AttributesConstructorParams, ToAttributeRecord } from "./types";
import { AttributeSchema, CommonAttributes } from "./types/attributes";

type CommonAttributesPlusOthers = CommonAttributes & Record<string, AttributeSchema<any, boolean>>;

export class Attributes<T extends CommonAttributesPlusOthers> extends Publisher {
	
	readonly Attributes: ToAttributeRecord<T> = {} as typeof this.Attributes; // safe to cast, will populate in constructor

	constructor(params: AttributesConstructorParams<T> = {} as any) {
		super(); // Publisher
		this.defineICommon();
		this.defineT(params);
	}

	/** Instaciates common attributes -> new Attributes */
	protected defineICommon() {

		this.Attributes.entity_type = new Attribute<T["entity_type"]["type"], true>({
			required: true,
			value: null as T["entity_type"]["type"],
			immutable: true
		});

		this.Attributes.id = new Attribute<string, true>({
			required: true,
			value: null as unknown as string,
			validate: value => typeof value === "string" && value.length > 0,
			immutable: true
		});

		this.Attributes.creator = new Attribute<string, true>({
			required: true,
			value: null as unknown as string,
			validate: value => value === null || (typeof value === "string" && value.length > 0),
			immutable: true
		});

		this.Attributes.creator_type = new Attribute<T["creator_type"]["type"], true>({
			required: true,
			value: null,
			immutable: true
		});

		this.Attributes.created = new Attribute<Date, true>({
			required: true,
			value: new Date(),
			immutable: true
		});

		this.Attributes.modified = new Attribute<Date, true>({
			value: null as unknown as Date,
			immutable: true
		});

		this.Attributes.discontinued = new Attribute<boolean, true>({
			value: false,
			immutable: true,
			validate: value => typeof value === "boolean"
		});

	}

	/** Places T attributes in the attributes collection. */
	private defineT(params: ConstructorParameters<typeof Attributes>[0]) {
		Object.entries(params).forEach(([key, value]) => {
			if(!(value instanceof Attribute)) throw new Error("Member of attributes collection is not of type 'Attribute'.");
			this.Attributes[key as keyof typeof this.Attributes] = value;
		});
	}

	/** set values of attributes including immutable values. */
	parse(attributes: Partial<EntriesFromAttributesSchema<T>>) {

		const { entity_type, discontinued, created, id, creator, modified, creator_type, ...rest } = attributes;

		const _created = created || new Date();
		const _modified = modified ? new Date(modified) : null;

		// some special cases were we set things manually
		this.Attributes.entity_type.set(entity_type, _modified);
		this.Attributes.id.set(id || ulid(), _modified); // genereate new ulid if none was specified.

		this.Attributes.discontinued.set(typeof discontinued !== "boolean" ? false : discontinued, _modified);
		this.Attributes.created.set(_created, _modified);
		this.Attributes.modified.set(_modified, _modified);
		
		if (creator && creator_type) {
			this.Attributes.creator.set(creator, _modified);
			this.Attributes.creator_type.set(creator_type, _modified);
		} else { // if an entity's creator is not specified, it's its own creator
			this.Attributes.creator.set(this.Attributes.id.get(), _modified);
			this.Attributes.creator_type.set(this.Attributes.entity_type.get());
		}

		for (const key in rest) {
			if (!this.Attributes[key]) continue;
			this.Attributes[key].set(attributes[key], _modified);
		}

		this.publish(); // notify subscribers of value changes

	}

	private forEachOnMutate(
		attributes: Partial<EntriesFromAttributesSchema<T>>,
		setter: (value: any, key: string, modified?: Date) => void // REVIEW: properly strict type this
	) {

		const modified = new Date();
		this.Attributes.modified.set(modified);

		for (const key in attributes) {
			if (!(key in this.Attributes)) continue;
			const value = attributes[key];
			setter(value, key, modified);
		}

		this.publish(); // notify subscribers of value changes

	}

	/** Set mutable attributes */
	set(attributes: GetSetMutableAttributes<T>) {

		this.forEachOnMutate(attributes as EntriesFromAttributesSchema<T>, (value, key, modified) => {
			const attribute = this.Attributes[key];
			if (attribute.immutable) throw new MutateImmutable(); // can not mutate immutable attribute via set
			attribute.set(value, modified);
		});

		this.publish(); // notify subscribers of value changes

	}

	/** Get an attributes value */
	get<K extends keyof T>(attribute: K): T[K]["type"] {
		return this.Attributes[attribute].get();
	}

	/** Get all attribute values */
	collective(): EntriesFromAttributesSchema<T> {
		const collective: EntriesFromAttributesSchema<T> = {} as EntriesFromAttributesSchema<T>; // safe to cast, will fill up below
		for (const key in this.Attributes) {
			const attribute = this.Attributes[key];
			collective[key] = attribute.get();
		}
		return collective;
	}

	/** Get all non null values */
	valid(): Partial<EntriesFromAttributesSchema<T>> {
		return Object.entries(this.Attributes)
			.reduce((collective, [key, value]) => {
				if (value.nullish()) return collective; // return early if nullish
				collective[key as keyof typeof collective] = value.value;
				return collective;
			}, {} as Partial<EntriesFromAttributesSchema<T>>);
	}

	/** Checks if we have enough values to persist attributes to a store. */
	isPutable(): boolean {
		// attributes collection is not putable if at least one of it's attributes are not putable
		return !(Object.values(this.Attributes).some(attribute => !attribute.isPutable()));
	}

	/** Checks if we have values we need to sync with a store. */
	isUpdateable(): boolean {
		return Object.values(this.Attributes).some(attribute => attribute.isUpdateable());
	}

	/** Gets list of all attributes */
	keys<R extends T = T>(): Array<keyof R> {
		return Object.keys(this.Attributes);
	}

}