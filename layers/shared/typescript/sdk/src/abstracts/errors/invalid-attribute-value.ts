
export class InvalidAttributeValue extends Error {
	
	constructor() {
		super();
		this.name = "Invalid Attribute Value";
		this.message = "Trying to assign invalid value to attribute";
	}
	
}