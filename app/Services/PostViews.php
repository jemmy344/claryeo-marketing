<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class PostViews
{
    /**
     * Record a single view for an entry. Atomic upsert so concurrent requests
     * don't lose increments.
     */
    public function record(string $entryId): void
    {
        DB::table('post_views')->upsert(
            [['entry_id' => $entryId, 'views' => 1, 'last_viewed_at' => now()]],
            ['entry_id'],
            ['views' => DB::raw('views + 1'), 'last_viewed_at' => now()],
        );
    }

    /**
     * Entry ids ordered by view count (most viewed first).
     *
     * @return list<string>
     */
    public function topIds(int $limit): array
    {
        try {
            /** @var list<string> $ids */
            $ids = DB::table('post_views')
                ->orderByDesc('views')
                ->orderByDesc('last_viewed_at')
                ->limit($limit)
                ->pluck('entry_id')
                ->all();

            return $ids;
        } catch (\Throwable) {
            return []; // ponytail: Top Reads is decorative — falls back to recent posts
        }
    }
}
