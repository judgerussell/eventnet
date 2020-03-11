from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):

    venue = serializers.CharField(required=False)
    
    class Meta:
        model = Event
        fields = [
            'id',
            'title',
            'date',
            'venue',
            'hosts',
            'artists',
            'price',
            'age_restriction',
            'description',
            'going',
        ]