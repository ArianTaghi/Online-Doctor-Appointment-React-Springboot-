package com.example.test3;

import com.example.test3.model.City;
import com.example.test3.model.Doctor;
import com.example.test3.model.Hospital;
import com.example.test3.repository.CityRepository;
import com.example.test3.repository.DoctorRepository;
import com.example.test3.repository.HospitalRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.time.LocalDate;
import java.util.*;

@Configuration
public class DoctorSeedConfig {
/*
    private static final String[] MALE_NAMES = {
            "Ahmad", "Keyhan", "Reza", "Hamed", "Arash",
            "Sohrab", "Babak", "Farhad", "Navid", "Kian",
            "Amir", "Ali", "Mehdi", "Pouya", "Saeed",
            "Iman", "Ramin", "Kaveh", "Farzad", "Shahin"
    };

    private static final String[] FEMALE_NAMES = {
            "Mahsa", "Mina", "Sara", "Niloofar", "Parisa",
            "Zahra", "Leila", "Shirin", "Roya", "Samaneh",
            "Yasaman", "Elham", "Neda", "Golnaz", "Azadeh",
            "Bahar", "Marjan", "Nasrin", "Fatemeh", "Termeh"
    };

    private static final String[] LAST_NAMES = {
            "Ahmadi", "Hosseini", "Karimi", "Rezaei", "Mohammadi",
            "Jafari", "Sadeghi", "Moradi", "Naderi", "Ghorbani",
            "Zare", "Kazemi", "Rostami", "Bagheri", "Yousefi",
            "Ebrahimi", "Amiri", "Salehi", "Alavi", "Fallahi"
    };

    private static final String[] SPECIALTIES = {
            "Eye",
            "Child",
            "Lung",
            "Hair",
            "Psychiatrist",
            "Ear",
            "Liver",
            "Heart",
            "Brain",
            "Psychologist",
            "Orthopedic"
    };

    @Bean
    public CommandLineRunner seedDoctors(
            DoctorRepository doctorRepository,
            CityRepository cityRepository,
            HospitalRepository hospitalRepository,
            PasswordEncoder passwordEncoder
    ) {

        return args -> {

            Random random = new Random();

            // ==========================================
            // 1. CREATE CITIES
            // ==========================================

            City tabriz = cityRepository.findByName("Tabriz")
                    .orElseGet(() ->
                            cityRepository.save(new City(0, "Tabriz"))
                    );

            City tehran = cityRepository.findByName("Tehran")
                    .orElseGet(() ->
                            cityRepository.save(new City(0, "Tehran"))
                    );

            City rasht = cityRepository.findByName("Rasht")
                    .orElseGet(() ->
                            cityRepository.save(new City(0, "Rasht"))
                    );


            // ==========================================
            // 2. CREATE HOSPITALS
            // ==========================================

            createHospital(
                    "ImamReza",
                    "Tabriz",
                    hospitalRepository
            );

            createHospital(
                    "Behbood",
                    "Tabriz",
                    hospitalRepository
            );

            createHospital(
                    "Shohada",
                    "Tabriz",
                    hospitalRepository
            );


            createHospital(
                    "Valiasr",
                    "Tehran",
                    hospitalRepository
            );

            createHospital(
                    "Taleghani",
                    "Tehran",
                    hospitalRepository
            );

            createHospital(
                    "Beheshti",
                    "Tehran",
                    hospitalRepository
            );


            createHospital(
                    "Sardar Gilan",
                    "Rasht",
                    hospitalRepository
            );

            createHospital(
                    "Moalem",
                    "Rasht",
                    hospitalRepository
            );

            createHospital(
                    "Shafa",
                    "Rasht",
                    hospitalRepository
            );


            // ==========================================
            // 3. PREPARE NAMES
            // ==========================================

            List<String[]> combinations = new ArrayList<>();

            for (String first : MALE_NAMES) {
                for (String last : LAST_NAMES) {
                    combinations.add(
                            new String[]{first, last, "male"}
                    );
                }
            }

            for (String first : FEMALE_NAMES) {
                for (String last : LAST_NAMES) {
                    combinations.add(
                            new String[]{first, last, "female"}
                    );
                }
            }

            Collections.shuffle(combinations, random);


            // ==========================================
            // 4. CREATE 100 DOCTORS
            // ==========================================

            int created = 0;

            for (String[] combo : combinations) {

                if (created >= 100) {
                    break;
                }

                String firstName = combo[0];
                String lastName = combo[1];

                String fullName = firstName + " " + lastName;

                String username =
                        firstName.toLowerCase()
                                + lastName.toLowerCase()
                                + (created + 1);


                // جلوگیری از username تکراری
                if (!doctorRepository.findByUsername(username).isEmpty()) {
                    continue;
                }

                boolean gender =
                        combo[2].equals("male");


                // ==========================================
                // WORKING HOURS
                // ==========================================

                int start = 8 + random.nextInt(4);

                int end = 16 + random.nextInt(4);


                // ==========================================
                // RANDOM INFORMATION
                // ==========================================

                long code =
                        100000 + random.nextInt(900000);

                int docCode =
                        100000 + random.nextInt(900000);

                long phone =
                        100000 + random.nextInt(900000);


                LocalDate birthday = LocalDate.of(
                        1970 + random.nextInt(26),
                        1 + random.nextInt(12),
                        1 + random.nextInt(28)
                );


                String specialty =
                        SPECIALTIES[
                                random.nextInt(
                                        SPECIALTIES.length
                                )
                                ];


                // ==========================================
                // RANDOM CITY
                // ==========================================

                City selectedCity;

                int cityRandom = random.nextInt(3);

                if (cityRandom == 0) {
                    selectedCity = tabriz;
                }
                else if (cityRandom == 1) {
                    selectedCity = tehran;
                }
                else {
                    selectedCity = rasht;
                }


                // ==========================================
                // GET HOSPITALS OF SELECTED CITY
                // ==========================================

                List<Hospital> cityHospitals =
                        hospitalRepository.findByCity(
                                selectedCity.getName()
                        );

                Hospital selectedHospital =
                        cityHospitals.get(
                                random.nextInt(
                                        cityHospitals.size()
                                )
                        );


                // ==========================================
                // CREATE DOCTOR
                // ==========================================

                Doctor doctor = new Doctor(
                        username,
                        passwordEncoder.encode("1"),
                        gender,
                        fullName,
                        code,
                        birthday,
                        specialty,
                        start,
                        end,
                        phone,
                        docCode,
                        selectedHospital.getName(),
                        selectedCity.getName()
                );


                doctorRepository.save(doctor);

                created++;

                System.out.println(
                        "Doctor " + created +
                                " created: " +
                                fullName +
                                " | " +
                                selectedCity.getName() +
                                " | " +
                                selectedHospital.getName()
                );
            }


            System.out.println(
                    "================================="
            );

            System.out.println(
                    created + " doctors created."
            );

            System.out.println(
                    "================================="
            );
        };
    }


    // ==========================================
    // CREATE HOSPITAL
    // ==========================================

    private void createHospital(
            String name,
            String city,
            HospitalRepository hospitalRepository
    ) {

        if (hospitalRepository.findByName(name).isEmpty()) {

            hospitalRepository.save(
                    new Hospital(
                            0,
                            name,
                            city
                    )
            );
        }
    }*/
}