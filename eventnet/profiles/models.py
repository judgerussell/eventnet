from django.db import models
from django.conf import settings
from django.template.defaultfilters import slugify
from django.urls import reverse
# Create your models here.

class Venue(models.Model):

    name = models.CharField(max_length=128, verbose_name='name')
    address = models.CharField(max_length=256, verbose_name='address')
    type_of_venue = models.CharField(max_length=64, verbose_name='venue type')
    sober = models.BooleanField('sober')
    hidden_address = models.BooleanField('hidden address')
    contact_email = models.EmailField('contact email')
    description = models.TextField('text')
    slug = models.SlugField(blank=True, null=True)

    def __str__(self):
        return self.id.__str__()

    def __unicode__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = slugify(self.name)

        super(Venue, self).save(*args, **kwargs)

class Artist(models.Model):
    name = models.CharField(max_length=128, verbose_name='name')
    description = models.TextField('text')
    slug = models.SlugField('slug', blank=True, null=True)

    def __str__(self):
        return self.id.__str__()
    
    def __unicode__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = slugify(self.name)

        super(Artist, self).save(*args, **kwargs)

    def get_absolute_url(self):
        return '/api/users/{}'.format(self.slug)

class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete='CASCADE')
    description = models.TextField('description')
    slug = models.SlugField('slug', blank=True, null=True)
    
    friends = models.ManyToManyField("Profile", blank=True)
    followed_venues = models.ManyToManyField(Venue, related_name='followed_venues', blank=True)
    followed_artists = models.ManyToManyField(Artist, related_name='followed_artists', blank=True)

    permitted_venues = models.ManyToManyField(Venue, related_name='permitted_venues', blank=True)
    permitted_artists = models.ManyToManyField(Artist, related_name='permitted_artists', blank=True)

    def __str__(self):
        return str(self.user.username)

    
    def __unicode__(self):
        return self.user.username

    def get_absolute_url(self):
        return "/api/users/{}".format(self.id)
    
    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = slugify(self.user.username)

        super(Profile, self).save(*args, **kwargs)

class FriendRequest(models.Model):
    to_user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="to_user", on_delete="CASCADE")
    from_user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="from_user", on_delete="CASCADE")
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "From {}, to {}".format(self.from_user.username, self.to_user.username)


from django.db.models.signals import post_save

def post_save_user_model_receiver(sender, instance, created, *args, **kwargs):
    if created:
        try:
            Profile.objects.create(user=instance)
        except Exception as e:   
            pass

post_save.connect(post_save_user_model_receiver, sender=settings.AUTH_USER_MODEL)