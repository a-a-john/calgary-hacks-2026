CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
	username VARCHAR(50) UNIQUE NOT NULL,
	password TEXT NOT NULL
);

CREATE TABLE memories (
	memory_id SERIAL PRIMARY KEY,
	user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
	caption TEXT, -- text blurb
	image_data BYTEA, -- raw binary image
	image_type TEXT, -- apparently necessary to tell react if its jpg, png ,etc.
	memory_date DATE NOT NULL DEFAULT CURRENT_DATE,
	unlock_date DATE,
	CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
);