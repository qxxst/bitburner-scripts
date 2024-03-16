// scp/drain.js by qxxst
/** @param {NS} ns */
export async function main(ns: any) {
	const target: string = ns.args[0];
	const minSecurityLevel: number = ns.getServerMinSecurityLevel(target);
	const maxMoney: number = ns.getServerMaxMoney(target);
	const moneyThreshold: number = maxMoney * 0.01;

	while (true) {
		var securityLevel: number = ns.getServerSecurityLevel(target);
		var moneyAvailable: number = ns.getServerMoneyAvailable(target)
		if (securityLevel > minSecurityLevel) {
			await ns.weaken(target);
		} else if (moneyThreshold > moneyAvailable) {
    		await ns.grow(target);
		} else {
			await ns.hack(target);
		}
	}
}