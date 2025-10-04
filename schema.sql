-- schema.sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS citext;

CREATE TABLE IF NOT EXISTS game_modes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT NOT NULL UNIQUE,
    label TEXT NOT NULL,
    description TEXT,
    active BOOLEAN NOT NULL DEFAULT TRUE
);

COMMENT ON TABLE game_modes IS 'Available game modes for user experience pacing.';
COMMENT ON COLUMN game_modes.id IS 'Primary key for the game mode.';
COMMENT ON COLUMN game_modes.key IS 'Stable identifier such as LOW, CHILL, FLOW, EVOLVE, SHARK.';
COMMENT ON COLUMN game_modes.label IS 'Human-readable label for the game mode.';
COMMENT ON COLUMN game_modes.description IS 'Optional description for the game mode.';
COMMENT ON COLUMN game_modes.active IS 'Flag to mark whether the game mode is currently active.';

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email CITEXT NOT NULL UNIQUE,
    display_name TEXT,
    avatar_url TEXT,
    timezone TEXT NOT NULL DEFAULT 'Europe/Berlin',
    xp_total INTEGER NOT NULL DEFAULT 0,
    level INTEGER NOT NULL DEFAULT 1,
    started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    game_mode_id UUID REFERENCES game_modes(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE users IS 'Registered players using the Innerbloom application.';
COMMENT ON COLUMN users.id IS 'Primary key for the user.';
COMMENT ON COLUMN users.email IS 'Unique email address for login using case-insensitive matching.';
COMMENT ON COLUMN users.display_name IS 'Optional display name shown to other players.';
COMMENT ON COLUMN users.avatar_url IS 'Optional link to the user''s avatar image.';
COMMENT ON COLUMN users.timezone IS 'IANA timezone identifier controlling local day boundaries.';
COMMENT ON COLUMN users.xp_total IS 'Cached total experience points for quick reads.';
COMMENT ON COLUMN users.level IS 'Cached current level derived from XP.';
COMMENT ON COLUMN users.started_at IS 'Timestamp when the user started using Innerbloom.';
COMMENT ON COLUMN users.game_mode_id IS 'Preferred game mode for the user.';
COMMENT ON COLUMN users.created_at IS 'Timestamp when the user record was created.';
COMMENT ON COLUMN users.updated_at IS 'Timestamp when the user record was last updated.';

CREATE TABLE IF NOT EXISTS pillars (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL UNIQUE,
    label TEXT NOT NULL,
    sort_order SMALLINT NOT NULL DEFAULT 0,
    active BOOLEAN NOT NULL DEFAULT TRUE
);

COMMENT ON TABLE pillars IS 'Core pillars representing high-level areas of growth.';
COMMENT ON COLUMN pillars.id IS 'Primary key for the pillar.';
COMMENT ON COLUMN pillars.code IS 'Stable code for the pillar such as BODY, MIND, SOUL.';
COMMENT ON COLUMN pillars.label IS 'Display label for the pillar, can include emoji.';
COMMENT ON COLUMN pillars.sort_order IS 'Order used to display the pillars.';
COMMENT ON COLUMN pillars.active IS 'Flag indicating whether the pillar is active.';

CREATE TABLE IF NOT EXISTS traits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pillar_id UUID NOT NULL REFERENCES pillars(id),
    code TEXT NOT NULL,
    label TEXT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    UNIQUE (pillar_id, code)
);

COMMENT ON TABLE traits IS 'Traits break down pillars into more specific focus areas.';
COMMENT ON COLUMN traits.id IS 'Primary key for the trait.';
COMMENT ON COLUMN traits.pillar_id IS 'Pillar that this trait belongs to.';
COMMENT ON COLUMN traits.code IS 'Unique code within the pillar for the trait.';
COMMENT ON COLUMN traits.label IS 'Display label for the trait.';
COMMENT ON COLUMN traits.active IS 'Flag marking whether the trait is active.';

