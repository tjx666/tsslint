// @ts-nocheck

async function returnsPromise1() {
	return Promise.resolve(1);
}

const returnsPromise2 = () => returnsPromise1();



async function numberOne(): Promise<number> {
	return 1;
}

const numberOne = async (): Promise<number> => 1;

async function foo() {
	function nested() {
		await doSomething();
	}
}

function isAsyncIterable(value: unknown): value is AsyncIterable<any> {
	return true;
}
async function* asyncGenerator(source: Iterable<any> | AsyncIterable<any>) {
	if (!isAsyncIterable(source)) {
		yield* source;
	}
}