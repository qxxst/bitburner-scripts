// deploy.js by qxxst
/** @param {NS} ns **/
export async function main(ns) {
    const host = ns.args[0];
    const script = "scp/drain.js";
    const home = "home";
    const optimizedTarget = ns.args[1];
    if (!ns.serverExists(host)) {
        ns.tprint(`Server '${host}' does not exist. Aborting.`);
        return;
    }
    if (!ns.ls(ns.getHostname()).find((f) => f === script)) {
        ns.tprint(`Script '${script}' does not exist. Aborting.`);
        return;
    }
    const target = host;
    if (ns.fileExists("BruteSSH.exe", "home")) {
        ns.brutessh(target);
        ns.brutessh(optimizedTarget);
    }
    if (ns.fileExists("FTPCrack.exe", "home")) {
        ns.ftpcrack(target);
        ns.ftpcrack(optimizedTarget);
    }
    if (ns.fileExists("relaySMTP.exe", "home")) {
        ns.relaysmtp(target);
        ns.relaysmtp(optimizedTarget);
    }
    if (ns.fileExists("HTTPWorm.exe", "home")) {
        ns.httpworm(target);
        ns.httpworm(optimizedTarget);
    }
    if (ns.fileExists("SQLInject.exe", "home")) {
        ns.sqlinject(target);
        ns.sqlinject(optimizedTarget);
    }
    ns.nuke(target);
    ns.nuke(optimizedTarget);
    /* if (util.sourceFileOwned(ns, 4, 2) || util.currentBitnode(ns, 4)) {
        await ns.singularity.installBackdoor(target);
        await ns.singularity.installBackdoor(optimizedTarget);
    } */
    let threads = Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / ns.getScriptRam(script));
    if (threads < 1) {
        threads = 1;
    }
    ns.scriptKill(script, host);
    ns.scp(script, host, home);
    ns.exec(script, host, threads, optimizedTarget);
}
