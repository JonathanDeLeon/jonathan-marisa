from rest_framework import serializers
from contact.models import *


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ('id', 'name', 'phone',)


class EventSerializer(serializers.ModelSerializer):
    attendees = PersonSerializer(many=True)

    class Meta:
        model = Event
        fields = ('id', 'type', 'attendees', 'attending', 'number_attending',)

    def create(self, validated_data):
        attendees_data = validated_data.pop('attendees')
        event = Event.objects.create(**validated_data)
        for attendee_data in attendees_data:
            person = Person.objects.create(**attendee_data)
            event.attendees.add(person)
        return event
