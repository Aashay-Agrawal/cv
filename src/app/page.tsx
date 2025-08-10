import Link from "next/link";
import { memo } from "react";

// Memoized components for better performance
const AboutSection = memo(() => {
  const aboutText = `Hey, I’m Aashay. I’m a Web & Brand Designer. While I design for a living, I don’t really like to label myself as a designer. I’m neither worthy enough to have that title, nor motivated to earn it. The best way to define me is this — I’m just someone you can rent to solve your problems. Basically, my time.

Putting yourself into a single title or label feels like bondage, and I’m not someone who does that. I want to be free. Most of what I do in life is simply following my desires sincerely, just going with the flow wherever it takes me. It’s like my self is on a raft, drifting down a river without any external force.`;

  return (
    <section className="flex flex-col gap-1">
      <h1 className="text-xl font-bold">Aashay Agrawal</h1>
      <p className="leading-relaxed text-neutral-600 text-base whitespace-pre-line">
        {aboutText}
      </p>
    </section>
  );
});

AboutSection.displayName = "AboutSection";

// Optimized Projects Section
const ProjectsSection = memo(() => {
  const projects = [
    {
      href: "https://aashay.framer.website",
      title: "Work:Collection of all my Design Experiments",
    },
    {
      href: "404",
      title: "Component Library:Collection of Framer Components",
    },
    {
      href: "https://aashayagrawal.gumroad.com/",
      title: "Gumroad Store:Framer Templates",
    },

    {
      href: "https://aashay.framer.website/books",
      title: "BookShelf:My Reading List",
    },
    {
      href: "https://aashayagrawal.substack.com/",
      title: "Writing @substack",
    },
  ];

  return (
    <section className="flex flex-col gap-1">
      <h2 className="text-lg font-bold">Side Projects</h2>
      <ul className="space-y-1 text-neutral-600">
        {projects.map((project, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-3">•</span>
            <a
              href={project.href}
              className="hover:text-blue-500 transition-colors duration-200 text-base"
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
});

ProjectsSection.displayName = "ProjectsSection";

// Optimized Contact Section
const ContactSection = memo(() => (
  <section className="flex flex-col gap-1">
    <h2 className="font-bold text-lg">Contact</h2>
    <div className="text-neutral-600 text-base">
      <p>
        For contract work or full time opportunities, reach out via{" "}
        <a
          href="https://mail.google.com/mail/?view=cm&to=aashayagrawal.work@gmail.com"
          className="underline-offset-2 hover:underline transition-all duration-200"
          rel="noopener noreferrer"
        >
          email
        </a>{" "}
        or schedule a{" "}
        <a
          href="https://cal.com/aashayagrawal"
          className="underline-offset-2 hover:underline transition-all duration-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          meet
        </a>
        . or Hire for freelance via{" "}
        <a
          href="https://contra.com/aashayagrawal"
          className="underline-offset-2 hover:underline transition-all duration-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contra
        </a>
      </p>
    </div>
  </section>
));

ContactSection.displayName = "ContactSection";

// Optimized Socials Section
const SocialsSection = memo(() => {
  const socialLinks = [
    { href: "https://twitter.com/_aashay_", label: "Twitter" },
    { href: "https://instagram.com/asyagra", label: "Instagram" },
    { href: "https://linkedin.com/in/aashayagrawal", label: "LinkedIn" },
    { href: "/resume.pdf", label: "Resume" },
  ];

  return (
    <section className="flex flex-col gap-1">
      <h2 className="text-lg font-bold">Socials</h2>
      <div className="flex flex-wrap gap-4">
        {socialLinks.map((social) => (
          <Link
            key={social.label}
            href={social.href}
            className="text-blue-500 text-base font-normal hover:underline transition-all duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            {social.label}
          </Link>
        ))}
      </div>
    </section>
  );
});

SocialsSection.displayName = "SocialsSection";

export default function Portfolio() {
  return (
    <div className="font-mono h-fit overflow-visible bg-white text-neutral-900">
      <div className="px-4 py-0 max-w-xl mx-auto flex flex-col gap-12 my-12">
        {/* Header and About Section */}
        <AboutSection />

        {/* Side Projects Section */}
        <ProjectsSection />

        {/* Contact Section */}
        <ContactSection />

        {/* Socials Section */}
        <SocialsSection />
      </div>
    </div>
  );
}
