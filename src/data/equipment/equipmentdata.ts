export interface EquipmentItem {
  name: string;
  image: string;
  rate: string;
  details: string[];
}

export const equipmentList: EquipmentItem[] = [
  {
    name: "Tractor",
    image: "/tract.jpg",
    rate: "₹3,500/day",
    details: [
      "Model: Mahindra 575 DI XP Plus",
      "Engine: 45 HP, 4-cylinder",
      "Transmission: 8F + 2R",
      "Fuel Capacity: 60 L",
    ],
  },
  {
    name: "Tractor",
    image: "/blue-and-white-mild-steel-35hp-swaraj-735-fe-tractor-for-agricultural-usage-47-liter-fuel-tank-capacity--819.jpg",
    rate: "₹2,800/day",
    details: [
      "Model: Swaraj 735 FE",
      "Engine: 40 HP, 3-cylinder",
      "Transmission: 8F + 2R",
      "Fuel Capacity: 48 L",
    ],
  },
  {
    name: "Tractor",
    image: "/b3d23e0ccad7bbbac6f01fe9aa8bb332.jpg",
    rate: "₹4,200/day",
    details: [
      "Model: John Deere 5050D",
      "Engine: 50 HP, 3-cylinder",
      "Transmission: 8F + 4R",
      "Fuel Capacity: 60 L",
    ],
  },
  {
    name: "Cultivator",
    image: "/culti.jpg",
    rate: "₹1,500/day",
    details: [
      "Type: 9-Tyne Spring Loaded",
      "Width: 7 ft",
      "Depth: Up to 12 in",
      "Required HP: 35-45",
    ],
  },
  {
    name: "Cultivator",
    image: "/11-tyne-rigid-cultivator-932.jpg",
    rate: "₹1,800/day",
    details: [
      "Type: 11-Tyne Rigid",
      "Width: 8 ft",
      "Depth: 14 in",
      "Required HP: 45-55",
    ],
  },
  {
    name: "Plough",
    image: "/sddefault.jpg",
    rate: "₹1,000/day",
    details: [
      "Type: MB Reversible",
      "No. of Bottoms: 2",
      "Width: 16 in/bottom",
      "Required HP: 35-40",
    ],
  },
  {
    name: "Harvester",
    image: "/harves.jpg",
    rate: "₹5,000/day",
    details: [
      "Model: John Deere S740",
      "Engine: 248 HP",
      "Grain Tank: 10,600 L",
      "Header Width: 6.1 m",
    ],
  },
  {
    name: "Seeder",
    image: "/seeder.jpg",
    rate: "₹1,200/day",
    details: [
      "Type: Zero Till Seeder",
      "Working Width: 5 ft",
      "Rows: 9",
      "Required HP: 35+",
    ],
  },
  {
    name: "Sprayer",
    image: "/61EJ3SYjKlL.jpg",
    rate: "₹800/day",
    details: [
      "Capacity: 16 L",
      "Type: Knapsack",
      "Pump: Manual",
      "Use: Pesticide & Fertilizer",
    ],
  },
  {
    name: "Rotavator",
    image: "/Shriram_Associate_Shaktiman_6_Feet_Rotavator_2_874x.jpg",
    rate: "₹2,000/day",
    details: [
      "Working Width: 6 ft",
      "Blades: 42",
      "HP Required: 40-55",
      "Used For: Tillage",
    ],
  },
  {
    name: "Baler",
    image: "/baler.jpg",
    rate: "₹3,000/day",
    details: [
      "Type: Round Baler",
      "Bale Size: 4x4 ft",
      "Capacity: 30-50 bales/hr",
      "Required HP: 45+",
    ],
  },
  {
    name: "Oxes",
    image: "/oxes.jpg",
    rate: "₹500/hour",
    details: [
      "Weight: 600–900 kg",
      "Height: ~150 cm",
      "Pull Capacity: High",
      "Use: Cart & Plough"
    ],
  }
];