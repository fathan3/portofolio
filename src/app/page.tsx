import data from "@/data/data.json";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import Terminal from "@/components/Terminal";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Geolocation from "@/components/Geolocation";
import Contact from "@/components/Contact";

export default function Home() {
  const { personal_info, skills } = data;

  return (
    <>
      <Preloader />
      <main className="bento-container relative z-10">
        <Hero personalInfo={personal_info} />
        <Terminal sysUser={personal_info.name} />
        <Skills skills={skills} />
        <Projects githubUsername={personal_info.github_username} />
        <Geolocation location={personal_info.location} />
        <Contact personalInfo={personal_info} />
      </main>
    </>
  );
}
