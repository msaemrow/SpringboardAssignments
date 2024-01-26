-- write your queries here

--Join the two tables so that every column and record appears, regardless of if there is not an owner_id 
--SELECT * FROM owners FULL JOIN vehicles ON owners.id = vehicles.owner_id;
--Count the number of cars for each owner. Display the owners first_name , last_name and count of vehicles
--SELECT first_name, last_name, count(owner_id) FROM owners JOIN vehicles ON owners.id = vehicles.owner_id GROUP BY first_name, last_name ORDER BY first_name ASC;
-- SELECT first_name, last_name, ROUND(AVG(price)) AS average_price, COUNT(owner_id) FROM owners JOIN vehicles ON owners.id = vehicles.owner_id GROUP BY first_name, last_name HAVING COUNT(owner_id) > 1 AND ROUND(AVG(price)) > 10000 joins_exercise-# ORDER BY first_name DESC;