CREATE TABLE IF NOT EXISTS stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trait_id UUID NOT NULL REFERENCES traits(id),
    code TEXT NOT NULL,
    label TEXT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    UNIQUE (trait_id, code)
);

COMMENT ON TABLE stats IS 'Stats represent measurable aspects under each trait.';
COMMENT ON COLUMN stats.id IS 'Primary key for the stat.';
COMMENT ON COLUMN stats.trait_id IS 'Trait that this stat is associated with.';
COMMENT ON COLUMN stats.code IS 'Unique code within the trait for the stat.';
COMMENT ON COLUMN stats.label IS 'Display label for the stat.';
COMMENT ON COLUMN stats.active IS 'Flag indicating if the stat is active.';

CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stat_id UUID NOT NULL REFERENCES stats(id),
    code TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    difficulty TEXT NOT NULL DEFAULT 'EASY',
    base_xp SMALLINT NOT NULL DEFAULT 10,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    sort_order SMALLINT NOT NULL DEFAULT 0,
    UNIQUE (stat_id, code),
    CHECK (difficulty IN ('EASY', 'MEDIUM', 'HARD', 'BOSS'))
);

COMMENT ON TABLE tasks IS 'Catalog of tasks that can be added to user routines.';
COMMENT ON COLUMN tasks.id IS 'Primary key for the task.';
COMMENT ON COLUMN tasks.stat_id IS 'Stat that the task contributes towards.';
COMMENT ON COLUMN tasks.code IS 'Short gamer-style code for the task.';
COMMENT ON COLUMN tasks.title IS 'Display title shown to the user.';
COMMENT ON COLUMN tasks.description IS 'Optional long-form description of the task.';
COMMENT ON COLUMN tasks.difficulty IS 'Default difficulty classification for the task.';
COMMENT ON COLUMN tasks.base_xp IS 'Base experience points awarded for the task.';
COMMENT ON COLUMN tasks.active IS 'Flag to mark the task as active in the catalog.';
COMMENT ON COLUMN tasks.sort_order IS 'Ordering hint for presenting tasks within a stat.';

CREATE TABLE IF NOT EXISTS user_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    task_id UUID NOT NULL REFERENCES tasks(id),
    custom_title TEXT,
    custom_desc TEXT,
    difficulty TEXT,
    phase TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_by_ai BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user_id, task_id),
    CHECK (difficulty IS NULL OR difficulty IN ('EASY', 'MEDIUM', 'HARD', 'BOSS'))
);

COMMENT ON TABLE user_tasks IS 'User-customized tasks derived from the catalog.';
COMMENT ON COLUMN user_tasks.id IS 'Primary key for the user task record.';
COMMENT ON COLUMN user_tasks.user_id IS 'Owner user of the task with cascading deletes.';
COMMENT ON COLUMN user_tasks.task_id IS 'Reference to the base catalog task.';
COMMENT ON COLUMN user_tasks.custom_title IS 'Optional user-defined title.';
COMMENT ON COLUMN user_tasks.custom_desc IS 'Optional user-defined description.';
COMMENT ON COLUMN user_tasks.difficulty IS 'Optional override for the task difficulty.';
COMMENT ON COLUMN user_tasks.phase IS 'Phase indicator for progression grouping.';
COMMENT ON COLUMN user_tasks.is_active IS 'Flag to enable or disable the task for the user.';
COMMENT ON COLUMN user_tasks.created_by_ai IS 'Indicates if the task was generated by AI.';
COMMENT ON COLUMN user_tasks.created_at IS 'Timestamp when the user task was created.';
COMMENT ON COLUMN user_tasks.updated_at IS 'Timestamp when the user task was last updated.';

CREATE TABLE IF NOT EXISTS daily_task_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    user_task_id UUID NOT NULL REFERENCES user_tasks(id) ON DELETE CASCADE,
    completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    quantity SMALLINT NOT NULL DEFAULT 1,
    source TEXT NOT NULL DEFAULT 'FORM',
    UNIQUE (user_id, user_task_id, completed_at)
);

