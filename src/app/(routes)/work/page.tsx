import Link from 'next/link';
import { getAllWork } from '@/lib/server/work-mdx';
import SectionHeader from '@/components/common/section-header';

export default function WorkListPage() {
    const workExperiences = getAllWork();

    return (
        <div className="min-h-screen max-w-4xl mx-auto bg-background text-foreground px-4 py-16">
            <SectionHeader
                title="work"
                primaryText="the path"
                secondaryText="to the person i want to be"
            />

            <div className="space-y-6">
                {workExperiences.map((work) => {
                    // Format date range
                    let dateRange = '';
                    try {
                        if (work.startDate) {
                            const startYear = new Date(work.startDate).getFullYear();
                            const endDate = work.endDate ? new Date(work.endDate) : null;
                            const endYear = endDate ? endDate.getFullYear() : 'Present';

                            dateRange = `${startYear} — ${endYear}`;
                        }
                    } catch (error) {
                        console.error("Error formatting date range:", error);
                        dateRange = `${work.startDate || ''} — ${work.endDate || 'Present'}`;
                    }

                    return (
                        <div key={work.slug} className="border-b border-border pb-6">
                            <Link href={`/work/${work.slug}`} className="flex justify-between items-center w-full group">
                                <span className="text-base md:text-lg group-hover:text-primary transition-colors">
                                    {work.company.toLowerCase()}
                                </span>
                                <span className="text-sm md:text-sm text-muted-foreground">{dateRange}</span>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}