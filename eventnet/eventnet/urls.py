"""eventnet URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from profiles.models import Profile, FriendRequest, Artist, Venue
from django.conf.urls import url
from profiles import views
from events import views as event_views

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^api/artists/$', views.artist_list),
    re_path(r'^api/artists/([0-9]+)', views.artist_detail, name='artist_detail'),
    re_path(r'^api/artists/permitted$', views.permitted_artist_list, name='permitted_artists'),
    re_path(r'^api/venues/$', views.venue_list),
    re_path(r'^api/venues/([0-9]+)$', views.venue_detail),
    re_path(r'^api/venues/permitted$', views.permitted_venue_list, name='permitted_venues'),
    re_path(r'^api/users/$', views.users_list),
    re_path(r'^api/users/([0-9]+)$', views.profile_view),
    re_path(r'^api/users/([0-9]+)/friends$', views.friends_list),
    re_path(r'^api/events/$', event_views.event_list),
    re_path(r'^api/events/([0-9]+)$', event_views.event_detail),
    re_path(r'^api/events/hosted$', event_views.hosted_event_list),
]
