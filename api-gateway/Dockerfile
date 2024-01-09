FROM openjdk
WORKDIR /app
COPY /target/api-gateway-1.0-SNAPSHOT.jar ./api-gateway.jar
EXPOSE 9090
CMD ["java", "-jar", "api-gateway.jar"]