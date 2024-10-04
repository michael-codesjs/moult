// shamelessly stolen from https://catchts.com/union-array who stole it from https://twitter.com/WrocTypeScript/status/1306296710407352321
export type TupleUnion<U extends string, R extends any[] = []> = {
	[S in U]: Exclude<U, S> extends never ? [...R, S] : TupleUnion<Exclude<U, S>, [...R, S]>;
}[U];