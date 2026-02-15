SELECT caption, memory_date, image_data
FROM memories
WHERE memory_date = CURRENT_DATE - INTERVAL '1 year';


-- select all memories from user (without checking date)
SELECT memory_id, caption, memory_date, image_data 
FROM memories 
WHERE user_id = 1  
ORDER BY memory_date DESC; -- sort by most recent unlocked memory first

-- 