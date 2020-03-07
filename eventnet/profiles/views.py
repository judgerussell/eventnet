from django.shortcuts import render, get_object_or_404
from django.conf import settings
from django.contrib.auth import get_user_model
from django.http import HttpResponseRedirect

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .serializers import *

from .models import Profile, FriendRequest, Artist, Venue
# Create your views here.

@api_view(['GET', 'POST'])
def artist_list(request):
    if request.method == 'GET':
        data = Artist.objects.all()

        serializer = ArtistSerializer(
            data, 
            context={'request': request},
            many = True
        )

        return Response(serializer.data)
    
    elif request.method == 'POST':
        
        serializer = ArtistSerializer(data=request.data)
      
        if serializer.is_valid():

            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def artist_detail(request, pk):
    try:
        artist = Artist.objects.get(pk=pk)
    except Artist.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ArtistSerializer(
            artist,
            context={'request':request}
        )
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = ArtistSerializer(
            artist, 
            data=request.data,
            context={'request': request}
        )

        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        artist.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# venues

@api_view(['GET', 'POST'])
def venue_list(request):
    if request.method == 'GET':
        data = Venue.objects.all()

        serializer = VenueSerializer(
            data, 
            context={'request': request},
            many = True
        )

        return Response(serializer.data)
    
    elif request.method == 'POST':
        
        serializer = VenueSerializer(data=request.data)
      
        if serializer.is_valid():

            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def venue_detail(request, pk):
    try:
        venue = Venue.objects.get(pk=pk)
    except Venue.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = VenueSerializer(
            venue,
            context={'request':request}
        )
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = VenueSerializer(
            venue, 
            data=request.data,
            context={'request': request}
        )

        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        venue.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# friend request stuff from youtube altered for REST

User = get_user_model()

@api_view(['GET'])
def users_list(request):
    
    if request.method == "GET":
        data = Profile.objects.exclude(user=request.user)

        serializer = ProfileSerializer(
            data,
            context = {'request' : request},
            many = True
        )

    return Response(serializer.data)

def send_friend_request(request, id):
    if request.user.is_authenticated():
        user = get_object_or_404(User, id=id)
        frequest, created = FriendRequest.objects.get_or_create(
            from_user=request.user,
            to_user=user
        )
        return HttpResponseRedirect('/users')

def cancel_friend_request(request, id):
    if request.user.is_authenticated():
        user = get_object_or_404(User, id=id)
    frequest = FriendRequest.objects.filter(
        from_user=request.user,
        to_user=user
    )
    frequest.delete()
    return HttpResponseRedirect('/users')

def accept_friend_request(request, id):
    from_user = get_object_or_404(User, id=id)
    frequest = FriendRequest.objects.filter(
        from_user=from_user,
        to_user=request.user
    ).first()
    user1 = frequest.to_user
    user2 = from_user
    user1.profile.friends.add(user2.profile)
    user2.profile.friend.add(user1.profile)
    frequest.delete()
    return HttpResponseRedirect('/users/{}'.format(request.user.profile.slug))

def delete_friend_request(request, id):
    from_user = get_object_or_404(User, id=id)
    frequest = FriendRequest.objects.filter(from_user=from_user, to_user=request.user).first()
    frequest.delete()
    return HttpResponseRedirect('users/{}'.format(request.user.profile.slug))

@api_view(['GET'])
def profile_view(request, pk):
    p = Profile.objects.get(pk=pk)
    u = p.user
    sent_friend_requests = FriendRequest.objects.filter(from_user=p.user)
    rec_friend_requests = FriendRequest.objects.filter(to_user=p.user)

    friends = p.friends.all()

    button_status = 'none'
    if p not in request.user.profile.friends.all():
        button_status = 'not_friend'

        if len(FriendRequest.objects.filter(
            from_user=request.user).filter(to_user=p.user)) == 1:
                button_status = 'friend_request_sent'
        
    context = {
        'button_status' : button_status,
        'friends_list': friends,
        'sent_friend_requests': sent_friend_requests,
        'rec_friend_requests': rec_friend_requests,
    }

    if request.method == 'GET':
        serializer = ProfileSerializer(p, context=context)
        
        data = serializer.data
        data.update(context)
        
        return Response(data)
