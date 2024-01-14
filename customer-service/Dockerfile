FROM openjdk:17-ea-jdk-alpine3.12
WORKDIR /app
COPY /target/customer-service-1.0-SNAPSHOT.jar ./customer-service.jar
EXPOSE 8080
CMD ["java", "-jar", "customer-service.jar"]