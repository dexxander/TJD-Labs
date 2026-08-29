import { SectionHeading } from '@/components/ui/SectionHeading';
import { TechCategory } from '@/components/stack/TechCategory';
import { techStack } from '@/data/tech';

export function Stack() {
  return (
    <section className="container-lab pt-14 sm:pt-20">
      <SectionHeading
        eyebrow="Our Stack"
        title="What we build with."
        description="The languages, frameworks, and tools that show up across most TJD Labs projects, grouped by where they sit in the stack."
      />

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
        {techStack.map((group, i) => (
          <TechCategory key={group.id} group={group} delay={(i % 2) * 0.08} />
        ))}
      </div>

      <div className="h-24 sm:h-32" />
    </section>
  );
}
