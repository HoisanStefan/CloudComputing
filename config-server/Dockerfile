FROM openjdk
WORKDIR /app
COPY /target/config-server-1.0-SNAPSHOT.jar ./config-server.jar
EXPOSE 8888
CMD ["java", "-jar", "config-server.jar"]