-- from the terminal run:
-- psql < medical_center.sql

DROP DATABASE IF EXISTS medical_center;

CREATE DATABASE medical_center;

\c medical_center

CREATE TABLE medical_center_info
(
    id SERIAL PRIMARY KEY,
    med_center_name TEXT NOT NULL,
    street TEXT NOT NULL,
    city TEXT NOT NULL,
    zip_code INTEGER NOT NULL
);

CREATE TABLE doctor
(
    id SERIAL PRIMARY KEY,
    doctor_name TEXT NOT NULL,
    speciality TEXT NOT NULL,
    med_center_id INTEGER REFERENCES medical_center_info
);

CREATE TABLE patient
(
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    date_of_birth TEXT NOT NULL
);

CREATE TABLE diagnosis
(
    id SERIAL PRIMARY KEY,
    diagnosis_name TEXT NOT NULL
);

CREATE TABLE visit_summary
(
    id SERIAL PRIMARY KEY,
    date_of_visit TEXT NOT NULL,
    patient_id INTEGER REFERENCES patient,
    doctor_id INTEGER REFERENCES doctor,
    location_of_visit INTEGER REFERENCES medical_center_info,
    diagnosis_id INTEGER REFERENCES diagnosis
);

INSERT INTO medical_center_info
  (med_center_name, street, city, zip_code)
VALUES
  ('Mercy West', '123 Main Street', 'West Des Moines', 55555), 
  ('Methodist West', '456 Main Street', 'West Des Moines', 55555);

  INSERT INTO doctor
  (doctor_name, speciality, med_center_id)
  VALUES
  ('Dr Smith', 'Pediatrics', 1),
  ('Dr Jones', 'Podiatry', 2),
  ('Dr Johnson', 'Primary Care', 2),
  ('Dr Bones', 'Orthopedics', 1);

  INSERT INTO patient
  (first_name, last_name, date_of_birth)
  VALUES
  ('Jon', 'Doe', '9-1-1950'),
  ('Jane', 'Doe', '2-2-2020'),
  ('John', 'Smith', '8-23-1984'),
  ('Bob', 'Smith', '7-7-2000'),
  ('Roberta', 'Smith', '5-5-1996');

  INSERT INTO diagnosis
  (diagnosis_name)
  VALUES
  ('Influenze'), ('Common Cold'), ('Fracture'), ('Plantar Fascitis'), ('Appendicitis');

  INSERT INTO visit_summary
  (date_of_visit, patient_id, doctor_id, location_of_visit, diagnosis_id)
  VALUES
  ('1-28-2023', 1, 2, 1, 1),
  ('1-28-2023', 2, 1, 1, 2),
  ('1-28-2023', 3, 2, 1, 4),
  ('1-28-2023', 4, 3, 2, 5),
  ('1-28-2023', 5, 4, 2, 3);