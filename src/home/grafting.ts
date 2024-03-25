// grafting.js by qxxst
/** @param {NS} ns */
export async function main(ns: any) {
    // Settings
    const filter: string = "hack"; // Pick what you need to graft. "hack" for hacking augs, "combat" for combat augs, or "all" for everything.
    let focus: boolean = true; // Whether or not you want the grafting task to be focused on. Redundant and automatically disabled if you have the Neural-Retention Enhancement.
    const prioritizeNickfolas: boolean = true; // Whether you want to put down the Entropy virus first.
    const logSleep: boolean = false; // Whether or not the sleep function should be logged.

    // Constants
    const nickofolas: string = "nickofolas Congruity Implant";

    const filterAugs: { [key: string]: string[] } = {
        hack: [
            nickofolas, // Throw it in here a second time just to be safe
            "BitWire",
            "Artificial Bio-neural Network Implant",
            "Artificial Synaptic Potentiation",
            "Enhanced Mylen Sheathing",
            "Synaptic Enhancement Implant",
            "Neural-Retention Enhancement",
            "DataJack",
            "Embedded Netburner Module",
            "Embedded Netburner Module Core Implant",
            "Embedded Netburner Module Core V2 Upgrade",
            "Embedded Netburner Module Core V3 Upgrade",
            "Embedded Netburner Module Analyze Engine",
            "Embedded Netburner Module Direct Memory Access Upgrade",
            "Neuralstimulator",
            "Neural Accelerator",
            "Cranial Signal Processors - Gen I",
            "Cranial Signal Processors - Gen II",
            "Cranial Signal Processors - Gen III",
            "Cranial Signal Processors - Gen IV",
            "Cranial Signal Processors - Gen V",
            "Neuronal Densification",
            "FocusWire",
            "PC Direct-Neural Interface",
            "PC Direct-Neural Interface Optimization Submodule",
            "PC Direct-Neural Interface NeuroNet Injector",
            "PCMatrix",
            "Neurotrainer I",
            "Neurotrainer II",
            "Neurotrainer III",
            "HyperSight Corneal Implant",
            "Power Recirculation Core",
            "QLink",
            "SPTN-97 Gene Modification",
            "ECorp HVMind Implant", // Honestly forgot what this does but I'm pretty sure it goes in here
            "Xanipher",
            "nextSENS Gene Modification",
            "OmniTek InfoLoad",
            "BitRunners Neurolink",
            "The Black Hand",
            "CRTX42-AA Gene Modification",
            "Neuregen Gene Modification",
        ],
        combat: [
            nickofolas, // Throw it in here a second time just to be safe
        ]
    }

    const filteredAugs: string[] = filterAugs[filter] as string[];

    if (logSleep == false) {
        ns.disableLog("sleep");
    }

    let currentCity: string = ns.getPlayer().location;
    let graftableAugs: string[] = ns.grafting.getGraftableAugmentations();
    let augsRemaining: number = graftableAugs.length;
    let focusActualNecessary: boolean = !!await ns.singularity.getOwnedAugmentations().includes("Neural-Retention Enhancement");
    focus = focus && focusActualNecessary;
    let ownedAugmentations: string[] = await ns.singularity.getOwnedAugmentations();
    let money: number = ns.getPlayer().money;

    async function check(): Promise<void> {
        currentCity = ns.getPlayer().location;
        if (currentCity !== "New Tokyo") {
            ns.singularity.travelToCity("New Tokyo");
            currentCity = "New Tokyo";
        }

        graftableAugs = ns.grafting.getGraftableAugmentations();
        augsRemaining = graftableAugs.length;
        focusActualNecessary = !!await ns.singularity.getOwnedAugmentations().includes("Neural-Retention Enhancement");
        focus = focus && focusActualNecessary;
        ownedAugmentations = await ns.singularity.getOwnedAugmentations();
        money = ns.getPlayer().money;
    }

    function canAfford(aug: string): boolean {
        money = ns.getPlayer().money;
        return money >= ns.grafting.getAugmentationGraftPrice(aug);
    }

    async function waitUntilNotGrafting(): Promise<void> {
        while (ns.singularity.getCurrentWork() !== null) {
            await ns.sleep(1000);
        }
    }

    if (!ownedAugmentations.includes(nickofolas)) {
        const query: string = "You do not currently have the " + nickofolas + " installed. It is recommended to graft that first. (The script will do that for you if you have enough money.) Would you like to proceed without it?";
        const result: boolean = await ns.prompt(query);
        const thisScript: string = "grafting.js";
        if (!result) {
            ns.kill(thisScript);
        }
    }

    for (let aug of graftableAugs) {
        await check();
        await waitUntilNotGrafting();

        if (prioritizeNickfolas && !ownedAugmentations.includes(nickofolas)) {
            if (canAfford(nickofolas)) {
                await ns.grafting.graftAugmentation(nickofolas, focus);
            }
        } else {
            if (canAfford(aug)) {
                if (filter !== "all") {
                    if (filteredAugs.includes(aug)) {
                        await ns.grafting.graftAugmentation(aug, focus);
                    }
                } else {
                    await ns.grafting.graftAugmentation(aug, focus);
                }
            }
        }

        await waitUntilNotGrafting();
        await check();
    }
}