import data from "@/data/data.json";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import Terminal from "@/components/Terminal";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Geolocation from "@/components/Geolocation";
import Contact from "@/components/Contact";

export default async function Home() {
  const { personal_info, skills } = data;
  
  let repos = [];
  try {
    const res = await fetch(`https://api.github.com/users/${personal_info.github_username}/repos?sort=updated&per_page=4`, { 
        next: { revalidate: 3600 } 
    });
    if (res.ok) {
        repos = await res.json();
    }
  } catch (error) {
      console.error("Failed to fetch repos", error);
  }

  return (
    <>
      <Preloader />
      <main className="bento-container relative z-10">
        <Hero personalInfo={personal_info} />
        <Terminal sysUser={personal_info.name} />
        <Skills skills={skills} />
        <Projects repos={repos} />
        <Geolocation location={personal_info.location} />
        <Contact personalInfo={personal_info} />
      </main>
    </>
  );
}
