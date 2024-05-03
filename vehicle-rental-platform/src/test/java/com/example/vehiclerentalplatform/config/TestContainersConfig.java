package com.example.vehiclerentalplatform.config;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.testcontainers.context.ImportTestcontainers;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.MongoDBContainer;
import org.testcontainers.containers.wait.strategy.Wait;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;
import org.testcontainers.utility.MountableFile;

import java.time.Duration;

@Testcontainers
@TestConfiguration
@ImportTestcontainers
@ConditionalOnProperty(name = "testcontainers.enabled", havingValue = "true", matchIfMissing = true)
public class TestContainersConfig {
//    private static final DockerImageName MONGO_IMAGE_NAME = DockerImageName.parse("mongodb:6.0.1").asCompatibleSubstituteFor("mongo");

    @Container
    private static final MongoDBContainer
            mongoDBContainer =
            new MongoDBContainer("mongo:6.0.1")
                    .withExposedPorts(27017)
                    .withReuse(true)
                    .withEnv("MONGODB_PORT", "27017")
                    .waitingFor(Wait.forListeningPort())
                    .withStartupTimeout(Duration.ofMinutes(2))
                    .waitingFor(Wait.forLogMessage(".*Waiting for connections.*\\n", 1))
                    .withCopyToContainer(MountableFile.forClasspathResource("/mongodb/"),
                            "/docker-entrypoint-initdb.d/");


    @DynamicPropertySource
    private static void dynamicPropertyOverride(DynamicPropertyRegistry dynamicPropertyRegistry) {
        dynamicPropertyRegistry.add("mongodb:uri", mongoDBContainer::getReplicaSetUrl);
    }
}
