type SectionHeaderProps = {
    title: string;
    primaryText: string;
    secondaryText: string;
};

export default function SectionHeader({ title, primaryText, secondaryText }: SectionHeaderProps) {
    return (
        <div className="mb-12">
            <h1 className="text-4xl font-light mb-2">{title}</h1>
            <p className="text-muted-foreground">
                <i>
                    <span className="font-petemoss-text text-2xl font-medium mr-2">{primaryText}</span>
                </i>
                {secondaryText}
            </p>
        </div>
    );
}
