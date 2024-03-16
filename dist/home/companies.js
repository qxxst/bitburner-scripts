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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGFuaWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hvbWUvY29tcGFuaWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHdCQUF3QjtBQUN4QixPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDOUMscUJBQXFCO0FBQ3JCLE1BQU0sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEVBQU87SUFDOUIsU0FBUyxtQkFBbUIsQ0FBQyxPQUFlO1FBQ3hDLHlHQUF5RztRQUN6RyxJQUFJLG9CQUFvQixDQUFDLEVBQUUsRUFBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUN2QyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQzVDLEVBQUUsQ0FBQyxNQUFNLENBQUMsK0JBQStCLE9BQU8sK0JBQStCLG9CQUFvQixDQUFDLEVBQUUsRUFBQyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQztnQkFDNUksT0FBTTtZQUNWLENBQUM7aUJBQU0sQ0FBQztnQkFDSixJQUFJLGNBQWMsR0FBVyxNQUFNLENBQUM7Z0JBQ3BDLElBQUksbUJBQW1CLEdBQVksS0FBSyxDQUFDO2dCQUN6QyxJQUFJLGdCQUFnQixHQUFrQixJQUFJLENBQUM7Z0JBQzNDLElBQUksT0FBTyxHQUFXLE9BQU8sQ0FBQztnQkFDOUIsSUFBSSxPQUFPLElBQUcsNkJBQTZCLEVBQUUsQ0FBQztvQkFDMUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO29CQUMzQixnQkFBZ0IsR0FBRyxlQUFlLENBQUM7b0JBQ25DLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztnQkFDckMsQ0FBQztnQkFFRCxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLGNBQWMsRUFBRSxDQUFDO29CQUN6RCxFQUFFLENBQUMsTUFBTSxDQUFDLHlCQUF5QixFQUFFLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsT0FBTyxxREFBcUQsb0JBQW9CLENBQUMsRUFBRSxFQUFDLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO29CQUMvTSxPQUFNO2dCQUNWLENBQUM7Z0JBQ0QsSUFBSSxtQkFBbUIsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLGlCQUFpQixFQUFFLENBQUM7b0JBQzVFLEVBQUUsQ0FBQyxNQUFNLENBQUMseUNBQXlDLGdCQUFnQixZQUFZLE9BQU8sK0JBQStCLG9CQUFvQixDQUFDLEVBQUUsRUFBQyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQztvQkFDbEwsT0FBTTtnQkFDVixDQUFDO2dCQUNELEVBQUUsQ0FBQyxNQUFNLENBQUMsNkJBQTZCLE9BQU8sR0FBRyxDQUFDLENBQUM7WUFDdkQsQ0FBQztRQUNMLENBQUM7YUFBTSxDQUFDO1lBQ0osRUFBRSxDQUFDLE1BQU0sQ0FBQywrQ0FBK0MsT0FBTyxHQUFHLENBQUMsQ0FBQztZQUNyRSxPQUFNO1FBQ1YsQ0FBQztJQUNMLENBQUM7SUFFRCxNQUFNLGVBQWUsR0FBc0IsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLHdCQUF3QixFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUUsc0JBQXNCLEVBQUUsc0JBQXNCLEVBQUUscUJBQXFCLEVBQUUsNkJBQTZCLENBQUMsQ0FBQztJQUMxTyxLQUFLLElBQUksT0FBTyxJQUFJLGVBQWUsRUFBRSxDQUFDO1FBQ2xDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pDLENBQUM7QUFDTCxDQUFDIn0=