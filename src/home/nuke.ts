// nuke.js by qxxst
import {sourceFileOwned, currentBitnode} from 'lib/util';
import {getEnv} from 'env';

let Scanner: any;
if (getEnv().imQxxst) {
    import("lib/scan").then((module) => {
        Scanner = module.Scanner;
    })
}

/** @param {NS} ns */
export async function main(ns: any) {
	const target: string = ns.args[0];
    const factionServers: readonly string[] = ["CSEC", "avmnite-02h", "I.I.I.I", "run4theh111z"];

    if (ns.fileExists("BruteSSH.exe", "home")) {
        ns.brutessh(target);
    }
    if (ns.fileExists("FTPCrack.exe", "home")) {
        ns.ftpcrack(target);
    }
    if (ns.fileExists("relaySMTP.exe", "home")) {
        ns.relaysmtp(target);
    }
    if (ns.fileExists("HTTPWorm.exe", "home")) {
        ns.httpworm(target);
    }
    if (ns.fileExists("SQLInject.exe", "home")) {
        ns.sqlinject(target);
    }
    
    ns.nuke(target);
    if (sourceFileOwned(ns, 4, 1) || currentBitnode(ns) == 4) {
        if (getEnv().imQxxst) {
            let route_list: any = Scanner.route(ns, target, true);
            try {
                if (route_list) {
                    let first_stop: any = route_list.shift(); // pop home off
                    if (first_stop && first_stop != "home") {
                        route_list.unshift(first_stop);
                    }
                    for (let link of route_list) {
                        ns.singularity.connect(link);
                    }
                    await ns.singularity.installBackdoor();
                    await ns.sleep(1000);
                    ns.singularity.connect("home");
                }
            }
            catch {
                await ns.sleep(1000);
            }
        }
        
        if (factionServers.includes(target)) {
            await ns.sleep(1000);

            await ns.singularity.joinFaction("CyberSec");
            await ns.singularity.joinFaction("NiteSec");
            await ns.singularity.joinFaction("The Black Hand");
            await ns.singularity.joinFaction("BitRunners");
        }
    }
}