COMMENT ON TABLE daily_task_logs IS 'Logs of task completions recorded per user per task.';
COMMENT ON COLUMN daily_task_logs.id IS 'Primary key for the daily task log.';
COMMENT ON COLUMN daily_task_logs.user_id IS 'User that completed the task; cascade on delete.';
COMMENT ON COLUMN daily_task_logs.user_task_id IS 'User task that was completed; cascade on delete.';
COMMENT ON COLUMN daily_task_logs.completed_at IS 'Timestamp when the task completion occurred.';
COMMENT ON COLUMN daily_task_logs.quantity IS 'Number of completions recorded in the entry.';
COMMENT ON COLUMN daily_task_logs.source IS 'Origin of the log entry such as FORM, API, or MANUAL.';

CREATE TABLE IF NOT EXISTS daily_emotions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    day DATE NOT NULL,
    emotion_key TEXT NOT NULL,
    emotion_raw TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user_id, day)
);

COMMENT ON TABLE daily_emotions IS 'Daily dominant emotion tracked per user.';
COMMENT ON COLUMN daily_emotions.id IS 'Primary key for the daily emotion record.';
COMMENT ON COLUMN daily_emotions.user_id IS 'User that reported the emotion; cascade on delete.';
COMMENT ON COLUMN daily_emotions.day IS 'Calendar day for the emotion entry.';
COMMENT ON COLUMN daily_emotions.emotion_key IS 'Normalized key representing the emotion.';
COMMENT ON COLUMN daily_emotions.emotion_raw IS 'Optional full text of the emotion label as provided.';
COMMENT ON COLUMN daily_emotions.created_at IS 'Timestamp when the emotion entry was created.';

CREATE TABLE IF NOT EXISTS xp_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL,
    reason TEXT NOT NULL,
    ref_table TEXT,
    ref_id UUID,
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE xp_events IS 'Ledger of all XP transactions for users.';
COMMENT ON COLUMN xp_events.id IS 'Primary key for the XP event.';
COMMENT ON COLUMN xp_events.user_id IS 'User associated with the XP change; cascade on delete.';
COMMENT ON COLUMN xp_events.amount IS 'XP amount applied, can be positive or negative.';
COMMENT ON COLUMN xp_events.reason IS 'Reason for the XP change such as TASK_COMPLETED.';
COMMENT ON COLUMN xp_events.ref_table IS 'Optional reference table for the source entity.';
COMMENT ON COLUMN xp_events.ref_id IS 'Optional reference identifier for the source entity.';
COMMENT ON COLUMN xp_events.occurred_at IS 'Timestamp when the XP event occurred.';

CREATE TABLE IF NOT EXISTS levels (
    level INTEGER PRIMARY KEY,
    xp_required INTEGER NOT NULL
);

COMMENT ON TABLE levels IS 'XP thresholds required for each level.';
COMMENT ON COLUMN levels.level IS 'Level number in ascending order.';
COMMENT ON COLUMN levels.xp_required IS 'Total XP required to reach the level.';

CREATE INDEX IF NOT EXISTS idx_traits_pillar ON traits (pillar_id);
CREATE INDEX IF NOT EXISTS idx_stats_trait ON stats (trait_id);
CREATE INDEX IF NOT EXISTS idx_tasks_stat_active ON tasks (stat_id) WHERE active;
CREATE INDEX IF NOT EXISTS idx_user_tasks_user ON user_tasks (user_id) WHERE is_active;
CREATE INDEX IF NOT EXISTS idx_logs_user_day ON daily_task_logs (user_id, (date_trunc('day', completed_at)));
CREATE INDEX IF NOT EXISTS idx_xp_user_time ON xp_events (user_id, occurred_at);
