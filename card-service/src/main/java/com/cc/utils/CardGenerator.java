package com.cc.utils;

import java.security.SecureRandom;

public class CardGenerator {
    private static final String CHARSET = "0123456789"; // Character set to use for generating the code
    private static final int CODE_LENGTH = 16; // Length of the code to generate
    private static final int CVV_LENGTH = 3;
    private static final char FIRST_DIGIT = '4'; // First digit of the code

    public static String generateRandomCardNumber() {
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(CODE_LENGTH);
        sb.append(FIRST_DIGIT);
        for (int i = 1; i < CODE_LENGTH; i++) {
            int randomIndex = random.nextInt(CHARSET.length());
            char randomChar = CHARSET.charAt(randomIndex);
            sb.append(randomChar);
        }
        return sb.toString();
    }

    public static String generateRandomCVV() {
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(CVV_LENGTH);
        for (int i = 0; i < CVV_LENGTH; i++) {
            int randomIndex = random.nextInt(CHARSET.length());
            char randomChar = CHARSET.charAt(randomIndex);
            sb.append(randomChar);
        }
        return sb.toString();
    }
}
