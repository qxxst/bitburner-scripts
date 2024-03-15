// companies.js by qxxst
import {factionAugsRemaining} from 'lib/util';
/** @param {NS} ns */
export async function main(ns: any) {
    function checkCompanyFaction(faction: string) {
        // Joining company factions is hard, so let's only encourage it if we still need Augmentations from them.
        if (factionAugsRemaining(ns,faction) > 0) {
            if (ns.getPlayer().factions.includes(faction)) {
                ns.tprint(`[x] You have already joined ${faction}. You still need to install ${factionAugsRemaining(ns,faction)} Augmentations from them.`);
                return
            } else {
                let repRequirement = 400000;
                let backdoorRequirement = false;
                let associatedServer = null;
                let company = faction;
                if (faction =="Fulcrum Secret Technologies") {
                    backdoorRequirement = true;
                    associatedServer = "fulcrumassets";
                    company = "Fulcrum Technologies";
                }
                
                if (ns.singularity.getCompanyRep(company) < repRequirement) {
                    ns.tprint(`[ ] You need at least ${ns.formatNumber(repRequirement)} reputation with ${company} to join their faction. You still need to install ${factionAugsRemaining(ns,faction)} Augmentations from them.`);
                    return
                }
                if (backdoorRequirement && !!ns.getServer(associatedServer).backdoorInstalled) {
                    ns.tprint(`[ ] You need to install a backdoor on ${associatedServer} to join ${faction}. You still need to install ${factionAugsRemaining(ns,faction)} Augmentations from them.`);
                    return
                }
                ns.tprint(`[ ] You are ready to join ${faction}.`);
            }
        } else {
            ns.tprint(`[x] You already have all Augmentations from ${faction}.`);
            return
        }
    }

    let companyFactions = ["ECorp", "MegaCorp", "KuaiGong International", "Four Sigma", "NWO", "Blade Industries", "OmniTek Incorporated", "Bachman & Associates", "Clarke Incorporated", "Fulcrum Secret Technologies"];
    for (let faction of companyFactions) {
        checkCompanyFaction(faction);
    }
}