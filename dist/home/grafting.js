// grafting.js by qxxst
/** @param {NS} ns */
export async function main(ns) {
    // Settings
    const focus = true; // Whether or not you want the grafting task to be focused on. This makes it go faster but prevents you from doing other things while it's working.
    const filter = "hack"; // The type of augs we specificaly want to graft. Set to null to graft everything.
    const prioritizeNickfolas = true; // Whether you want to put down the Entropy virus first.
    const logSleep = false; // Whether or not the sleep function should be logged.
    // Constants
    const nickofolas = "nickofolas Congruity Implant";
    if (logSleep == false) {
        ns.disableLog("sleep");
    }
    let currentCity = ns.getPlayer().location;
    if (currentCity !== "New Tokyo") {
        ns.singularity.travelToCity("New Tokyo");
        currentCity = "New Tokyo";
    }
    let graftableAugs = ns.grafting.getGraftableAugmentations();
    let augsRemaining = graftableAugs.length;
    let focusActualNecessary = !!await ns.singularity.getOwnedAugmentations().includes("Neural-Retention Enhancement");
    let actuallyFocus = focus && focusActualNecessary;
    let ownedAugmentations = await ns.singularity.getOwnedAugmentations();
    async function check() {
        graftableAugs = ns.grafting.getGraftableAugmentations();
        augsRemaining = graftableAugs.length;
        focusActualNecessary = !!await ns.singularity.getOwnedAugmentations().includes("Neural-Retention Enhancement");
        actuallyFocus = focus && focusActualNecessary;
        ownedAugmentations = await ns.singularity.getOwnedAugmentations();
    }
    async function waitUntilNotGrafting() {
        while (ns.singularity.getCurrentWork() !== null) {
            await ns.sleep(1000);
        }
    }
    for (let aug of graftableAugs) {
        await check();
        await waitUntilNotGrafting();
        if (prioritizeNickfolas && !!ownedAugmentations.includes(nickofolas)) {
            await ns.grafting.graftAugmentation(nickofolas, actuallyFocus);
        }
        else {
            await ns.grafting.graftAugmentation(aug, actuallyFocus);
        }
        await waitUntilNotGrafting();
        await check();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhZnRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaG9tZS9ncmFmdGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx1QkFBdUI7QUFDdkIscUJBQXFCO0FBQ3JCLE1BQU0sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEVBQU87SUFDOUIsV0FBVztJQUNYLE1BQU0sS0FBSyxHQUFZLElBQUksQ0FBQyxDQUFDLG1KQUFtSjtJQUNoTCxNQUFNLE1BQU0sR0FBa0IsTUFBTSxDQUFDLENBQUMsa0ZBQWtGO0lBQ3hILE1BQU0sbUJBQW1CLEdBQVksSUFBSSxDQUFDLENBQUMsd0RBQXdEO0lBQ25HLE1BQU0sUUFBUSxHQUFZLEtBQUssQ0FBQyxDQUFDLHNEQUFzRDtJQUV2RixZQUFZO0lBQ1osTUFBTSxVQUFVLEdBQVcsOEJBQThCLENBQUM7SUFFMUQsSUFBSSxRQUFRLElBQUksS0FBSyxFQUFFLENBQUM7UUFDcEIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBSSxXQUFXLEdBQVcsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQztJQUNsRCxJQUFJLFdBQVcsS0FBSyxXQUFXLEVBQUUsQ0FBQztRQUM5QixFQUFFLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN6QyxXQUFXLEdBQUcsV0FBVyxDQUFDO0lBQzlCLENBQUM7SUFFRCxJQUFJLGFBQWEsR0FBYSxFQUFFLENBQUMsUUFBUSxDQUFDLHlCQUF5QixFQUFFLENBQUM7SUFDdEUsSUFBSSxhQUFhLEdBQVcsYUFBYSxDQUFDLE1BQU0sQ0FBQztJQUNqRCxJQUFJLG9CQUFvQixHQUFZLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxXQUFXLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxRQUFRLENBQUMsOEJBQThCLENBQUMsQ0FBQztJQUM1SCxJQUFJLGFBQWEsR0FBWSxLQUFLLElBQUksb0JBQW9CLENBQUM7SUFDM0QsSUFBSSxrQkFBa0IsR0FBYSxNQUFNLEVBQUUsQ0FBQyxXQUFXLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUVoRixLQUFLLFVBQVUsS0FBSztRQUNoQixhQUFhLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1FBQ3hELGFBQWEsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBQ3JDLG9CQUFvQixHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxXQUFXLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxRQUFRLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUMvRyxhQUFhLEdBQUcsS0FBSyxJQUFJLG9CQUFvQixDQUFDO1FBQzlDLGtCQUFrQixHQUFHLE1BQU0sRUFBRSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBQ3RFLENBQUM7SUFFRCxLQUFLLFVBQVUsb0JBQW9CO1FBQy9CLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUM5QyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsQ0FBQztJQUNMLENBQUM7SUFFRCxLQUFLLElBQUksR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO1FBQzVCLE1BQU0sS0FBSyxFQUFFLENBQUM7UUFDZCxNQUFNLG9CQUFvQixFQUFFLENBQUM7UUFFN0IsSUFBSSxtQkFBbUIsSUFBSSxDQUFDLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7WUFDbkUsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNuRSxDQUFDO2FBQU0sQ0FBQztZQUNKLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDNUQsQ0FBQztRQUNELE1BQU0sb0JBQW9CLEVBQUUsQ0FBQztRQUU3QixNQUFNLEtBQUssRUFBRSxDQUFDO0lBQ2xCLENBQUM7QUFDTCxDQUFDIn0=