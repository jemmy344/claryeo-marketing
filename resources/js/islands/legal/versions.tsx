import type { FC } from 'react';

const formatDate = (d: string | undefined | null): string => {
    if (!d) return '';
    const date = new Date(d);
    return Number.isNaN(date.getTime())
        ? d
        : date.toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
          });
};

export type LegalVersionsPageProps = {
    slug: string;
    title: string;
    versions: Array<{
        version: string;
        effective_date: string | null;
        status: string | null;
        url: string;
    }>;
    currentVersion: string | null;
};

const LegalVersionsPage: FC<LegalVersionsPageProps> = ({
    slug,
    title,
    versions,
    currentVersion,
}) => (
    <>
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <div className="border-b border-border bg-muted/20 py-12 transition-colors duration-300 md:py-16">
                <div className="mx-auto max-w-3xl px-4 md:px-6">
                    <h1 className="t-display-1 text-foreground">Updates: {title}</h1>
                    <p className="t-lead mt-4 text-muted-foreground">
                        We want to be as transparent as possible about the
                        changes we make to our {title}. In this archive you can
                        see previous versions of the policy. Each version is
                        available to view for your review.
                    </p>
                </div>
            </div>

            <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
                <ul className="flex flex-col gap-3">
                    {versions.map((v) => (
                        <li key={v.version} className="flex flex-col gap-1">
                            {v.version === currentVersion ? (
                                <span className="font-medium text-foreground">
                                    Current version
                                </span>
                            ) : (
                                <span className="text-foreground">
                                    {v.effective_date
                                        ? formatDate(v.effective_date)
                                        : v.version}
                                </span>
                            )}
                            <a
                                href={v.url}
                                className="text-sm text-primary underline underline-offset-2 hover:no-underline"
                            >
                                {v.version === currentVersion
                                    ? 'View current version'
                                    : `View version ${v.version}`}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="mt-12 border-t border-border pt-8">
                    <a
                        href={`/${slug}`}
                        className="text-sm font-medium text-primary underline-offset-2 hover:underline"
                    >
                        Back to {title}
                    </a>
                </div>
            </div>
        </div>
    </>
);

export default LegalVersionsPage;
