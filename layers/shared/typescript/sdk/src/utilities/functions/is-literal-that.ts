export const isLiteralObject = (obj: any): obj is Object => {
	return (!!obj) && (obj.constructor === Object);
};

export const isLiteralArray = <T = any>(arr: any): arr is Array<T> => {
	return Array.isArray(arr);
};
