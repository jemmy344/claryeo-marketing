import type { FC } from 'react';

const values = [
    {
        title: 'Clarity over complexity',
        description:
            'We design every flow to reduce admin work and help businesses make faster decisions.',
    },
    {
        title: 'Built for real operators',
        description:
            'Claryeo is shaped around day-to-day invoicing, expenses, and tax tasks for freelancers and growing teams.',
    },
    {
        title: 'Trust by default',
        description:
            'We prioritize reliable records, transparent calculations, and responsible handling of customer data.',
    },
];

const team = [
    {
        name: 'Product & Engineering',
        description:
            'Builds practical tools that automate repetitive finance operations.',
    },
    {
        name: 'Customer Experience',
        description:
            'Works directly with users to improve onboarding, support, and education.',
    },
    {
        name: 'Operations & Compliance',
        description:
            'Keeps workflows aligned with local requirements and reporting standards.',
    },
];

const About: FC = () => (
    <>
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <section className="border-b border-border bg-muted/20 py-14 transition-colors duration-300 md:py-20">
                <div className="mx-auto max-w-3xl px-4 md:px-6">
                    <p className="text-sm font-medium tracking-wide text-primary uppercase">
                        About Claryeo
                    </p>
                    <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
                        We are building modern business finance tools for the
                        teams doing real work.
                    </h1>
                    <p className="mt-5 text-base text-muted-foreground md:text-lg">
                        Claryeo started with a simple problem: small businesses
                        and freelancers spend too much time stitching together
                        invoices, expenses, and tax records across disconnected
                        tools. We built one focused workspace to bring those
                        jobs together.
                    </p>
                </div>
            </section>

            <section className="mx-auto grid w-full max-w-5xl gap-10 px-4 py-14 md:grid-cols-2 md:px-6 md:py-20">
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                        Our Story
                    </h2>
                    <p className="text-muted-foreground">
                        We launched Claryeo to replace manual spreadsheets and
                        fragmented workflows with a system designed around daily
                        operations. The goal is straightforward: help users
                        invoice faster, track expenses clearly, and stay ready
                        for filing seasons.
                    </p>
                    <img
                        src="https://images.pexels.com/photos/7674611/pexels-photo-7674611.jpeg?auto=compress&cs=tinysrgb&w=1400"
                        alt="Team planning financial product workflows"
                        className="h-64 w-full rounded-xl border border-border object-cover shadow-sm"
                        loading="lazy"
                        decoding="async"
                    />
                </div>
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                    <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                        Our Mission
                    </h2>
                    <p className="mt-3 text-muted-foreground">
                        To give every modern business a simpler path from work
                        completed to money tracked and taxes prepared, without
                        heavy accounting overhead.
                    </p>
                    <img
                        src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1400"
                        alt="Small business owners reviewing progress together"
                        className="mt-5 h-52 w-full rounded-xl border border-border object-cover shadow-sm"
                        loading="lazy"
                        decoding="async"
                    />
                </div>
            </section>

            <section className="border-y border-border bg-muted/15 py-14 transition-colors duration-300 md:py-20">
                <div className="mx-auto max-w-5xl px-4 md:px-6">
                    <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                        Values
                    </h2>
                    <div className="mt-8 grid gap-4 md:grid-cols-3">
                        {values.map((value) => (
                            <article
                                key={value.title}
                                className="rounded-xl border border-border bg-card p-6 shadow-sm"
                            >
                                <h3 className="text-base font-semibold text-foreground">
                                    {value.title}
                                </h3>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    {value.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-5xl px-4 py-14 md:px-6 md:py-20">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                    Team
                </h2>
                <p className="mt-3 max-w-3xl text-muted-foreground">
                    We are a small, cross-functional team focused on building a
                    reliable product that keeps improving with customer
                    feedback.
                </p>
                <div className="mt-8 grid gap-4 md:grid-cols-3">
                    {team.map((group) => (
                        <article
                            key={group.name}
                            className="rounded-xl border border-border bg-card p-6 shadow-sm"
                        >
                            <h3 className="text-base font-semibold text-foreground">
                                {group.name}
                            </h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                {group.description}
                            </p>
                        </article>
                    ))}
                </div>
                <img
                    src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt="People collaborating in a modern office"
                    className="mt-8 h-64 w-full rounded-xl border border-border object-cover shadow-sm md:h-80"
                    loading="lazy"
                    decoding="async"
                />
            </section>
        </div>
    </>
);

export default About;
