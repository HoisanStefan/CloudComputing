FROM openjdk:11-oracle
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} card_service.jar
ENTRYPOINT ["java","-jar","/card_service.jar"]