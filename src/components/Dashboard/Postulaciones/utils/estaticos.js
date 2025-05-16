import { docMapping } from "@/components/Formulario/estaticos";
export const idToDoc = (() => {
    const map = {};
    for (const [doc, val] of Object.entries(docMapping)) {
        if (typeof val === "number") {
            map[val] = doc;
        } else {
            for (const [sub, id] of Object.entries(val)) {
                map[id] = `${doc} — ${sub.replace(/_/g, " ")}`;
            }
        }
    }
    return map;
})();