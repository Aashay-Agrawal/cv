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
    text: `Hey, I'm Aashay. I'm a Software Designer. While I define myself as a software designer, I prefer to stay detached from titles. Titles confine the possibilities of existence. The self is an ever-evolving thing, and putting it into labels and fixing it into a rigid state feels like a disservice to it.

Putting yourself into a single title or label feels like bondage, and I'm not someone who does that. I love being free. Most of what I do in life is simply following my desires sincerely, just going with the flow wherever it takes me.`,
  },
  projects: [
    {
      href: "https://aashay.framer.website/",
      title: "Artifacts: Collection of all my Design Experiments",
    },
    {
      href: "https://rive.app/@aashayagrawal/",
      title: "Rive Interactions: Collection of my Rive Creations",
    },
    {
      href: "https://contra.com/aashayagrawal/products?r=aashayagrawal",
      title: "Store: Framer Templates and Components",
    },
    {
      href: "https://www.unicorn.studio/dashboard/community/aashay",
      title: "Unicorn Studio: WebGL and Shaders Experiments",
    },
    {
      href: "https://aashay.framer.website/bookshelf",
      title: "BookShelf: My Reading List",
    },
    {
      href: "https://medium.com/@aashayagrawal",
      title: "Notes: On Design and Craft",
    },
    {
      href: "https://aashayagrawal.substack.com/",
      title: "Writing @substack",
    },
  ],
  contact: {
    email: "aashayagrawal.work@gmail.com",
    calendar: "https://cal.com/aashayagrawal",
    freelance: "https://contra.com/aashayagrawal/work",
    telegram: "https://t.me/aashayagrawal",
  },
  socials: [
    { href: "https://twitter.com/_aashay_", label: "Twitter" },
    { href: "https://instagram.com/asyagra", label: "Instagram" },
    { href: "https://linkedin.com/in/aashayagrawal", label: "LinkedIn" },
    { href: "/resume.pdf", label: "Resume" },
  ],
};

// Main function to get portfolio data with external data override
export async function getPortfolioData(): Promise<PortfolioData> {
  return defaultData;
}
  