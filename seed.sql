-- seed.sql
INSERT INTO game_modes (key, label, description)
VALUES
    ('LOW', 'Low Pace', 'Ritmo suave para construir hábitos con calma.'),
    ('CHILL', 'Chill Mode', 'Equilibrio relajado con misiones ligeras.'),
    ('FLOW', 'Flow Mode', 'Flujo sostenido para mantener momentum.'),
    ('EVOLVE', 'Evolve Mode', 'Retos crecientes para evolucionar hábitos.'),
    ('SHARK', 'Shark Mode', 'Modo intenso para jugadores competitivos.')
ON CONFLICT (key) DO UPDATE
SET label = EXCLUDED.label,
    description = EXCLUDED.description,
    active = TRUE;

INSERT INTO pillars (code, label, sort_order)
VALUES
    ('BODY', '🫀 Body', 1),
    ('MIND', '🧠 Mind', 2),
    ('SOUL', '🏵️ Soul', 3)
ON CONFLICT (code) DO UPDATE
SET label = EXCLUDED.label,
    sort_order = EXCLUDED.sort_order,
    active = TRUE;

WITH body_pillar AS (
    SELECT id FROM pillars WHERE code = 'BODY'
), mind_pillar AS (
    SELECT id FROM pillars WHERE code = 'MIND'
), soul_pillar AS (
    SELECT id FROM pillars WHERE code = 'SOUL'
), trait_upserts AS (
    INSERT INTO traits (pillar_id, code, label)
    SELECT bp.id, 'ENERGY', 'Energy Management' FROM body_pillar bp
    UNION ALL
    SELECT bp.id, 'MOBILITY', 'Mobility & Flexibility' FROM body_pillar bp
    UNION ALL
    SELECT mp.id, 'FOCUS', 'Focused Attention' FROM mind_pillar mp
    UNION ALL
    SELECT mp.id, 'LEARNING', 'Learning Mindset' FROM mind_pillar mp
    UNION ALL
    SELECT sp.id, 'EMOTIONS', 'Emotional Awareness' FROM soul_pillar sp
    UNION ALL
    SELECT sp.id, 'CONNECTION', 'Meaningful Connections' FROM soul_pillar sp
    ON CONFLICT (pillar_id, code) DO UPDATE
    SET label = EXCLUDED.label,
        active = TRUE
    RETURNING id, code
), trait_map AS (
    SELECT code AS trait_code, id AS trait_id FROM trait_upserts
), stat_upserts AS (
    INSERT INTO stats (trait_id, code, label)
    SELECT tm.trait_id, 'SLEEP', 'Sleep Quality' FROM trait_map tm WHERE tm.trait_code = 'ENERGY'
    UNION ALL
    SELECT tm.trait_id, 'HYDRATION', 'Hydration' FROM trait_map tm WHERE tm.trait_code = 'ENERGY'
    UNION ALL
    SELECT tm.trait_id, 'STRETCH', 'Stretching' FROM trait_map tm WHERE tm.trait_code = 'MOBILITY'
    UNION ALL
    SELECT tm.trait_id, 'DEEPWORK', 'Deep Work' FROM trait_map tm WHERE tm.trait_code = 'FOCUS'
    UNION ALL
    SELECT tm.trait_id, 'READING', 'Reading' FROM trait_map tm WHERE tm.trait_code = 'LEARNING'
    UNION ALL
    SELECT tm.trait_id, 'JOURNAL', 'Journaling' FROM trait_map tm WHERE tm.trait_code = 'EMOTIONS'
    UNION ALL
    SELECT tm.trait_id, 'GRATITUDE', 'Gratitude Practice' FROM trait_map tm WHERE tm.trait_code = 'CONNECTION'
    ON CONFLICT (trait_id, code) DO UPDATE
    SET label = EXCLUDED.label,
        active = TRUE
    RETURNING id, code
), stat_map AS (
    SELECT code AS stat_code, id AS stat_id FROM stat_upserts
)
INSERT INTO tasks (stat_id, code, title, description, difficulty, base_xp, sort_order)
SELECT stat_map.stat_id, task_def.code, task_def.title, task_def.description, task_def.difficulty, task_def.base_xp, task_def.sort_order
FROM stat_map
JOIN (
    VALUES
        ('SLEEP', 'SLEEP7H', 'Dormir 7h', 'Descansar al menos siete horas.', 'EASY', 20, 1),
        ('HYDRATION', 'WATER2L', 'Beber 2L', 'Tomar dos litros de agua en el día.', 'EASY', 15, 2),
        ('STRETCH', 'STRETCH10', 'Estiramientos 10’', 'Secuencia corta de estiramientos.', 'EASY', 15, 3),
        ('DEEPWORK', 'FOCUS25', 'Deep Work 25’', 'Bloque de enfoque profundo de 25 minutos.', 'MEDIUM', 25, 1),
        ('READING', 'READ10', 'Leer 10’', 'Lectura intencional de diez minutos.', 'EASY', 15, 2),
        ('JOURNAL', 'JOURNAL5', 'Journaling 5’', 'Escribir durante cinco minutos.', 'EASY', 10, 1),
        ('GRATITUDE', 'THANK3', '3 Agradecimientos', 'Anotar tres agradecimientos del día.', 'EASY', 10, 2)
) AS task_def(stat_code, code, title, description, difficulty, base_xp, sort_order)
    ON stat_map.stat_code = task_def.stat_code
ON CONFLICT (stat_id, code) DO UPDATE
SET title = EXCLUDED.title,
    description = EXCLUDED.description,
    difficulty = EXCLUDED.difficulty,
    base_xp = EXCLUDED.base_xp,
    sort_order = EXCLUDED.sort_order,
    active = TRUE;

INSERT INTO levels (level, xp_required)
VALUES
    (1, 0),
    (2, 100),
    (3, 250),
    (4, 450),
    (5, 700),
    (6, 1000),
    (7, 1400),
    (8, 1850),
    (9, 2350),
    (10, 2900)
ON CONFLICT (level) DO UPDATE
SET xp_required = EXCLUDED.xp_required;
