select u.id, u.username, u.pic, p.title, p.content, p.img, p.id as pid from helo_users as u 
join helo_posts as p on u.id = p.user_id ;