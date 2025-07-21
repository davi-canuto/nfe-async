import { UF } from "../../types/nfe"

const ufCodeMap: Record<UF, number> = {
  RS: 43,
  SP: 35,
  PR: 41,
  SC: 42,
};

export function getUfCode(uf: UF): number {
  return ufCodeMap[uf];
}