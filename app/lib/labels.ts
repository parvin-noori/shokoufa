import { Color, FlowerType, Size, Style } from "../generated/prisma/enums";

export const styleLabels: Record<Style, string> = {
  [Style.modern]: "مدرن",
  [Style.classic]: "کلاسیک",
  [Style.simple]: "ساده",
  [Style.minimal]: "مینیمال",
  [Style.luxury]: "لاکچری",
};

export const colorLabels: Record<Color, string> = {
  [Color.pink]: "صورتی",
  [Color.white]: "سفید",
  [Color.purple]: "بنفش",
  [Color.blue]: "آبی",
  [Color.yellow]: "زرد",
  [Color.turquoise]: "فیروزه‌ای",
  [Color.red]: "قرمز",
  [Color.orange]: "نارنجی",
  [Color.cream]: "کرم",
};
export const sizeLabels: Record<Size, string> = {
  [Size.small]: "کوچک",
  [Size.medium]: "متوسط",
  [Size.large]: "بزرگ",
};

export const flowerTypeLabels: Record<FlowerType, string> = {
  [FlowerType.tulip]: "لاله",
  [FlowerType.rose]: "رز",
  [FlowerType.lily]: "لیلیوم",
  [FlowerType.orchid]: "ارکیده",
  [FlowerType.sunflower]: "آفتابگردان",
  [FlowerType.hundredToman]: "صدتومنی",
  [FlowerType.mixed]: "میکس",
  [FlowerType.peony]: "پیونی",
};

// const occasionLabels: Record<Occasion, string> = {
//   birthday: "تولد",
//   condolence: "تسلیت",
//   anniversary: "سالگرد",
//   wedding: "عروسی",
//   graduation: "فارغ‌التحصیلی",
//   mothersDay: "روز مادر",
//   girlsDay: "روز دختر",
//   fathersDay: "روز پدر",
//   boysDay: "روز پسر",
// };

export const colorStyleMap: Record<
  string,
  { dot: string; selectedBg: string }
> = {
  pink: { dot: "bg-pink-500", selectedBg: "has-[:checked]:bg-pink-100" },
  white: {
    dot: "bg-white border border-gray-300",
    selectedBg: "has-[:checked]:bg-gray-100",
  },
  purple: {
    dot: "bg-purple-800",
    selectedBg: "has-[:checked]:bg-purple-100",
  },
  blue: { dot: "bg-blue-600", selectedBg: "has-[:checked]:bg-blue-100" },
  yellow: {
    dot: "bg-yellow-400",
    selectedBg: "has-[:checked]:bg-yellow-100",
  },
  turquoise: { dot: "bg-teal-600", selectedBg: "has-[:checked]:bg-teal-100" },
  red: { dot: "bg-red-500", selectedBg: "has-[:checked]:bg-red-100" },
  orange: {
    dot: "bg-orange-400",
    selectedBg: "has-[:checked]:bg-orange-100",
  },
  cream: { dot: "bg-orange-100", selectedBg: "has-[:checked]:bg-orange-50" },
};
