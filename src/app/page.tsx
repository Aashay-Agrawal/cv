import Link from "next/link";
import { memo } from "react";
import { getPortfolioData } from "@/lib/data";

// Memoized components for better performance
const AboutSection = memo(({ name, text }: { name: string; text: string }) => {
  return (
    <section className="flex flex-col gap-1">
      <h1 className="text-xl font-bold">{name}</h1>
      <p className="leading-relaxed text-neutral-600 text-base whitespace-pre-line">
        {text}
      </p>
    </section>
  );
});

AboutSection.displayName = "AboutSection";

// Optimized Projects Section
const ProjectsSection = memo(
  ({ projects }: { projects: Array<{ href: string; title: string }> }) => {
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
  }
);

ProjectsSection.displayName = "ProjectsSection";

// Optimized Contact Section
const ContactSection = memo(
  ({
    contact,
  }: {
    contact: { email: string; calendar: string; telegram: string; freelance: string };
  }) => (
    <section className="flex flex-col gap-1">
      <h2 className="font-bold text-lg">Contact</h2>
      <div className="text-neutral-600 text-base">
        <p>
          For contract work or full-time opportunities, reach out via{" "}
          <a
            href={`https://mail.google.com/mail/?view=cm&to=${contact.email}`}
            className="underline-offset-2 underline hover:text-blue-500 transition-all duration-200"
            rel="noopener noreferrer"
          >
            email
          </a>{" "}
          or schedule a{" "}
          <a
            href={contact.calendar}
            className="underline-offset-2 underline hover:text-blue-500 transition-all duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            meet
          </a>
          or dm me on{" "}
          <a
            href={contact.telegram}
            className="underline-offset-2 underline hover:text-blue-500 transition-all duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            Telegram
          </a>
          . You can also hire for freelance work via{" "}
          <a
            href={contact.freelance}
            className="underline-offset-2 underline hover:text-blue-500 transition-all duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contra
          </a>
        </p>
      </div>
    </section>
  )
);

ContactSection.displayName = "ContactSection";

// Optimized Socials Section
const SocialsSection = memo(
  ({ socials }: { socials: Array<{ href: string; label: string }> }) => {
    return (
      <section className="flex flex-col gap-1">
        <h2 className="text-lg font-bold">Socials</h2>
        <div className="flex flex-wrap gap-4">
          {socials.map((social) => (
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
  }
);

SocialsSection.displayName = "SocialsSection";

// Server-side rendered page component
export default async function Portfolio() {
  // Fetch data on each request (Server-side rendering)
  const data = await getPortfolioData();
  return (
    <div className="font-mono h-fit overflow-visible bg-white text-neutral-900">
      <div className="px-4 py-0 max-w-xl mx-auto flex flex-col gap-12 my-12">
        {/* Header and About Section */}
        <AboutSection name={data.about.name} text={data.about.text} />

        {/* Side Projects Section */}
        <ProjectsSection projects={data.projects} />

        {/* Contact Section */}
        <ContactSection contact={data.contact} />

        {/* Socials Section */}
        <SocialsSection socials={data.socials} />
      </div>
    </div>
  );
}
