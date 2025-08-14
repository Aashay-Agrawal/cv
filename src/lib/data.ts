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
  };
  socials: SocialLink[];
}

// Interface for CMS data structure
interface CMSData {
  about?: {
    name?: string;
    text?: string;
  };
  projects?: Project[];
  contact?: {
    email?: string;
    calendar?: string;
    freelance?: string;
  };
  socials?: SocialLink[];
}

// Function to fetch data from external sources
async function fetchExternalData(): Promise<Partial<PortfolioData>> {
  try {
    // Example 1: Fetch from a JSON file (you can host this on GitHub, CDN, etc.)
    // const response = await fetch('https://your-domain.com/portfolio-data.json');
    // const data = await response.json();
    // return data;

    // Example 2: Fetch from a CMS API (like Contentful, Strapi, etc.)
    // const response = await fetch('https://api.contentful.com/spaces/YOUR_SPACE_ID/entries?access_token=YOUR_TOKEN');
    // const data = await response.json();
    // return transformCMSData(data);

    // Example 3: Fetch from a database via API
    // const response = await fetch('https://your-api.com/api/portfolio');
    // const data = await response.json();
    // return data;

    // Example 4: Fetch from environment variables (for sensitive data)
    // return {
    //   contact: {
    //     email: process.env.CONTACT_EMAIL || defaultData.contact.email,
    //     calendar: process.env.CALENDAR_LINK || defaultData.contact.calendar,
    //     freelance: process.env.FREELANCE_LINK || defaultData.contact.freelance
    //   }
    // };

    // For now, return empty object (no external data)
    return {};
  } catch (error) {
    console.error("Error fetching external data:", error);
    return {};
  }
}

// Helper function to transform CMS data (example)
function transformCMSData(cmsData: CMSData): Partial<PortfolioData> {
  // Transform CMS data to match our interface
  // This is just an example - adjust based on your CMS structure
  return {
    about: {
      name: cmsData.about?.name || defaultData.about.name,
      text: cmsData.about?.text || defaultData.about.text,
    },
    projects: cmsData.projects || defaultData.projects,
    contact: {
      email: cmsData.contact?.email || defaultData.contact.email,
      calendar: cmsData.contact?.calendar || defaultData.contact.calendar,
      freelance: cmsData.contact?.freelance || defaultData.contact.freelance,
    },
    socials: cmsData.socials || defaultData.socials,
  };
}

// Default data that can be overridden by external sources
const defaultData: PortfolioData = {
  about: {
    name: "Aashay Agrawal",
    text: `Hey, I'm Aashay. I'm a Web & Brand Designer. While I design for a living, I don't really like to label myself as a designer. I'm neither worthy enough to have that title, nor motivated to earn it. The best way to define me is this — I'm just someone you can rent to solve your problems. Basically, my time.

Putting yourself into a single title or label feels like bondage, and I'm not someone who does that. I want to be free. Most of what I do in life is simply following my desires sincerely, just going with the flow wherever it takes me. It's like my self is on a raft, drifting down a river without any external force.`,
  },
  projects: [
    {
      href: "https://aashay.framer.website",
      title: "Artifacts: Collection of all my Design Experiments",
    },
    {
      href: "404",
      title: "Component Library: Collection of Framer Components",
    },
    {
      href: "https://aashayagrawal.gumroad.com/",
      title: "Gumroad Store: Framer Templates and Components",
    },
    {
      href: "https://aashay.framer.website/books",
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
  const externalData = await fetchExternalData();

  return {
    about: {
      ...defaultData.about,
      ...externalData.about,
    },
    projects: externalData.projects || defaultData.projects,
    contact: {
      ...defaultData.contact,
      ...externalData.contact,
    },
    socials: externalData.socials || defaultData.socials,
  };
}
