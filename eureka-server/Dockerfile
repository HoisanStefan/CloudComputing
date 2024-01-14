FROM openjdk:17-ea-jdk-alpine3.12
WORKDIR /app
COPY /target/eureka-server-1.0-SNAPSHOT.jar ./eureka.jar
EXPOSE 8761
CMD ["java", "-jar", "eureka.jar"]