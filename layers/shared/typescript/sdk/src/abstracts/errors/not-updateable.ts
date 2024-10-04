export class NotUpdateable extends Error {
	
	constructor() {
		super();
		this.name = "Entity Can't Be Updated.";
		this.message = "Can not update persisted entity.";
	}
	
}