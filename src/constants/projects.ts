export interface Project {
  title: string;
  description: string;
  website: string;
  addresses: {
    chainId: number;
    prizePoolAddress: string;
    delegateAddress: string;
  }[];
}

/**
 * A big list of all of hte projects promoted in app.
 * Let's keep this unbiased and not promote any projects that are not helping humanity.
 * If you want to add a project, please submit an issue using the link below.
 *
 * https://github.com/dylandesrosier/pt-delegation-dontation/issues/new?assignees=&labels=project+suggestion&template=project-suggestion.md&title=%5BProject+Suggestion%5D
 *
 */

export const PROJECTS: Project[] = [
  {
    title: "Unchain Fund",
    description: "A group supporting those in need in Ukraine.",
    website: "https://unchain.fund/",
    addresses: [
      {
        chainId: 137,
        prizePoolAddress: "0x19DE635fb3678D8B8154E37d8C9Cdf182Fe84E60",
        delegateAddress: "0xb37b3b78022E6964fe80030C9161525880274010",
      },
    ],
  },
  {
    title: "Turkey & Syria Earthquake Relief",
    description: "Supporting those impacted by the Kahramanmaras earthquake.",
    website:
      "https://mirror.xyz/armagan.eth/70xjoltd3-aBxre9XGz1Nhp3ILvjh_QGFEGWrqoBIys",
    addresses: [
      {
        chainId: 10,
        prizePoolAddress: "0x79Bc8bD53244bC8a9C8c27509a2d573650A83373",
        delegateAddress: "0x8888759373137b84e9f0ef13ecb13e321c251ee3",
      },
    ],
  },
];

export const PROJECT_SUGGESTION_LINK =
  "https://github.com/dylandesrosier/pt-delegation-dontation/issues/new?assignees=&labels=project+suggestion&template=project-suggestion.md&title=%5BProject+Suggestion%5D";
