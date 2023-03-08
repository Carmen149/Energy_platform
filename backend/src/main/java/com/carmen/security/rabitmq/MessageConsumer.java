package com.carmen.security.rabitmq;

import com.carmen.security.constants.NotificationEndpoints;
import com.carmen.security.handlers.exception.ResourceNotFoundException;
import com.carmen.security.model.Device;
import com.carmen.security.model.Measurements;
import com.carmen.security.model.Message;
import com.carmen.security.model.NotificationPayload;
import com.carmen.security.repository.DeviceRepository;
import com.carmen.security.repository.MeasurementsRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.annotation.RabbitListenerConfigurer;
import org.springframework.amqp.rabbit.listener.RabbitListenerEndpointRegistrar;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Getter
@Setter
@Service
public class MessageConsumer implements RabbitListenerConfigurer {
    private final MeasurementsRepository measurementsRepository;
    private final SimpMessagingTemplate template;

    private final DeviceRepository deviceRepository;

    public MessageConsumer(MeasurementsRepository measurementsRepository, DeviceRepository deviceRepository, SimpMessagingTemplate template) {
        this.measurementsRepository = measurementsRepository;
        this.deviceRepository = deviceRepository;
        this.template = template;
    }

    @Override
    public void configureRabbitListeners(RabbitListenerEndpointRegistrar rabbitListenerEndpointRegistrar) {
    }

    @RabbitListener(queues = MessageBroker.QUEUE)
    public void receivedMessage(Message message) {
        Device device = deviceRepository.findById(message.getDeviceId()).orElseThrow(() -> new ResourceNotFoundException("Device", "Id", message.getDeviceId(), HttpStatus.NOT_FOUND));
        Float sum=device.getEnergyPerHour();
        if (sum > device.getMaxEnergy()) {
            NotificationPayload notif=new NotificationPayload(device.getId(), device.getUser().getId(),"Hourly energy consumption exceeds the smart metering device limit " + sum);
            this.template.convertAndSend(NotificationEndpoints.NOTIFICATION, notif);
            device.setEnergyPerHour(0f);
            deviceRepository.save(device);
        } else {
            sum= sum + message.getMeasurementValue();
            sum = sum % 360;
            device.setEnergyPerHour(sum);
            deviceRepository.save(device);
            System.out.println(sum);
            //1h=3600s 1s=1000
        }
        Measurements measurements = new Measurements(message.getTimeStamp(), message.getMeasurementValue(), device);
        measurementsRepository.save(measurements);
    }
}