import { initialDraft } from "../fake-db/draftDb";

export const getDraft = () => {
  return initialDraft.filter((d) => d.isDraft === true);
};
