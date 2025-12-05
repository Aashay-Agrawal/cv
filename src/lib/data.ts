// Data layer for dynamic content fetching
export interface Project {
  href: string;
  title: string;
}

export interface SocialLink {
  href: string;
  label: string;
}

export interface PortfolioData {
  about: {
    name: string;
    text: string;
  };
  projects: Project[];
  contact: {
    email: string;
    calendar: string;
    freelance: string;
    telegram: string;
  };
  socials: SocialLink[];
}

// Default data that can be overridden by external sources
const defaultData: PortfolioData = {
  about: {
    name: "Aashay Agrawal",
    text: `Hey, I'm Aashay. I'm a Designer. While I design for a living, I don't really like to label myself as a designer. I'm neither worthy enough to have that title, nor desire enough to earn it. The best way to define me is — I'm just someone you can rent to solve your problems. Basically, my time.

Putting yourself into a single title or label feels like bondage, and I'm not someone who does that. I want to be free. Most of what I do in life is simply following my desires sincerely, just going with the flow wherever it takes me. It's like my self is on a raft, drifting down a river without any external force.`,
  },
  projects: [
    {
      href: "https://www.are.na/aashay-agrawal/my-work-kxqfnt6xeog",
      title: "Artifacts: Collection of all my Design Experiments",
    },
    {
      href: "https://rive.app/@aashayagrawal/",
      title: "Rive Interactions: Collection of my Rive Creations",
    },
    {
      href: "https://aashay.framer.website/templates",
      title: "Framer Templates and Components",
    },
    {
      href: "https://www.unicorn.studio/dashboard/community/aashay",
      title: "Unicorn Studio: WebGL and Shaders Experiments",
    },
    {
      href: "https://aashay.framer.website",
      title: "BookShelf: My Reading List",
    },
    {
      href: "https://aashayagrawal.substack.com/",
      title: "Writing @substack",
    },
  ],
  contact: {
    email: "aashayagrawal.work@gmail.com",
    calendar: "https://cal.com/aashayagrawal",
    freelance: "https://contra.com/aashayagrawal",
    telegram: "https://t.me/aashayagrawal",
  },
  socials: [
    { href: "https://twitter.com/_aashay_", label: "Twitter" },
    { href: "https://instagram.com/asyagra", label: "Instagram" },
    { href: "https://linkedin.com/in/aashayagrawal", label: "LinkedIn" },
    { href: "https://t.me/aashayagrawal", label: "Telegram" },
    // { href: "https://www.are.na/aashay-agrawal", label: "Are.na" },
    // { href: "/resume.pdf", label: "Resume" },
  ],
};

// Main function to get portfolio data with external data override
export async function getPortfolioData(): Promise<PortfolioData> {
  return defaultData;
}
  