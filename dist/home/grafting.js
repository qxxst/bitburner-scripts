// grafting.js by qxxst
/** @param {NS} ns */
export async function main(ns) {
    // Settings
    const focus = true;
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
        ns.grafting.graftAugmentation(aug, focus);
        while (ns.singularity.getCurrentWork() !== null) {
            await ns.sleep(1000);
        }
        check();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhZnRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaG9tZS9ncmFmdGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx1QkFBdUI7QUFDdkIscUJBQXFCO0FBQ3JCLE1BQU0sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEVBQU87SUFDOUIsV0FBVztJQUNYLE1BQU0sS0FBSyxHQUFZLElBQUksQ0FBQztJQUU1QixJQUFJLFdBQVcsR0FBVyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDO0lBQ2xELElBQUksV0FBVyxLQUFLLFdBQVcsRUFBRSxDQUFDO1FBQzlCLEVBQUUsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3pDLFdBQVcsR0FBRyxXQUFXLENBQUM7SUFDOUIsQ0FBQztJQUVELElBQUksYUFBdUIsQ0FBQztJQUM1QixJQUFJLGFBQXFCLENBQUM7SUFDMUIsYUFBYSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMseUJBQXlCLEVBQUUsQ0FBQztJQUV4RCxhQUFhLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQztJQUNyQyxTQUFTLEtBQUs7UUFDVixhQUFhLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1FBQ3hELGFBQWEsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDO0lBQ3pDLENBQUM7SUFFRCxLQUFLLElBQUksR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO1FBQzVCLEVBQUUsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRTFDLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUM5QyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsQ0FBQztRQUVELEtBQUssRUFBRSxDQUFDO0lBQ1osQ0FBQztBQUNMLENBQUMifQ==