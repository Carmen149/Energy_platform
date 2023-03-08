FROM maven:3.8.1-openjdk-17 AS builder

COPY ./src/ /root/src
COPY ./pom.xml /root/
ARG HTTPS_FILE=src/main/resources/*.p12
COPY ${HTTPS_FILE} local-ssl.p12
ARG HTTPS_CERT=src/main/resources/*.crt
COPY ${HTTPS_CERT} local-ssl.crt
WORKDIR /root

RUN mvn package -Dmaven.test.skip=true
RUN java -Djarmode=layertools -jar /root/target/security-0.0.1-SNAPSHOT.jar list
RUN java -Djarmode=layertools -jar /root/target/security-0.0.1-SNAPSHOT.jar extract
RUN ls -l /root

FROM openjdk:17.0.2-jdk

COPY --from=builder /root/dependencies/ ./
COPY --from=builder /root/snapshot-dependencies/ ./

RUN sleep 10
COPY --from=builder /root/spring-boot-loader/ ./
COPY --from=builder /root/application/ ./
EXPOSE 8080
ENTRYPOINT ["java", "org.springframework.boot.loader.JarLauncher","-XX:+UseContainerSupport -XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap -XX:MaxRAMFraction=1 -Xms512m -Xmx512m -XX:+UseG1GC -XX:+UseSerialGC -Xss512k -XX:MaxRAM=72m"]