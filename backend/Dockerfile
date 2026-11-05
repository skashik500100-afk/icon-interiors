# ==============================================================================
# ICON INTERIORS - SPRING BOOT PRODUCTION DOCKERFILE
# Multi-stage build optimized for Render Web Services
# Base Java Version: OpenJDK 21 (Eclipse Temurin)
# ==============================================================================

# ------------------------------------------------------------------------------
# STAGE 1: Build Application with Maven and JDK 21
# ------------------------------------------------------------------------------
FROM maven:3.9.9-eclipse-temurin-21 AS builder

WORKDIR /build

# 1. Copy POM first for optimal Docker layer caching
COPY pom.xml .

# 2. Download dependencies (cached across builds if pom.xml does not change)
RUN mvn dependency:go-offline -B || true

# 3. Copy application source code and resources
COPY src ./src

# 4. Build executable fat JAR (skipping test execution for production packaging)
RUN mvn clean package -DskipTests -B && \
    find target/ -maxdepth 1 -name "*.jar" ! -name "*.original" -exec cp {} /build/app.jar \;

# ------------------------------------------------------------------------------
# STAGE 2: Lightweight Runtime Environment with JRE 21
# ------------------------------------------------------------------------------
FROM eclipse-temurin:21-jre-jammy AS runner

WORKDIR /app

# 1. Security: Create dedicated unprivileged user and group
RUN groupadd -r spring && useradd -r -g spring -d /app -s /sbin/nologin spring

# 2. Setup directory for design image uploads and set permissions
RUN mkdir -p /app/uploads/designs && \
    chown -R spring:spring /app

# 3. Copy executable JAR from builder stage
COPY --from=builder --chown=spring:spring /build/app.jar /app/app.jar

# 4. Switch to non-root user
USER spring:spring

# 5. Default environment configuration
# - Render automatically injects $PORT (e.g. 10000)
# - Container memory constraints dynamically capped at 75% RAM
ENV PORT=8080 \
    SPRING_PROFILES_ACTIVE=production \
    JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0 -XX:InitialRAMPercentage=50.0 -Djava.security.egd=file:/dev/./urandom"

# 6. Expose default port
EXPOSE 8080

# 7. Start Spring Boot:
# - Binds to Render's dynamic $PORT (falling back to 8080 locally)
# - Explicitly listens on 0.0.0.0 (all network interfaces)
# - Uses exec for proper POSIX SIGTERM signal forwarding during zero-downtime deploys
ENTRYPOINT ["sh", "-c", "exec java $JAVA_OPTS -Dserver.port=${PORT:-8080} -Dserver.address=0.0.0.0 -jar /app/app.jar"]

