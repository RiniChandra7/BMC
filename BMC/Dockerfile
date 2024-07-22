# Use an official OpenJDK 21 runtime as a parent image
FROM openjdk:21-jdk-slim

# Create a volume mount point
VOLUME /tmp

# Argument to pass JVM options during build time
ARG JAVA_OPTS

# Set the environment variable for JVM options at runtime
ENV JAVA_OPTS="$JAVA_OPTS"

# Copy the executable JAR file to the container
COPY target/bmc-1.0.0.jar /app/app.jar

# Make port 8081 available to the world outside this container
EXPOSE 8081

# Run the JAR file with any provided JVM options
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /app/app.jar"]
