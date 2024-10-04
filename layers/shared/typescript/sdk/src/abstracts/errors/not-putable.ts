export class NotPutable extends Error {
	
	constructor() {
		super();
		this.name = "Entity Putability Is False.";
		this.message = "Can not persist entity. Some of it's required attributes are missing.";
	}
	
}