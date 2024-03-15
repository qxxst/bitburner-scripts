// startup.js by qxxst
import {sourceFileOwned, currentBitnode, getPorts} from 'lib/util.js';
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