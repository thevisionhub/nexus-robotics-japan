export interface Manufacturer {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  logoUrl?: string;
  foundedYear: number;
  overview: string;
  globalDeployments: number;
  japanSupportAvailable: boolean;
  supportDetails: string;
  certifications: string[];
  contactEmail: string;
  website: string;
}

export const mockManufacturers: Manufacturer[] = [
  {
    id: "m-001",
    name: "Kinetic Robotics GmbH",
    country: "Germany",
    countryCode: "DE",
    foundedYear: 2008,
    overview: "A leading German manufacturer specializing in heavy-duty AMRs and industrial palletizing solutions. Known for robust engineering and reliability in harsh environments.",
    globalDeployments: 1200,
    japanSupportAvailable: true,
    supportDetails: "Partnered with local Japanese integrators for deployment, maintenance, and 24/7 support.",
    certifications: ["ISO 9001", "ISO 14001", "CE"],
    contactEmail: "japan-sales@kineticrobotics.de",
    website: "https://kineticrobotics.de"
  },
  {
    id: "m-002",
    name: "Nordic Automation AB",
    country: "Sweden",
    countryCode: "SE",
    foundedYear: 2012,
    overview: "Pioneers in high-precision inspection and advanced omnidirectional AMRs. Focusing on cutting-edge software and seamless WMS integration.",
    globalDeployments: 850,
    japanSupportAvailable: true,
    supportDetails: "Direct technical office located in Tokyo for advanced support.",
    certifications: ["ISO 9001", "CE"],
    contactEmail: "tokyo@nordicautomation.se",
    website: "https://nordicautomation.se"
  },
  {
    id: "m-003",
    name: "HanRiver Robotics",
    country: "South Korea",
    countryCode: "KR",
    foundedYear: 2015,
    overview: "Innovative robotics company focused on AI vision systems, palletizing, and high-speed inspection for the electronics sector.",
    globalDeployments: 2100,
    japanSupportAvailable: true,
    supportDetails: "Extensive network of local distributors in Osaka and Tokyo.",
    certifications: ["KC", "CE", "ISO 9001"],
    contactEmail: "hello@hanriver.kr",
    website: "https://hanriver.kr"
  },
  {
    id: "m-004",
    name: "BlueAxis Robotics",
    country: "USA",
    countryCode: "US",
    foundedYear: 2010,
    overview: "Specializes in collaborative robots and retail automation. Creating safe, easy-to-use robots that work directly alongside human staff.",
    globalDeployments: 3400,
    japanSupportAvailable: true,
    supportDetails: "Full support via authorized Japanese resale partners.",
    certifications: ["UL", "FCC", "CE"],
    contactEmail: "apac@blueaxis.com",
    website: "https://blueaxis.com"
  },
  {
    id: "m-005",
    name: "MechaLink Systems",
    country: "Singapore",
    countryCode: "SG",
    foundedYear: 2017,
    overview: "Experts in facility operations and commercial cleaning robots, offering smart fleets for airports, malls, and large factories.",
    globalDeployments: 600,
    japanSupportAvailable: true,
    supportDetails: "Direct operations in Japan started in 2023.",
    certifications: ["CE"],
    contactEmail: "japan@mechalink.sg",
    website: "https://mechalink.sg"
  },
  {
    id: "m-006",
    name: "DanTek Robotics",
    country: "Denmark",
    countryCode: "DK",
    foundedYear: 2005,
    overview: "World-renowned creators of flexible cobots for assembly and machine tending.",
    globalDeployments: 15000,
    japanSupportAvailable: true,
    supportDetails: "Strong partner network and training centers across Japan.",
    certifications: ["CE", "TUV", "ISO/TS 15066"],
    contactEmail: "contact@dantek.dk",
    website: "https://dantek.dk"
  },
  {
    id: "m-007",
    name: "SinoMotion Robotics",
    country: "China",
    countryCode: "CN",
    foundedYear: 2014,
    overview: "Leaders in high-speed sorting solutions and logistics automation utilizing swarm intelligence.",
    globalDeployments: 5000,
    japanSupportAvailable: true,
    supportDetails: "Dedicated Japan branch office providing full integration.",
    certifications: ["CCC", "CE"],
    contactEmail: "jp-sales@sinomotion.cn",
    website: "https://sinomotion.cn"
  },
  {
    id: "m-008",
    name: "AeroLogic Machines",
    country: "Netherlands",
    countryCode: "NL",
    foundedYear: 2018,
    overview: "Niche manufacturer of compact AMRs for tight spaces like hospitals and legacy manufacturing plants.",
    globalDeployments: 300,
    japanSupportAvailable: false,
    supportDetails: "Currently seeking local partners in Japan. Remote support available.",
    certifications: ["CE"],
    contactEmail: "info@aerologic.nl",
    website: "https://aerologic.nl"
  }
];
