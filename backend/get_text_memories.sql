SELECT memory_id, user_id, caption, memory_date, image_data, image_type
FROM memories
WHERE caption IS NOT NULL AND caption <> ''
ORDER BY memory_date {{SORT}};