-- user 1 no image test
INSERT INTO users (user_id, username, password)
VALUES (1, 'John', 'pass');

INSERT INTO memories (user_id, caption, image_data, image_type, memory_date, unlock_date)
VALUES (1, 'test', NULL, NULL, CURRENT_DATE - INTERVAL '1 year', CURRENT_DATE);

-- user 2 with image (png) test
INSERT INTO users (user_id, username, password)
VALUES (2, 'Mary', 'pass');

INSERT INTO memories (user_id, caption, image_data, image_type, memory_date, unlock_date)
VALUES (2, 'white_square', pg_read_binary_file('C:\Users\Public\imgs\test1.png'), 'image/png', CURRENT_DATE, CURRENT_DATE + INTERVAL '1 year');
