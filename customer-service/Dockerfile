FROM openjdk:11-oracle
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} customer_service.jar
ENTRYPOINT ["java","-jar","/customer_service.jar"]