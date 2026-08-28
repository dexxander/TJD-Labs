import { useEffect, useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DeveloperCard } from '@/components/team/DeveloperCard';
import { fetchDevelopers } from '@/services/developers.service';
import { fetchProjects } from '@/services/projects.service';
import { developers as mockDevelopers } from '@/data/developers';
import type { Developer, Project } from '@/types';

export function Team() {
  const [developers, setDevelopers] = useState<Developer[]>(mockDevelopers);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    let mounted = true;
    Promise.all([fetchDevelopers(), fetchProjects()]).then(([devResult, projectResult]) => {
      if (!mounted) return;
      setDevelopers(devResult.developers);
      setProjects(projectResult.projects);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="container-lab pt-14 sm:pt-20">
      <SectionHeading
        eyebrow="The Team"
        title="Meet the builders."
        description="Three people, three different angles on the same problem: building software worth showing."
      />

      <div className="mt-10 space-y-6">
        {developers.map((dev, i) => (
          <DeveloperCard
            key={dev.id}
            developer={dev}
            projects={projects.filter((p) => p.developers.includes(dev.id))}
            delay={i * 0.08}
          />
        ))}
      </div>

      <div className="h-24 sm:h-32" />
    </section>
  );
}
