package com.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BackendApplicationTests {

	@Test
	void additionShouldWork() {
		int sum = 2 + 3;
		assertEquals(5, sum);
	}

}
