<?php

namespace App\Http\View\Composers;

use App\Services\PostViews;
use Illuminate\View\View;
use Statamic\Entries\Entry as EntryItem;
use Statamic\Facades\Entry;
use Statamic\Stache\Query\EntryQueryBuilder;

class BlogIndexComposer
{
    public function __construct(private readonly PostViews $views) {}

    public function compose(View $view): void
    {
        // Category pages don't render the "Top Reads" block (mirrors the
        // {{ unless activeCategory }} guard in the template).
        if (! empty($view->getData()['activeCategory'] ?? null)) {
            return;
        }

        $view->with('top_reads', $this->topReads(3));
    }

    /**
     * The most-viewed published posts, falling back to the most recent posts
     * (excluding the single newest, which "The Latest" already shows) when too
     * few have accumulated views yet.
     *
     * @return list<array<string, mixed>>
     */
    private function topReads(int $limit): array
    {
        /** @var list<EntryItem> $entries */
        $entries = [];
        $seen = [];

        // Most-viewed first. Pull a few extra ids in case some point at
        // unpublished or deleted entries.
        foreach ($this->views->topIds($limit * 2) as $id) {
            if (count($entries) >= $limit) {
                break;
            }

            $entry = $this->resolveBlogEntry($id);

            if ($entry !== null) {
                $entries[] = $entry;
                $seen[] = $id;
            }
        }

        // Cold-start fallback: top up with the most recent posts, skipping the
        // single newest (shown by "The Latest") and anything already chosen.
        if (count($entries) < $limit) {
            $recent = $this->recentBlogEntries();
            $newestId = ($recent[0] ?? null)?->id();

            foreach ($recent as $entry) {
                if (count($entries) >= $limit) {
                    break;
                }

                $id = $entry->id();

                if ($id === $newestId || in_array($id, $seen, true)) {
                    continue;
                }

                $entries[] = $entry;
                $seen[] = $id;
            }
        }

        return array_map(fn (EntryItem $entry): array => [
            'url' => $entry->url(),
            'title' => $entry->value('title'),
            'hero_image' => $entry->value('hero_image'),
            'author' => $entry->value('author') ?? 'The Claryeo team',
            'date' => $entry->date(),
        ], $entries);
    }

    /**
     * Resolve an id to a published blog entry, or null if it isn't one.
     */
    private function resolveBlogEntry(string $id): ?EntryItem
    {
        $entry = Entry::find($id);

        if ($entry instanceof EntryItem && $entry->collectionHandle() === 'blog' && $entry->published()) {
            return $entry;
        }

        return null;
    }

    /**
     * All published blog entries, newest first.
     *
     * @return list<EntryItem>
     */
    private function recentBlogEntries(): array
    {
        // Use Statamic QueryBuilder with status filter and Stache index ordering
        // instead of iterating all entries in memory and sorting in PHP.
        /** @var EntryQueryBuilder $query */
        $query = Entry::query();

        /** @var list<EntryItem> */
        return $query
            ->where('collection', 'blog')
            ->whereStatus('published')
            ->orderBy('date', 'desc')
            ->get()
            ->all();
    }
}
