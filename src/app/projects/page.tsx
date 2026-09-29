import data from "@/data/data.json";
import ProjectsArchive from "./ProjectsArchive";
import Footer from "@/components/Footer";

export default async function ProjectsPage() {
  const username = data.personal_info.github_username;

  let repos = [];
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
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
    <main className="min-h-screen bg-black text-white">
      <ProjectsArchive
        initialRepos={repos}
        username={username}
        customProjects={data.projects}
        excludedProjects={data.excluded_projects}
      />
      <Footer personalInfo={data.personal_info} />
    </main>
  );
}
