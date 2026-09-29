import data from "@/data/data.json";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default async function Home() {
  const { personal_info, skills } = data;

  let repos = [];
  try {
    const res = await fetch(
      `https://api.github.com/users/${personal_info.github_username}/repos?sort=updated&per_page=6`,
      {
        next: { revalidate: 3600 },
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );
    if (res.ok) {
      repos = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch repos", error);
  }

  return (
    <>
      <main className="min-h-screen bg-black text-white">
        <Hero personalInfo={personal_info} />
        <Skills skills={skills} />
        <Projects repos={repos} githubUsername={personal_info.github_username} />
        <Contact personalInfo={personal_info} />
      </main>
      <Footer personalInfo={personal_info} />
    </>
  );
}
