FROM gradle:7.6.1-jdk17 AS build
WORKDIR /app
COPY . .
RUN chmod +x ./gradlew
RUN ./gradlew clean build -x test


FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
COPY .env .env
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]