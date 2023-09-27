"use client";

import { Category } from "@prisma/client";
import { type IconType } from "react-icons";
import {
  FcBriefcase,
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
} from "react-icons/fc";
import CategoryItem from "./category-item";

interface Props {
  items: Category[];
}

const iconMap: Record<Category["id"], IconType> = {
  Music: FcMusic,
  Photography: FcOldTimeCamera,
  Fitness: FcSportsMode,
  Accounting: FcSalesPerformance,
  "Computer Science": FcMultipleDevices,
  Filming: FcFilmReel,
  Engineering: FcEngineering,
  "Business and Finance": FcBriefcase,
};

const Categories = ({ items }: Props) => {
  return (
    <section className="flex items-center gap-x-2 overflow-x-auto">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </section>
  );
};
export default Categories;
