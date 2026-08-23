import graveyard from "@/content/know/graveyard.json";
import numbers from "@/content/know/numbers.json";
import saveStates from "@/content/know/save-states.json";
import rentFree from "@/content/know/rent-free.json";
import faq from "@/content/know/faq.json";

/**
 * Thin-section rule (§14): Know Me sections without real content render
 * as LOCKED tiles on the hub and their routes 404. Content lands in
 * /content — a section unlocks by getting items, zero code changes.
 */
export function lockedKnowSlugs(): Set<string> {
  const locked = new Set<string>();
  if (graveyard.items.length === 0) locked.add("graveyard");
  if (numbers.stats.length === 0) locked.add("numbers");
  if (saveStates.checkpoints.length === 0) locked.add("save-states");
  if (rentFree.items.length === 0) locked.add("rent-free");
  if (faq.items.length === 0) locked.add("faq");
  return locked;
}
