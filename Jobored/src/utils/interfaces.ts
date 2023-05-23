import { BranchParams } from './types';
import { Vacancy } from './types';

export interface FilterProps {
  catalogBranches: BranchParams[];
  branchName: string;
  onChangeBranch: (value: string) => void;
  paymentFromValue: string;
  onChangePaymentFrom: (value: number) => void;
  paymentToValue: string;
  onChangePaymentTo: (value: number) => void;
  sendFilters: () => void;
  clearFilters: () => void;
}

export interface FilterBranchProps {
  catalogBranches: BranchParams[];
  value: string;
  onChangeBranch: (value: string) => void;
}

export interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent) => void;
  sendFilters: () => void;
}

export interface VacancyCardProps {
  vacancy: Vacancy;
  favoriteVacancies: number[];
  changeFavorite: (id: number) => void;
}

export interface FavoriteIconProps {
  favoriteVacancies: number[];
  idVacancy: number;
}
