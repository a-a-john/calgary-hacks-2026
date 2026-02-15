SELECT memory_id, user_id, caption, memory_date, image_data, image_type
FROM memories
WHERE image_data IS NOT NULL
ORDER BY memory_date {{SORT}};