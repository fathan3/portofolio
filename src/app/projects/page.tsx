import data from "@/data/data.json";
import Link from "next/link";

export default async function ProjectsPage() {
  const username = data.personal_info.github_username;
  
  let repos = [];
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, { 
        next: { revalidate: 3600 },
        headers: {
            'Accept': 'application/vnd.github.mercy-preview+json'
        }
    });
    if (res.ok) {
        let fetchedRepos = await res.json();
        
        repos = await Promise.all(fetchedRepos.map(async (repo: any) => {
            try {
                const langRes = await fetch(repo.languages_url, { 
                    next: { revalidate: 3600 } 
                });
                if (langRes.ok) {
                    const langsData = await langRes.json();
                    repo.all_languages = Object.keys(langsData);
                } else {
                    repo.all_languages = repo.language ? [repo.language] : [];
                }
            } catch (error) {
                repo.all_languages = repo.language ? [repo.language] : [];
            }
            return repo;
        }));
    }
  } catch (error) {
      console.error("Failed to fetch repos", error);
  }

  return (
    <>
      <main className="bento-container relative z-10" style={{ display: 'block' }}>
        <div className="bento-box cyber-border" style={{ padding: '30px', minHeight: '80vh' }}>
            <div className="box-header" style={{ marginBottom: '30px' }}>
                <a href="/" className="cyber-btn" style={{ marginRight: '20px', padding: '5px 15px' }}>
                    &lt; BACK
                </a>
                <span className="title" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>DATA_ARCHIVE // ALL_PROJECTS</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {repos.map((repo: any) => (
                    <div key={repo.id} style={{ 
                        border: '1px solid var(--neon-blue-dim)', 
                        padding: '25px', 
                        background: 'rgba(255,255,255,0.02)',
                        transition: '0.3s'
                    }} className="cyber-hover">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                            <h3 style={{ fontSize: '1.8rem', color: '#fff', margin: '0' }}>{repo.name.toUpperCase()}</h3>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <span style={{ color: 'var(--text-muted)' }}><i className="fas fa-star"></i> {repo.stargazers_count}</span>
                                <span style={{ color: 'var(--text-muted)' }}><i className="fas fa-code-branch"></i> {repo.forks_count}</span>
                            </div>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', marginTop: '15px' }}>
                            {repo.all_languages && repo.all_languages.map((lang: string) => (
                                <span key={lang} className="cyber-btn" style={{ padding: '4px 10px', fontSize: '0.8rem', pointerEvents: 'none' }}>
                                    {lang}
                                </span>
                            ))}
                            
                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="cyber-btn" style={{ padding: '6px 15px', fontSize: '0.85rem', marginLeft: 'auto', background: '#fff', color: '#000' }}>
                                VIEW SOURCE <i className="fas fa-external-link-alt" style={{ marginLeft: '5px' }}></i>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </main>
    </>
  );
}
