// @ts-nocheck
// eslint playground: https://typescript-eslint.io/play/#ts=5.4.5&fileType=.ts&code=FAQwzgngdgxgBAMwK6wC4EsD2U7qgNxABt0ATASSgBUAnCAYRFRgAsBGACgEo4BvYOHFR0%2BAwXBoBTVEho4ACjUwBbdGEkA6KQCtJMVBwDkwiIa4BuMQF84MJqzgdJPfuLgB6d3AAimSWChjOEkADz0kVEk4UiQo1Ew4VTAwPABzOBAAdxB0VA1rYCtgUEhYRBR9LBw8QhIKajpGZhYAJm5RQRMO8VQWJUy4KEkBgFEaJRojSXHMGjNLQRs7ZsdnbsFPOABVKCGYfzAQESyc1HMJSV1K7DA4Fmmo0mwg9GUABxB9W2xhTCJEIiYTL5NxSGRyDLZXJwRQqNSaHR6AyGZaseYFIrATaKPCoW6GMCoI4YKDpcDQeCZWYAa0MABo4CiiJIQFAkG96YzyWUqTRqdFsJJDPlufBkGgqrgCMQyJRaAx7CwAMztVwZUpiioYbACgCCGoA6jTuAAuGFKJKSAA8%2BEwZAAfOtvlAwH9NIDUkZCcS0uqKXBebSLGJBCdoUMBrDLRwpK6iPgogBeR3qVBUV6STARGP%2BP4JhlsAAMxa4wbcMBubo0HqMooDNIFQ3Ri2KnREas6fSBg2GcDGEymMzmZbgS0VqxcIY8XgAsmoUqTIacQeIwbIcE99RSjXzuAtR4g8MQiBAnRWXVWa0yWWyOSOipi6%2BLrtVpXU5Y1FQAWVViLodoQuwGCM%2ByHQcJmbA9URYCcnV6foe1GMDDGmCYWkgmwECPIgTydTYdj2A4jlPMMzguK5tRdO4HkbF53k%2BVBnV%2Bf4EEBYEpzXCFSPNOF1C0S4kSMLCoGPUx70KYony1SUahlep5SaVgAFZf0ETicG4qN4X4uMEyMEx0UfDVyglHVZPfBoFWaAA2VSLnBDSoUYwxaliQxLCsIA&eslintrc=N4KABGBEBOCuA2BTAzpAXGUEKQHYHsBaaRAF1ml0IEMB3agS1PSnwDM3IAacbSAAVIBPAA4oAxtAYjShFPAa5SAehLlKNekxaRE0aPmiReAXxAmgA&tsconfig=&tokens=false

async function invalidInTryCatch1() {
	try {
		return Promise.reject('try');
	} catch (e) {
		// Doesn't execute due to missing await.
	}
}

async function invalidInTryCatch2() {
	try {
		throw new Error('error');
	} catch (e) {
		// Unnecessary await; rejections here don't impact control flow.
		return await Promise.reject('catch');
	}
}

// Prints 'starting async work', 'cleanup', 'async work done'.
async function invalidInTryCatch3() {
	async function doAsyncWork(): Promise<void> {
		console.log('starting async work');
		await new Promise(resolve => setTimeout(resolve, 1000));
		console.log('async work done');
	}

	try {
		throw new Error('error');
	} catch (e) {
		// Missing await.
		return doAsyncWork();
	} finally {
		console.log('cleanup');
	}
}

async function invalidInTryCatch4() {
	try {
		throw new Error('error');
	} catch (e) {
		throw new Error('error2');
	} finally {
		// Unnecessary await; rejections here don't impact control flow.
		return await Promise.reject('finally');
	}
}

async function invalidInTryCatch5() {
	return await Promise.resolve('try');
}

async function invalidInTryCatch6() {
	return await 'value';
}