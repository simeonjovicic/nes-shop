const t = (de, en) => ({ de, en });

// Children's styles get their own entry once the range includes them.
export const AUDIENCES = [
  { id: "men", label: t("Für Herren", "For men") },
  { id: "women", label: t("Für Damen", "For women") },
];

// Activities follow the use cases printed in the WAI FEELSHOES brochure.
export const ACTIVITIES = [
  { id: "training", label: t("Pilates & Fitness", "Pilates & fitness"), intro: t("Leichte Sport Feel Shoes für Pilates, Fitness und Training mit Bodenkontakt.", "Light sport feel shoes for pilates, fitness and training close to the ground.") },
  { id: "water", label: t("Aqua & Strand", "Aqua & beach"), intro: t("Für Aqua-Training, den Strand und Tage am Wasser.", "For aqua training, the beach and days by the water.") },
  { id: "home", label: t("Zuhause", "At home"), intro: t("Weiche Feel Shoes und Pantofole für drinnen.", "Soft feel shoes and slippers for indoors.") },
  { id: "travel", label: t("Reise", "Travel"), intro: t("Für unterwegs: im Flugzeug, im Hotel oder auf dem Boot.", "For the journey: on the plane, in the hotel or on a boat.") },
];

export function audienceFromLocation(url) {
  const requested = url.searchParams.get("for");
  return AUDIENCES.some((item) => item.id === requested) ? requested : "all";
}

export function activityFromLocation(url) {
  const requested = url.searchParams.get("activity");
  return ACTIVITIES.some((item) => item.id === requested) ? requested : "all";
}

export function matchesAudience(product, audience) {
  return audience === "all" || Boolean(product.audiences?.includes(audience));
}

export function matchesActivity(product, activity) {
  return activity === "all" || Boolean(product.activities?.includes(activity));
}
