export type CategoryType = {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  parentId: string | null;
  isChecked?: boolean;
};
