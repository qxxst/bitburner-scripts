// startup.js by qxxst
import { sourceFileOwned, currentBitnode, getPorts } from 'lib/util.js';
/** @param {NS} ns */
export async function main(ns) {
    // SETTINGS
    // BitNodes to avoid using hacknet.js in.
    // Hacknet nodes do not work in BN 8 and have questionable returns on investment in others.
    const hacknetNotAllowed = [3, 4, 6, 7, 8];
    // Whether or not the script should stay on after completing all tasks
    const stayOn = true;
    // Whether or not the sleep function should be logged
    const logSleep = false;
    // The amount of time to sleep when "actually" waiting for things to happen
    const sleepTimeLong = 1000;
    // The smaller amount of time to sleep during loops to avoid RAM issues.
    // This can be lowered if you have lots of RAM on home. On the other hand, if scripts are not being deployed properly, try raising it.
    const sleepTimeShort = 100;
    // Set this to true to avoid creating a gang. Useful for BN2's challenge.
    const noGang = false;
    // CONSTANTS - DO NOT CHANGE
    const home = "home";
    const script = "deploy.js";
    const deployScript = "scp/drain.js";
    const defaultThreads = 1;
    // Declare variables
    var optimizedTarget = "foodnstuff";
    var targetThreshold = ns.getServerMaxMoney(optimizedTarget);
    if (logSleep == false) {
        ns.disableLog("sleep");
    }
    function resetTarget() {
        optimizedTarget = "foodnstuff";
        targetThreshold = ns.getServerMaxMoney(optimizedTarget);
    }
    resetTarget();
    ns.print("Starting target threshold is " + targetThreshold + ".");
    // Kills any previously running instances of hacknet.js, tix.js, and combatgang.js
    ns.scriptKill("hacknet.js", home);
    ns.scriptKill("tix.js", home);
    ns.scriptKill("combatgang.js", home);
    // BITNODE-SPECIFIC TASKS
    // Run combatgang.js if the current BitNode is 2, or SourceFile 2 is owned.
    if (currentBitnode(ns) == 2 || sourceFileOwned(ns, 2, 1)) {
        // But only if we actually have a gang to run, and noGangs isn't enabled.
        if (ns.gang.inGang() == true && noGang == false) {
            ns.exec("combatgang.js", home);
        }
    }
    // Run hacknet.js if the current BitNode isn't one that it shouldn't be used in.
    if (!hacknetNotAllowed.includes(currentBitnode(ns))) {
        ns.exec("hacknet.js", home);
    }
    // If the current BitNode is 8, or SourceFile 8 is owned, run tix.js immediately.
    let execTixLater = true;
    if (currentBitnode(ns) == 8 || sourceFileOwned(ns, 8, 1)) {
        ns.exec("tix.js", home);
        // Remind the script to not run tix.js again later
        execTixLater = false;
    }
    // GENERAL STARTUP TASKS
    // Declare lists of servers sorted by how many ports are required to access them
    const servers0Port = ["n00dles", "foodnstuff", "sigma-cosmetics", "joesguns", "nectar-net", "hong-fang-tea", "harakiri-sushi"];
    const servers1Port = ["neo-net", "zer0", "max-hardware", "iron-gym", "CSEC"];
    const servers2Port = ["phantasy", "omega-net", "silver-helix", "the-hub", "crush-fitness", "avmnite-02h"];
    const servers3Port = ["computek", "netlink", "rothman-uni", "catalyst", "summit-uni", "rho-construction", "millenium-fitness", "I.I.I.I"];
    const servers4Port = ["syscore", "alpha-ent", "global-pharm", "lexo-corp", "snap-fitness", "univ-energy", "nova-med", "unitalife", "zb-def", "aevum-police", ".", "run4theh111z"];
    const servers5Port = ["zb-institute", "galactic-cyber", "deltaone", "taiyang-digital", "aerocorp", "omnia", "icarus", "infocomm", "defcomm", "solaris", "zeus-med", "helios", "omnitek", "powerhouse-fitness", "vitalife", "titan-labs", "microdyne", "blade", "fulcrumtech"];
    const serversUpTo1Port = servers0Port.concat(servers1Port);
    const serversUpTo2Port = serversUpTo1Port.concat(servers2Port);
    const serversUpTo3Port = serversUpTo2Port.concat(servers3Port);
    const serversUpTo4Port = serversUpTo3Port.concat(servers4Port);
    const serversUpTo5Port = serversUpTo4Port.concat(servers5Port);
    function cancel(array, script) {
        var i = 0;
        while (i < array.length) {
            ns.scriptKill(script, array[i]);
            ns.rm(script, array[i]);
            i = i + 1;
        }
    }
    function cancelAll() {
        cancel(servers0Port, deployScript);
        cancel(servers1Port, deployScript);
        cancel(servers2Port, deployScript);
        cancel(servers3Port, deployScript);
        cancel(servers4Port, deployScript);
        cancel(servers5Port, deployScript);
        cancel(serversUpTo1Port, script);
        cancel(serversUpTo2Port, script);
        cancel(serversUpTo3Port, script);
        cancel(serversUpTo4Port, script);
        cancel(serversUpTo5Port, script);
    }
    function getTarget() {
        resetTarget();
        var i = 0;
        while (i < servers0Port.length) {
            let target = servers0Port[i];
            if (ns.getServerMaxRam(target) > 0 && ns.getServerRequiredHackingLevel(target) <= ns.getHackingLevel()) {
                if (targetThreshold < ns.getServerMaxMoney(target)) {
                    optimizedTarget = target;
                    targetThreshold = ns.getServerMaxMoney(target);
                    ns.print("New target threshold is " + targetThreshold + " on " + optimizedTarget + ".");
                }
                else {
                    ns.print(target + " does not have more money available than the current threshold. Moving on.");
                }
            }
            else {
                if (ns.getServerRequiredHackingLevel(target) > ns.getHackingLevel()) {
                    ns.print("Skipping " + target + " because it requires hacking level " + ns.getServerRequiredHackingLevel(target) + ".");
                }
            }
            i = i + 1;
        }
        var i = 0;
        while (i < servers1Port.length) {
            let target = servers1Port[i];
            if (ns.getServerMaxRam(target) > 0 && ns.getServerRequiredHackingLevel(target) <= ns.getHackingLevel() && ns.fileExists("BruteSSH.exe", "home")) {
                if (targetThreshold < ns.getServerMaxMoney(target)) {
                    optimizedTarget = target;
                    targetThreshold = ns.getServerMaxMoney(target);
                    ns.print("New target threshold is " + targetThreshold + " on " + optimizedTarget + ".");
                }
                else {
                    ns.print(target + " does not have more money available than the current threshold. Moving on.");
                }
            }
            else {
                if (ns.getServerRequiredHackingLevel(target) > ns.getHackingLevel()) {
                    ns.print("Skipping " + target + " because it requires hacking level " + ns.getServerRequiredHackingLevel(target) + ".");
                }
            }
            i = i + 1;
        }
        var i = 0;
        while (i < servers2Port.length) {
            let target = servers2Port[i];
            if (ns.getServerMaxRam(target) > 0 && ns.getServerRequiredHackingLevel(target) <= ns.getHackingLevel() && ns.fileExists("FTPCrack.exe", "home")) {
                if (targetThreshold < ns.getServerMaxMoney(target)) {
                    optimizedTarget = target;
                    targetThreshold = ns.getServerMaxMoney(target);
                    ns.print("New target threshold is " + targetThreshold + " on " + optimizedTarget + ".");
                }
                else {
                    ns.print(target + " does not have more money available than the current threshold. Moving on.");
                }
            }
            else {
                if (ns.getServerRequiredHackingLevel(target) > ns.getHackingLevel()) {
                    ns.print("Skipping " + target + " because it requires hacking level " + ns.getServerRequiredHackingLevel(target) + ".");
                }
            }
            i = i + 1;
        }
        var i = 0;
        while (i < servers3Port.length) {
            let target = servers3Port[i];
            if (ns.getServerMaxRam(target) > 0 && ns.getServerRequiredHackingLevel(target) <= ns.getHackingLevel() && ns.fileExists("relaySMTP.exe", "home")) {
                if (targetThreshold < ns.getServerMaxMoney(target)) {
                    optimizedTarget = target;
                    targetThreshold = ns.getServerMaxMoney(target);
                    ns.print("New target threshold is " + targetThreshold + " on " + optimizedTarget + ".");
                }
                else {
                    ns.print(target + " does not have more money available than the current threshold. Moving on.");
                }
            }
            else {
                if (ns.getServerRequiredHackingLevel(target) > ns.getHackingLevel()) {
                    ns.print("Skipping " + target + " because it requires hacking level " + ns.getServerRequiredHackingLevel(target) + ".");
                }
            }
            i = i + 1;
        }
        var i = 0;
        while (i < servers4Port.length) {
            let target = servers4Port[i];
            if (ns.getServerMaxRam(target) > 0 && ns.getServerRequiredHackingLevel(target) <= ns.getHackingLevel() && ns.fileExists("HTTPWorm.exe", "home")) {
                if (targetThreshold < ns.getServerMaxMoney(target)) {
                    optimizedTarget = target;
                    targetThreshold = ns.getServerMaxMoney(target);
                    ns.print("New target threshold is " + targetThreshold + " on " + optimizedTarget + ".");
                }
                else {
                    ns.print(target + " does not have more money available than the current threshold. Moving on.");
                }
            }
            else {
                if (ns.getServerRequiredHackingLevel(target) > ns.getHackingLevel()) {
                    ns.print("Skipping " + target + " because it requires hacking level " + ns.getServerRequiredHackingLevel(target) + ".");
                }
            }
            i = i + 1;
        }
        var i = 0;
        while (i < servers5Port.length) {
            let target = servers5Port[i];
            if (ns.getServerMaxRam(target) > 0 && ns.getServerRequiredHackingLevel(target) <= ns.getHackingLevel() && ns.fileExists("SQLInject.exe", "home")) {
                if (targetThreshold < ns.getServerMaxMoney(target)) {
                    optimizedTarget = target;
                    targetThreshold = ns.getServerMaxMoney(target);
                    ns.print("New target threshold is " + targetThreshold + " on " + optimizedTarget + ".");
                }
                else {
                    ns.print(target + " does not have more money available than the current threshold. Moving on.");
                }
            }
            else {
                if (ns.getServerRequiredHackingLevel(target) > ns.getHackingLevel()) {
                    ns.print("Skipping " + target + " because it requires hacking level " + ns.getServerRequiredHackingLevel(target) + ".");
                }
            }
            i = i + 1;
        }
    }
    getTarget();
    cancelAll();
    var i = 0;
    while (i < servers0Port.length) {
        let target = servers0Port[i];
        if (ns.getServerMaxRam(target) > 0 && ns.getServerRequiredHackingLevel(target) <= ns.getHackingLevel()) {
            ns.exec(script, home, defaultThreads, target, optimizedTarget);
        }
        else {
            if (ns.getServerRequiredHackingLevel(target) > ns.getHackingLevel()) {
                ns.print("Skipping " + target + " because it requires hacking level " + ns.getServerRequiredHackingLevel(target) + ".");
            }
        }
        i = i + 1;
        await ns.sleep(sleepTimeShort);
    }
    while (getPorts(ns) < 1) {
        await ns.sleep(sleepTimeLong);
        ns.print("Waiting until 1 port is available");
    }
    await ns.sleep(sleepTimeLong);
    getTarget();
    cancelAll();
    var i = 0;
    while (i < servers0Port.length) {
        let target = servers0Port[i];
        if (ns.getServerMaxRam(target) > 0 && ns.getServerRequiredHackingLevel(target) <= ns.getHackingLevel()) {
            ns.exec(script, home, defaultThreads, target, optimizedTarget);
        }
        else {
            if (ns.getServerRequiredHackingLevel(target) > ns.getHackingLevel()) {
                ns.print("Skipping " + target + " because it requires hacking level " + ns.getServerRequiredHackingLevel(target) + ".");
            }
        }
        i = i + 1;
        await ns.sleep(sleepTimeShort);
    }
    var i = 0;
    while (i < servers1Port.length) {
        let target = servers1Port[i];
        if (ns.getServerMaxRam(target) > 0 && ns.getServerRequiredHackingLevel(target) <= ns.getHackingLevel()) {
            ns.exec(script, home, defaultThreads, target, optimizedTarget);
        }
        else {
            if (ns.getServerRequiredHackingLevel(target) > ns.getHackingLevel()) {
                ns.print("Skipping " + target + " because it requires hacking level " + ns.getServerRequiredHackingLevel(target) + ".");
            }
        }
        i = i + 1;
        await ns.sleep(sleepTimeShort);
    }
    while (getPorts(ns) < 2) {
        await ns.sleep(sleepTimeLong);
        ns.print("Waiting until 2 ports are available");
    }
    await ns.sleep(sleepTimeLong);
    getTarget();
    cancelAll();
    var i = 0;
    while (i < servers0Port.length) {
        let target = servers0Port[i];
        if (ns.getServerMaxRam(target) > 0 && ns.getServerRequiredHackingLevel(target) <= ns.getHackingLevel()) {
            ns.exec(script, home, defaultThreads, target, optimizedTarget);
        }
        else {
            if (ns.getServerRequiredHackingLevel(target) > ns.getHackingLevel()) {
                ns.print("Skipping " + target + " because it requires hacking level " + ns.getServerRequiredHackingLevel(target) + ".");
            }
        }
        i = i + 1;
        await ns.sleep(sleepTimeShort);
    }
    var i = 0;
    while (i < servers1Port.length) {
        let target = servers1Port[i];
        if (ns.getServerMaxRam(target) > 0 && ns.getServerRequiredHackingLevel(target) <= ns.getHackingLevel()) {
            ns.exec(script, home, defaultThreads, target, optimizedTarget);
        }
        else {
            if (ns.getServerRequiredHackingLevel(target) > ns.getHackingLevel()) {
                ns.print("Skipping " + target + " because it requires hacking level " + ns.getServerRequiredHackingLevel(target) + ".");
            }
        }
        i = i + 1;
        await ns.sleep(sleepTimeShort);
    }
    var i = 0;
    while (i < servers2Port.length) {
        let target = servers2Port[i];
        if (ns.getServerMaxRam(target) > 0 && ns.getServerRequiredHackingLevel(target) <= ns.getHackingLevel()) {
            ns.exec(script, home, defaultThreads, target, optimizedTarget);
        }
        else {
            if (ns.getServerRequiredHackingLevel(target) > ns.getHackingLevel()) {
                ns.print("Skipping " + target + " because it requires hacking level " + ns.getServerRequiredHackingLevel(target) + ".");
            }
        }
        i = i + 1;
        await ns.sleep(sleepTimeShort);
    }
    while (getPorts(ns) < 3) {
        await ns.sleep(sleepTimeLong);
        ns.print("Waiting until 3 ports are available");
    }
    await ns.sleep(sleepTimeLong);
    getTarget();
    cancelAll();
    var i = 0;
    while (i < servers0Port.length) {
        let target = servers0Port[i];
        if (ns.getServerMaxRam(target) > 0 && ns.getServerRequiredHackingLevel(target) <= ns.getHackingLevel()) {
            ns.exec(script, home, defaultThreads, target, optimizedTarget);
        }
        else {
            if (ns.getServerRequiredHackingLevel(target) > ns.getHackingLevel()) {
                ns.print("Skipping " + target + " because it requires hacking level " + ns.getServerRequiredHackingLevel(target) + ".");
            }
        }
        i = i + 1;
        await ns.sleep(sleepTimeShort);
    }
    var i = 0;
    while (i < servers1Port.length) {
        let target = servers1Port[i];
        if (ns.getServerMaxRam(target) > 0 && ns.getServerRequiredHackingLevel(target) <= ns.getHackingLevel()) {
            ns.exec(script, home, defaultThreads, target, optimizedTarget);
        }
        else {
            if (ns.getServerRequiredHackingLevel(target) > ns.getHackingLevel()) {
                ns.print("Skipping " + target + " because it requires hacking level " + ns.getServerRequiredHackingLevel(target) + ".");
            }
        }
        i = i + 1;
        await ns.sleep(sleepTimeShort);
    }
    var i = 0;
    while (i < servers2Port.length) {
        let target = servers2Port[i];
        if (ns.getServerMaxRam(target) > 0 && ns.getServerRequiredHackingLevel(target) <= ns.getHackingLevel()) {
            ns.exec(script, home, defaultThreads, target, optimizedTarget);
        }
        else {
            if (ns.getServerRequiredHackingLevel(target) > ns.getHackingLevel()) {
                ns.print("Skipping " + target + " because it requires hacking level " + ns.getServerRequiredHackingLevel(target) + ".");
            }
        }
        i = i + 1;
        await ns.sleep(sleepTimeShort);
    }
    var i = 0;
    while (i < servers3Port.length) {
        let target = servers3Port[i];
        if (ns.getServerMaxRam(target) > 0 && ns.getServerRequiredHackingLevel(target) <= ns.getHackingLevel()) {
            ns.exec(script, home, defaultThreads, target, optimizedTarget);
        }
        else {
            if (ns.getServerRequiredHackingLevel(target) > ns.getHackingLevel()) {
                ns.print("Skipping " + target + " because it requires hacking level " + ns.getServerRequiredHackingLevel(target) + ".");
            }
        }
        i = i + 1;
        await ns.sleep(sleepTimeShort);
    }
    await ns.sleep(sleepTimeLong);
    if (execTixLater == true) {
        ns.exec("tix.js", home);
    }
    while (getPorts(ns) < 4) {
        await ns.sleep(sleepTimeLong);
        ns.print("Waiting until 4 ports are available");
    }
    await ns.sleep(sleepTimeLong);
    getTarget();
    cancelAll();
    var i = 0;
    while (i < servers0Port.length) {
        let target = servers0Port[i];
        if (ns.getServerMaxRam(target) > 0 && ns.getServerRequiredHackingLevel(target) <= ns.getHackingLevel()) {
            ns.exec(script, home, defaultThreads, target, optimizedTarget);
        }
        else {
            if (ns.getServerRequiredHackingLevel(target) > ns.getHackingLevel()) {
                ns.print("Skipping " + target + " because it requires hacking level " + ns.getServerRequiredHackingLevel(target) + ".");
            }
        }
        i = i + 1;
        await ns.sleep(sleepTimeShort);
    }
    var i = 0;
    while (i < servers1Port.length) {
        let target = servers1Port[i];
        if (ns.getServerMaxRam(target) > 0 && ns.getServerRequiredHackingLevel(target) <= ns.getHackingLevel()) {
            ns.exec(script, home, defaultThreads, target, optimizedTarget);
        }
        else {
            if (ns.getServerRequiredHackingLevel(target) > ns.getHackingLevel()) {
                ns.print("Skipping " + target + " because it requires hacking level " + ns.getServerRequiredHackingLevel(target) + ".");
            }
        }
        i = i + 1;
        await ns.sleep(sleepTimeShort);
    }
    var i = 0;
    while (i < servers2Port.length) {
        let target = servers2Port[i];
        if (ns.getServerMaxRam(target) > 0 && ns.getServerRequiredHackingLevel(target) <= ns.getHackingLevel()) {
            ns.exec(script, home, defaultThreads, target, optimizedTarget);
        }
        else {
            if (ns.getServerRequiredHackingLevel(target) > ns.getHackingLevel()) {
                ns.print("Skipping " + target + " because it requires hacking level " + ns.getServerRequiredHackingLevel(target) + ".");
            }
        }
        i = i + 1;
        await ns.sleep(sleepTimeShort);
    }
    var i = 0;
    while (i < servers3Port.length) {
        let target = servers3Port[i];
        if (ns.getServerMaxRam(target) > 0 && ns.getServerRequiredHackingLevel(target) <= ns.getHackingLevel()) {
            ns.exec(script, home, defaultThreads, target, optimizedTarget);
        }
        else {
            if (ns.getServerRequiredHackingLevel(target) > ns.getHackingLevel()) {
                ns.print("Skipping " + target + " because it requires hacking level " + ns.getServerRequiredHackingLevel(target) + ".");
            }
        }
        i = i + 1;
        await ns.sleep(sleepTimeShort);
    }
    var i = 0;
    while (i < servers4Port.length) {
        let target = servers4Port[i];
        if (ns.getServerMaxRam(target) > 0 && ns.getServerRequiredHackingLevel(target) <= ns.getHackingLevel()) {
            ns.exec(script, home, defaultThreads, target, optimizedTarget);
        }
        else {
            if (ns.getServerRequiredHackingLevel(target) > ns.getHackingLevel()) {
                ns.print("Skipping " + target + " because it requires hacking level " + ns.getServerRequiredHackingLevel(target) + ".");
            }
        }
        i = i + 1;
        await ns.sleep(sleepTimeShort);
    }
    while (getPorts(ns) < 5) {
        await ns.sleep(sleepTimeLong);
        ns.print("Waiting until 5 ports are available");
    }
    await ns.sleep(sleepTimeLong);
    getTarget();
    cancelAll();
    var i = 0;
    while (i < servers0Port.length) {
        let target = servers0Port[i];
        if (ns.getServerMaxRam(target) > 0 && ns.getServerRequiredHackingLevel(target) <= ns.getHackingLevel()) {
            ns.exec(script, home, defaultThreads, target, optimizedTarget);
        }
        else {
            if (ns.getServerRequiredHackingLevel(target) > ns.getHackingLevel()) {
                ns.print("Skipping " + target + " because it requires hacking level " + ns.getServerRequiredHackingLevel(target) + ".");
            }
        }
        i = i + 1;
        await ns.sleep(sleepTimeShort);
    }
    var i = 0;
    while (i < servers1Port.length) {
        let target = servers1Port[i];
        if (ns.getServerMaxRam(target) > 0 && ns.getServerRequiredHackingLevel(target) <= ns.getHackingLevel()) {
            ns.exec(script, home, defaultThreads, target, optimizedTarget);
        }
        else {
            if (ns.getServerRequiredHackingLevel(target) > ns.getHackingLevel()) {
                ns.print("Skipping " + target + " because it requires hacking level " + ns.getServerRequiredHackingLevel(target) + ".");
            }
        }
        i = i + 1;
        await ns.sleep(sleepTimeShort);
    }
    var i = 0;
    while (i < servers2Port.length) {
        let target = servers2Port[i];
        if (ns.getServerMaxRam(target) > 0 && ns.getServerRequiredHackingLevel(target) <= ns.getHackingLevel()) {
            ns.exec(script, home, defaultThreads, target, optimizedTarget);
        }
        else {
            if (ns.getServerRequiredHackingLevel(target) > ns.getHackingLevel()) {
                ns.print("Skipping " + target + " because it requires hacking level " + ns.getServerRequiredHackingLevel(target) + ".");
            }
        }
        i = i + 1;
        await ns.sleep(sleepTimeShort);
    }
    var i = 0;
    while (i < servers3Port.length) {
        let target = servers3Port[i];
        if (ns.getServerMaxRam(target) > 0 && ns.getServerRequiredHackingLevel(target) <= ns.getHackingLevel()) {
            ns.exec(script, home, defaultThreads, target, optimizedTarget);
        }
        else {
            if (ns.getServerRequiredHackingLevel(target) > ns.getHackingLevel()) {
                ns.print("Skipping " + target + " because it requires hacking level " + ns.getServerRequiredHackingLevel(target) + ".");
            }
        }
        i = i + 1;
        await ns.sleep(sleepTimeShort);
    }
    var i = 0;
    while (i < servers4Port.length) {
        let target = servers4Port[i];
        if (ns.getServerMaxRam(target) > 0 && ns.getServerRequiredHackingLevel(target) <= ns.getHackingLevel()) {
            ns.exec(script, home, defaultThreads, target, optimizedTarget);
        }
        else {
            if (ns.getServerRequiredHackingLevel(target) > ns.getHackingLevel()) {
                ns.print("Skipping " + target + " because it requires hacking level " + ns.getServerRequiredHackingLevel(target) + ".");
            }
        }
        i = i + 1;
        await ns.sleep(sleepTimeShort);
    }
    var i = 0;
    while (i < servers5Port.length) {
        let target = servers5Port[i];
        if (ns.getServerMaxRam(target) > 0 && ns.getServerRequiredHackingLevel(target) <= ns.getHackingLevel()) {
            ns.exec(script, home, defaultThreads, target, optimizedTarget);
        }
        else {
            if (ns.getServerRequiredHackingLevel(target) > ns.getHackingLevel()) {
                ns.print("Skipping " + target + " because it requires hacking level " + ns.getServerRequiredHackingLevel(target) + ".");
            }
        }
        i = i + 1;
        await ns.sleep(sleepTimeShort);
    }
    if (stayOn == true) {
        while (true) {
            await ns.sleep(sleepTimeLong);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnR1cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ob21lL3N0YXJ0dXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsc0JBQXNCO0FBQ3RCLE9BQU8sRUFBQyxlQUFlLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN0RSxxQkFBcUI7QUFDckIsTUFBTSxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsRUFBTztJQUM5QixXQUFXO0lBQ1gseUNBQXlDO0lBQ3pDLDJGQUEyRjtJQUMzRixNQUFNLGlCQUFpQixHQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BELHNFQUFzRTtJQUN0RSxNQUFNLE1BQU0sR0FBWSxJQUFJLENBQUM7SUFDN0IscURBQXFEO0lBQ3JELE1BQU0sUUFBUSxHQUFZLEtBQUssQ0FBQztJQUNoQywyRUFBMkU7SUFDM0UsTUFBTSxhQUFhLEdBQVcsSUFBSSxDQUFDO0lBQ25DLHdFQUF3RTtJQUN4RSxzSUFBc0k7SUFDdEksTUFBTSxjQUFjLEdBQVcsR0FBRyxDQUFDO0lBQ25DLHlFQUF5RTtJQUN6RSxNQUFNLE1BQU0sR0FBWSxLQUFLLENBQUM7SUFFOUIsNEJBQTRCO0lBQzVCLE1BQU0sSUFBSSxHQUFXLE1BQU0sQ0FBQztJQUM1QixNQUFNLE1BQU0sR0FBVyxXQUFXLENBQUM7SUFDbkMsTUFBTSxZQUFZLEdBQVcsY0FBYyxDQUFDO0lBQzVDLE1BQU0sY0FBYyxHQUFXLENBQUMsQ0FBQztJQUVqQyxvQkFBb0I7SUFDcEIsSUFBSSxlQUFlLEdBQVcsWUFBWSxDQUFDO0lBQzNDLElBQUksZUFBZSxHQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUVwRSxJQUFJLFFBQVEsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUNwQixFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FB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