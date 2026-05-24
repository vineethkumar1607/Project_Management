import { type DangerZoneSectionProps } from "~/types/workspace";


const DangerZoneSection = ({title,description,children,}: DangerZoneSectionProps) => {
    return (
        <section
            className="rounded-xl border border-red-200 dark:border-red-900/50 
                 bg-red-50/40 dark:bg-red-950/20 p-5 space-y-4"
        >
            {/* Header */}
            <div className="space-y-1">
                <h3 className="text-base font-semibold text-red-600 dark:text-red-400">
                    {title}
                </h3>

                <p className="text-sm text-muted-foreground">
                    {description}
                </p>
            </div>

            {/* Content */}
            <div>
                {children}
            </div>
        </section>
    );
};

export default DangerZoneSection;