package com.careerPath.CareerPath.Repositories;

import com.careerPath.CareerPath.Entities.Day;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class DayRepositoryTest {
    @Autowired
    private TestEntityManager entityManager;
    @Autowired
    private DayRepository dayRepository;

    @Test
    public void testFindById() {
        Day day = new Day();
        day.setDayNumber(51);
        day.setDayText("Ziua 51");
        day.setOrderDay(51);
        entityManager.persist(day);
        entityManager.flush();

        Day foundDay = dayRepository.findById(day.getDayId()).orElse(null);

        assertThat(foundDay).isNotNull();
    }
}
