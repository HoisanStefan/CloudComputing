FROM openjdk:17-ea-jdk-alpine3.12
WORKDIR /app
COPY /target/config-server-1.0-SNAPSHOT.jar ./config-server.jar
EXPOSE 8888
CMD ["java", "-jar", "config-server.jar"]