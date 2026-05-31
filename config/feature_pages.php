<?php

/*
|--------------------------------------------------------------------------
| Feature pages
|--------------------------------------------------------------------------
| Content for the individual /features/{slug} marketing pages, rendered by the
| shared feature-page island. Config now; easy to move to Statamic later. Order
| here is the order shown on the /features index. `icon` is a lucide-react name.
*/

return [
    'invoicing' => [
        'slug' => 'invoicing',
        'title' => 'Invoicing & receipts',
        'eyebrow' => 'Invoicing & receipts',
        'badge' => 'New',
        'icon' => 'FileText',
        'tagline' => 'Send polished invoices. Get paid faster.',
        'heroParagraph' => 'Create professional invoices and receipts in seconds, send them straight to your clients, and watch payments land with realtime tracking. No more chasing, no more spreadsheets, no more guesswork.',
        'media' => [
            'src' => 'https://images.pexels.com/photos/4968397/pexels-photo-4968397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'alt' => 'Naira and cash beneath a laptop on a desk, representing getting paid for freelance and small business work',
        ],
        'highlights' => [
            ['value' => '60s', 'label' => 'to a sent invoice'],
            ['value' => '0', 'label' => 'spreadsheets needed'],
            ['value' => 'Live', 'label' => 'paid vs. unpaid tracking'],
            ['value' => 'VAT', 'label' => 'calculated automatically'],
        ],
        'sections' => [
            [
                'heading' => 'Branded invoices that get taken seriously',
                'body' => 'Build clean, professional invoices with your logo, business details and payment terms baked in. Let AI draft the line items and descriptions from a short prompt, then send to your client and reuse the template every time.',
                'bullets' => [
                    'Your logo, colours and business details on every invoice',
                    'AI-drafted line items and descriptions from a quick note',
                    'Save reusable templates for repeat clients and retainers',
                    'Automatic VAT, subtotals and totals with no manual maths',
                ],
            ],
            [
                'heading' => 'Know exactly who has paid',
                'body' => 'Every invoice you send is tracked in realtime, so you always see what is paid, what is pending and what is overdue. Match incoming payments automatically through bank sync, and send a polished receipt the moment money arrives.',
                'bullets' => [
                    'Live status on every invoice: sent, viewed, paid, overdue',
                    'Payments matched automatically via Open Banking sync',
                    'Receipts generated and sent instantly on payment',
                    'Gentle reminders for invoices that slip past due',
                ],
            ],
            [
                'heading' => 'Books that are tax-ready by default',
                'body' => 'Because invoices, receipts and bank transactions live in one place, your records stay clean without extra effort. When tax season comes, your income is already organised and ready for FIRS, with PIT, CIT and VAT covered.',
                'bullets' => [
                    'Income captured and categorised as you invoice',
                    'Export-ready summaries for PIT, CIT and VAT',
                    'FIRS-ready records with proper receipts attached',
                    'AI insights that flag your top clients and slow payers',
                ],
            ],
        ],
        'faqs' => [
            ['question' => 'Can I send invoices in Naira and add VAT correctly?', 'answer' => 'Yes. Invoices are built for Nigerian businesses, so you can bill in Naira and Claryeo calculates VAT automatically on the right line items, with clear subtotals and totals your clients can trust.'],
            ['question' => 'How do I know when a client has actually paid?', 'answer' => 'Every invoice shows a live status, and because Claryeo syncs with your bank through Open Banking, incoming payments are matched to invoices automatically and marked as paid. You do not have to reconcile anything by hand.'],
            ['question' => 'Do clients receive a proper receipt?', 'answer' => 'Yes. The moment a payment is matched, Claryeo generates a professional receipt and can send it to your client automatically, giving you both a clean record for tax and accounting.'],
            ['question' => 'Are these invoices and receipts acceptable for FIRS and tax filing?', 'answer' => 'They are built to be FIRS-ready. Invoices and receipts carry the details tax requires, and your income is organised into export-ready summaries covering PIT, CIT and VAT so filing season is far less painful.'],
            ['question' => 'Can I reuse invoices for retainer or repeat clients?', 'answer' => 'Definitely. Save any invoice as a template, then duplicate it for recurring work in seconds. AI can also draft the line items so you are not retyping the same descriptions every month.'],
            ['question' => 'Do I need to upload bank statements to track invoice payments?', 'answer' => 'No manual uploads at all. Claryeo connects securely to your bank via Open Banking and tracks payments in realtime, so invoicing, receipts and your actual cash flow all stay in sync automatically.'],
        ],
    ],

    'bank-sync' => [
        'slug' => 'bank-sync',
        'title' => 'Bank sync',
        'eyebrow' => 'Open Banking',
        'badge' => 'New',
        'icon' => 'RefreshCw',
        'tagline' => 'Your bank does the bookkeeping now',
        'heroParagraph' => 'Link your Nigerian bank account once and every transaction flows into Claryeo automatically. No statement uploads, no manual entry, no guessing where your money went.',
        'media' => [
            'src' => 'https://images.pexels.com/photos/7534791/pexels-photo-7534791.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'alt' => 'Person holding a smartphone and a payment card, connecting a bank account for automatic transaction sync',
        ],
        'highlights' => [
            ['value' => '0', 'label' => 'manual uploads'],
            ['value' => 'Realtime', 'label' => 'transaction sync'],
            ['value' => 'Read-only', 'label' => 'secure Open Banking'],
            ['value' => 'PIT·CIT·VAT', 'label' => 'export-ready'],
        ],
        'sections' => [
            [
                'heading' => 'Connect once, never type a transaction again',
                'body' => 'Link your Nigerian bank account through Open Banking in a few taps and Claryeo handles the rest. Every payment in and out flows straight into your account, so your books stay up to date without you lifting a finger.',
                'bullets' => [
                    'Secure, read-only connection — Claryeo can never move your money',
                    'Works across your business and personal-business accounts',
                    'No statement PDFs, CSV exports or screenshots to wrangle',
                    'Transactions appear automatically, day and night',
                ],
            ],
            [
                'heading' => 'Realtime money, with AI doing the sorting',
                'body' => "As transactions land, Claryeo's AI reads them and separates income from expenses, matches payments to invoices and flags what looks like a business cost. You see live balances and cashflow instead of a guess at month-end.",
                'bullets' => [
                    'Auto-categorised income and expenses you can correct in one tap',
                    'Incoming payments matched to the right invoice',
                    'AI insights on spending, cashflow and what you are owed',
                    'Always-current totals — no reconciliation marathon',
                ],
            ],
            [
                'heading' => 'Clean data that turns into clean tax',
                'body' => 'Because every figure comes straight from your bank, your records are accurate and audit-ready — not retyped from memory. When filing season comes, your synced data rolls up into export-ready summaries built for FIRS.',
                'bullets' => [
                    'FIRS-ready summaries for PIT, CIT and VAT',
                    'Professional invoices and receipts backed by real bank data',
                    'Export reports for your accountant in a click',
                    'A reliable trail behind every naira in and out',
                ],
            ],
        ],
        'faqs' => [
            ['question' => 'Which Nigerian banks can I connect?', 'answer' => 'Claryeo connects to major Nigerian banks through licensed Open Banking providers. If your bank supports secure account linking, you can sync it — we are continually expanding coverage as more banks come online with Open Banking in Nigeria.'],
            ['question' => 'Is it safe to link my bank account?', 'answer' => 'Yes. The connection is read-only and built on Open Banking standards, so Claryeo can see your transactions to keep your books current but can never move or withdraw money. You can disconnect any account at any time.'],
            ['question' => 'Do I still need to upload statements or screenshots?', 'answer' => 'No. That is the whole point of Bank Sync — once connected, transactions flow in automatically. You will not need to download statement PDFs, export CSVs or send screenshots to your accountant again.'],
            ['question' => 'How quickly do transactions show up?', 'answer' => 'Transactions sync in realtime to near-realtime depending on your bank, so your balances and cashflow stay current through the day rather than being weeks behind.'],
            ['question' => 'What if a transaction is sorted into the wrong category?', 'answer' => "Claryeo's AI does the first pass automatically, and you can recategorise anything in a single tap. The app learns from your corrections, so sorting gets more accurate the more you use it."],
            ['question' => 'How does Bank Sync help at tax time?', 'answer' => 'Because your records come straight from your bank, they are accurate and complete. Claryeo rolls that data into export-ready, FIRS-friendly summaries for PIT, CIT and VAT, so filing and handing things to your accountant is fast and stress-free.'],
        ],
    ],

    'tax-reports' => [
        'slug' => 'tax-reports',
        'title' => 'Tax & reports',
        'eyebrow' => 'Tax & reports',
        'badge' => 'New',
        'icon' => 'BarChart3',
        'tagline' => 'Tax season, sorted before it starts',
        'heroParagraph' => 'Claryeo turns every synced transaction into FIRS-ready tax summaries and clean financial reports — so PIT, CIT and VAT stop being a year-end scramble and become a number you can trust any day of the week.',
        'media' => [
            'src' => 'https://images.pexels.com/photos/6863250/pexels-photo-6863250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'alt' => 'Tax documents, a calculator and financial paperwork laid out on a desk during tax filing',
        ],
        'highlights' => [
            ['value' => 'PIT·CIT·VAT', 'label' => 'covered'],
            ['value' => '0', 'label' => 'manual uploads'],
            ['value' => 'FIRS', 'label' => 'export-ready'],
            ['value' => 'Real-time', 'label' => 'tax position'],
        ],
        'sections' => [
            [
                'heading' => 'FIRS-ready summaries for PIT, CIT and VAT',
                'body' => 'Claryeo reads your synced income and expenses and maps them straight into the Nigerian tax categories that matter. Whether you file Personal Income Tax as a freelancer or CIT and VAT as a registered business, the figures are calculated as you go — not reconstructed from a shoebox of receipts in March.',
                'bullets' => [
                    'Separate, accurate summaries for PIT, CIT and VAT',
                    'Allowable expenses and input VAT tracked automatically',
                    'Figures tie back to real bank transactions, not estimates',
                    'See what you owe long before the filing deadline',
                ],
            ],
            [
                'heading' => 'Reports your accountant will actually thank you for',
                'body' => 'Generate profit and loss, income, and expense reports in a few taps, broken down by period, category or client. Export clean PDFs and spreadsheets ready to hand to your accountant or upload to FIRS — no reformatting, no late-night spreadsheet surgery.',
                'bullets' => [
                    'Profit & loss, income and expense statements on demand',
                    'Filter by month, quarter, year, client or category',
                    'Export to PDF and spreadsheet, FIRS-ready',
                    'Share straight with your accountant or bookkeeper',
                ],
            ],
            [
                'heading' => 'AI that explains the numbers, not just shows them',
                'body' => 'Behind every report is AI that analyses your transactions, flags what looks deductible, and surfaces plain-language insights about where your money is going. Ask a question about a figure and get a clear answer — so you understand your position instead of just trusting a total.',
                'bullets' => [
                    'AI categorises transactions and flags likely deductions',
                    'Plain-language insights on income, spend and tax owed',
                    'Spot anomalies and miscategorised entries early',
                    'Always-current view as new transactions sync in',
                ],
            ],
        ],
        'faqs' => [
            ['question' => 'Which Nigerian taxes does Claryeo handle?', 'answer' => 'Claryeo produces summaries for the three taxes most Nigerian freelancers and SMEs deal with: Personal Income Tax (PIT), Companies Income Tax (CIT) and Value Added Tax (VAT). Income and expenses are mapped into the right categories automatically as your bank account syncs.'],
            ['question' => 'Are the reports actually accepted for FIRS filing?', 'answer' => 'Claryeo generates export-ready summaries and reports formatted to line up with FIRS requirements, so you or your accountant can file with confidence. Claryeo prepares and organises the figures; the final submission to FIRS is still made by you or your tax adviser.'],
            ['question' => 'Do I have to upload bank statements or enter figures by hand?', 'answer' => 'No. Claryeo connects to your bank via Open Banking and pulls transactions in automatically, so your tax position updates in real time. There are zero manual statement uploads and no copying numbers into a spreadsheet.'],
            ['question' => 'How does Claryeo know which expenses are deductible?', 'answer' => 'The AI categorises each transaction and flags entries that typically qualify as allowable business expenses, separating them from personal spend. You stay in control — you can review, recategorise or exclude anything before it lands in a tax summary.'],
            ['question' => 'Can I share everything with my accountant?', 'answer' => 'Yes. You can export profit and loss, income and expense reports as PDFs or spreadsheets and send them to your accountant or bookkeeper. Because the figures trace back to real synced transactions, there is far less back-and-forth at filing time.'],
            ['question' => 'Can I see what I owe before the deadline?', 'answer' => "That's the point. Your PIT, CIT and VAT positions are calculated continuously as transactions come in, so you can check what you're likely to owe at any time of year and plan cash flow instead of being surprised at the deadline."],
        ],
    ],

    'ai-assistant' => [
        'slug' => 'ai-assistant',
        'title' => 'AI assistant',
        'eyebrow' => 'AI assistant',
        'badge' => 'New',
        'icon' => 'Sparkles',
        'tagline' => 'Your books, finally talking back',
        'heroParagraph' => "Claryeo's AI reads every transaction the moment it syncs from your bank, drafts your invoices, and turns months of messy spending into plain answers. Ask it anything about your money and get a straight reply, not another spreadsheet.",
        'media' => [
            'src' => 'https://images.pexels.com/photos/3861957/pexels-photo-3861957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'alt' => 'Laptop screen displaying a financial analytics dashboard with charts and graphs',
        ],
        'highlights' => [
            ['value' => '0', 'label' => 'manual statement uploads'],
            ['value' => '24/7', 'label' => 'answers on demand'],
            ['value' => 'PIT·CIT·VAT', 'label' => 'tax-aware insights'],
            ['value' => 'Naira-first', 'label' => 'built for Nigerian SMEs'],
        ],
        'sections' => [
            [
                'heading' => 'Ask your finances anything',
                'body' => "Type a question the way you'd ask your accountant and get an answer in seconds. The assistant pulls from your live bank-synced transactions, invoices and receipts, so every reply reflects where your money actually is right now.",
                'bullets' => [
                    '"How much did I spend on fuel last quarter?" — answered instantly',
                    'Spot your biggest clients, slowest payers and runaway costs',
                    'No formulas, filters or pivot tables to learn',
                ],
            ],
            [
                'heading' => 'Drafts and admin, done for you',
                'body' => 'Stop staring at a blank invoice. The AI drafts professional invoices and receipts from a one-line prompt, categorises incoming transactions automatically, and flags anything that looks off before it becomes a problem.',
                'bullets' => [
                    'Generate invoices and receipts from a short description',
                    'Auto-categorise expenses as they sync — no manual tagging',
                    'Catch duplicate charges and unusual spend early',
                ],
            ],
            [
                'heading' => 'Insights that keep you tax-ready',
                'body' => 'The assistant watches your numbers continuously and surfaces what matters: cash trends, profit margins and your building tax position. When filing season comes, it has already organised everything into export-ready summaries for PIT, CIT and VAT.',
                'bullets' => [
                    'Plain-language insights on cash flow and profitability',
                    'Running estimates of VAT, PIT and CIT as you trade',
                    'FIRS-ready summaries and reports, exportable on demand',
                ],
            ],
        ],
        'faqs' => [
            ['question' => 'Where does the AI get its information from?', 'answer' => 'From your own data inside Claryeo — transactions synced directly from your bank via Open Banking, plus the invoices and receipts you create. There are no manual statement uploads, so its answers stay current with your real balances.'],
            ['question' => 'Does it understand Nigerian taxes?', 'answer' => 'Yes. The assistant is built around FIRS requirements and reasons in Naira, giving you running insight into your PIT, CIT and VAT positions and generating export-ready tax summaries when you need to file.'],
            ['question' => 'Can it actually create invoices and receipts for me?', 'answer' => 'It can. Describe the job in a sentence — client, work and amount — and the AI drafts a professional invoice or receipt you can review, tweak and send. It will also auto-categorise the payment once it lands.'],
            ['question' => 'Is my financial data safe when I use the AI?', 'answer' => 'Your data stays within your private Claryeo account and is only used to answer your own questions. Bank connections use secure Open Banking, which is read-only — the assistant can see your transactions but can never move your money.'],
            ['question' => 'Do I need accounting knowledge to use it?', 'answer' => 'No. The whole point is to skip the jargon. Ask questions in everyday language and get clear answers — the assistant handles the categorising, calculations and reporting behind the scenes.'],
            ['question' => 'What kinds of questions can I ask?', 'answer' => "Anything grounded in your numbers: how much you earned this month, which clients owe you, your top expense categories, whether you're on track for VAT, or how this quarter compares to the last. If it touches your money, the assistant can answer it."],
        ],
    ],
];
