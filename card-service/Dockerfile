FROM openjdk:17-ea-jdk-alpine3.12
WORKDIR /app
COPY /target/card-service-0.0.3-SNAPSHOT.jar ./card-service.jar
EXPOSE 8082
CMD ["java", "-jar", "card-service.jar"]