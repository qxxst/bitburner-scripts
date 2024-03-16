// grafting.js by qxxst
/** @param {NS} ns */
export async function main(ns) {
    // Settings
    const focus = true;
    const cooldown = 1000;
    let currentCity = ns.getPlayer().location;
    if (currentCity !== "New Tokyo") {
        ns.singularity.travelToCity("New Tokyo");
        currentCity = "New Tokyo";
    }
    let graftableAugs;
    let augsRemaining;
    graftableAugs = ns.grafting.getGraftableAugmentations();
    augsRemaining = graftableAugs.length;
    function check() {
        graftableAugs = ns.grafting.getGraftableAugmentations();
        augsRemaining = graftableAugs.length;
    }
    for (let aug of graftableAugs) {
        let time = ns.grafting.getAugmentationGraftTime(aug);
        ns.grafting.graftAugmentation(aug, focus);
        await ns.sleep(time + cooldown);
        check();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhZnRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaG9tZS9ncmFmdGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx1QkFBdUI7QUFDdkIscUJBQXFCO0FBQ3JCLE1BQU0sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEVBQU87SUFDOUIsV0FBVztJQUNYLE1BQU0sS0FBSyxHQUFZLElBQUksQ0FBQztJQUM1QixNQUFNLFFBQVEsR0FBVyxJQUFJLENBQUM7SUFFOUIsSUFBSSxXQUFXLEdBQVcsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQztJQUNsRCxJQUFJLFdBQVcsS0FBSyxXQUFXLEVBQUUsQ0FBQztRQUM5QixFQUFFLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN6QyxXQUFXLEdBQUcsV0FBVyxDQUFDO0lBQzlCLENBQUM7SUFFRCxJQUFJLGFBQXVCLENBQUM7SUFDNUIsSUFBSSxhQUFxQixDQUFDO0lBQzFCLGFBQWEsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLHlCQUF5QixFQUFFLENBQUM7SUFFeEQsYUFBYSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUM7SUFDckMsU0FBUyxLQUFLO1FBQ1YsYUFBYSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMseUJBQXlCLEVBQUUsQ0FBQztRQUN4RCxhQUFhLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQztJQUN6QyxDQUFDO0lBRUQsS0FBSyxJQUFJLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztRQUM1QixJQUFJLElBQUksR0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLHdCQUF3QixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTdELEVBQUUsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRTFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLENBQUM7UUFFaEMsS0FBSyxFQUFFLENBQUM7SUFDWixDQUFDO0FBQ0wsQ0FBQyJ9