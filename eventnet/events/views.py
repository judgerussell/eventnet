from django.shortcuts import render
from .serializers import EventSerializer
from .models import Event
from profiles.models import Profile

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

# Create your views here.

@api_view(['GET'])
def hosted_event_list(request):
    if request.method == 'GET':
        data = Event.objects.filter(hosts__id__exact=Profile.objects.get(user=request.user).id)

        serializer = EventSerializer(
            data, 
            context={'request': request},
            many = True
        )

        return Response(serializer.data)

@api_view(['GET', 'POST'])
def event_list(request):
    if request.method == 'GET':
        data = Event.objects.all()

        serializer = EventSerializer(
            data, 
            context={'request': request},
            many = True
        )

        return Response(serializer.data)
    
    elif request.method == 'POST':
        
        serializer = EventSerializer(data=request.data)
      
        if serializer.is_valid():

            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def event_detail(request, pk):
    try:
        event = Event.objects.get(pk=pk)
    except Event.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = EventSerializer(
            event,
            context={'request':request}
        )
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = EventSerializer(
            event, 
            data=request.data,
            context={'request': request}
        )

        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

