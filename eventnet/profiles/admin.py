from django.contrib import admin
from .models import Profile, FriendRequest, Venue, Artist

# Register your models here.

admin.site.register(Profile)
admin.site.register(FriendRequest)
admin.site.register(Venue)
admin.site.register(Artist)