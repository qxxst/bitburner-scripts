// companies.js by qxxst
import { factionAugsRemaining } from 'lib/util';
/** @param {NS} ns */
export async function main(ns) {
    function checkCompanyFaction(faction) {
        // Joining company factions is hard, so let's only encourage it if we still need Augmentations from them.
        if (factionAugsRemaining(ns, faction) > 0) {
            if (ns.getPlayer().factions.includes(faction)) {
                ns.tprint(`[x] You have already joined ${faction}. You still need to install ${factionAugsRemaining(ns, faction)} Augmentations from them.`);
                return;
            }
            else {
                let repRequirement = 400000;
                let backdoorRequirement = false;
                let associatedServer = null;
                let company = faction;
                if (faction == "Fulcrum Secret Technologies") {
                    backdoorRequirement = true;
                    associatedServer = "fulcrumassets";
                    company = "Fulcrum Technologies";
                }
                if (ns.singularity.getCompanyRep(company) < repRequirement) {
                    ns.tprint(`[ ] You need at least ${ns.formatNumber(repRequirement)} reputation with ${company} to join their faction. You still need to install ${factionAugsRemaining(ns, faction)} Augmentations from them.`);
                    return;
                }
                if (backdoorRequirement && !!ns.getServer(associatedServer).backdoorInstalled) {
                    ns.tprint(`[ ] You need to install a backdoor on ${associatedServer} to join ${faction}. You still need to install ${factionAugsRemaining(ns, faction)} Augmentations from them.`);
                    return;
                }
                ns.tprint(`[ ] You are ready to join ${faction}.`);
            }
        }
        else {
            ns.tprint(`[x] You already have all Augmentations from ${faction}.`);
            return;
        }
    }
    const companyFactions = ["ECorp", "MegaCorp", "KuaiGong International", "Four Sigma", "NWO", "Blade Industries", "OmniTek Incorporated", "Bachman & Associates", "Clarke Incorporated", "Fulcrum Secret Technologies"];
    for (let faction of companyFactions) {
        checkCompanyFaction(faction);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGFuaWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hvbWUvY29tcGFuaWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHdCQUF3QjtBQUN4QixPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDOUMscUJBQXFCO0FBQ3JCLE1BQU0sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEVBQU87SUFDOUIsU0FBUyxtQkFBbUIsQ0FBQyxPQUFlO1FBQ3hDLHlHQUF5RztRQUN6RyxJQUFJLG9CQUFvQixDQUFDLEVBQUUsRUFBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUN2QyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQzVDLEVBQUUsQ0FBQyxNQUFNLENBQUMsK0JBQStCLE9BQU8sK0JBQStCLG9CQUFvQixDQUFDLEVBQUUsRUFBQyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQztnQkFDNUksT0FBTTtZQUNWLENBQUM7aUJBQU0sQ0FBQztnQkFDSixJQUFJLGNBQWMsR0FBRyxNQUFNLENBQUM7Z0JBQzVCLElBQUksbUJBQW1CLEdBQUcsS0FBSyxDQUFDO2dCQUNoQyxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQztnQkFDNUIsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDO2dCQUN0QixJQUFJLE9BQU8sSUFBRyw2QkFBNkIsRUFBRSxDQUFDO29CQUMxQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7b0JBQzNCLGdCQUFnQixHQUFHLGVBQWUsQ0FBQztvQkFDbkMsT0FBTyxHQUFHLHNCQUFzQixDQUFDO2dCQUNyQyxDQUFDO2dCQUVELElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsY0FBYyxFQUFFLENBQUM7b0JBQ3pELEVBQUUsQ0FBQyxNQUFNLENBQUMseUJBQXlCLEVBQUUsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLG9CQUFvQixPQUFPLHFEQUFxRCxvQkFBb0IsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUM7b0JBQy9NLE9BQU07Z0JBQ1YsQ0FBQztnQkFDRCxJQUFJLG1CQUFtQixJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztvQkFDNUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyx5Q0FBeUMsZ0JBQWdCLFlBQVksT0FBTywrQkFBK0Isb0JBQW9CLENBQUMsRUFBRSxFQUFDLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO29CQUNsTCxPQUFNO2dCQUNWLENBQUM7Z0JBQ0QsRUFBRSxDQUFDLE1BQU0sQ0FBQyw2QkFBNkIsT0FBTyxHQUFHLENBQUMsQ0FBQztZQUN2RCxDQUFDO1FBQ0wsQ0FBQzthQUFNLENBQUM7WUFDSixFQUFFLENBQUMsTUFBTSxDQUFDLCtDQUErQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1lBQ3JFLE9BQU07UUFDVixDQUFDO0lBQ0wsQ0FBQztJQUVELE1BQU0sZUFBZSxHQUFzQixDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsd0JBQXdCLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxrQkFBa0IsRUFBRSxzQkFBc0IsRUFBRSxzQkFBc0IsRUFBRSxxQkFBcUIsRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO0lBQzFPLEtBQUssSUFBSSxPQUFPLElBQUksZUFBZSxFQUFFLENBQUM7UUFDbEMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakMsQ0FBQztBQUNMLENBQUMifQ==