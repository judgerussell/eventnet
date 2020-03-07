from rest_framework import serializers
from .models import Profile, FriendRequest, Venue, Artist

class ArtistSerializer(serializers.ModelSerializer):

    class Meta:
        model = Artist
        fields = ['id', 'name', 'description']

class VenueSerializer(serializers.ModelSerializer):

    class Meta:
        model = Venue
        fields = [
            'id',
            'name',
            'address',
            'type_of_venue',
            'sober',
            'hidden_address',
            'contact_email',
            'description',
        ]

class FriendRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = FriendRequest
        fields = [
            'id',
            'to_user',
            'from_user'
        ]

class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = [
            'id',
            'user',
            'description',
            'friends',
            'followed_venues',
            'followed_artists',
            'permitted_venues',
        ]