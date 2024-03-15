// scp/drain.js by qxxst
/** @param {NS} ns */
export async function main(ns) {
	const target = ns.args[0];
	const minSecurityLevel = ns.getServerMinSecurityLevel(target);
	const maxMoney = ns.getServerMaxMoney(target);
	const moneyThreshold = maxMoney * 0.01;

	while (true) {
		var securityLevel = ns.getServerSecurityLevel(target);
		var moneyAvailable = ns.getServerMoneyAvailable(target)
		if (securityLevel > minSecurityLevel) {
			await ns.weaken(target);
		} else if (moneyThreshold > moneyAvailable) {
    		await ns.grow(target);
		} else {
			await ns.hack(target);
		}
	}
}