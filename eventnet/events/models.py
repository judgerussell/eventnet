from django.db import models
from django.conf import settings
from profiles.models import Profile, Artist, Venue
from django.utils import timezone
from django.template.defaultfilters import slugify

# Create your models here.

class Event(models.Model):

    AGE_CHOICES = [("All ages", "All ages"), ("16+", "16+"), ("18+", "18+"), ("21+", "21+")]

    slug = models.SlugField('slug', blank=True, null=True)
    title = models.CharField(max_length=256, verbose_name='title')
    description = models.TextField('description')
    price = models.PositiveIntegerField('cost of entry')
    date = models.DateTimeField(default=timezone.now, verbose_name='date and time')
    age_restriction = models.CharField(
        max_length = 8,
        choices = AGE_CHOICES,
        default = "All ages",
        verbose_name = 'age restriction'
    )

    hosts = models.ManyToManyField(Profile, related_name='hosts', verbose_name='hosts')
    going = models.ManyToManyField(Profile, related_name='going', verbose_name='going')
    artists = models.ManyToManyField(Artist, verbose_name='artists')
    venue = models.ForeignKey(Venue, related_name='venue', on_delete='CASCADE')

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = slugify(self.title)

        super(Event, self).save(*args, **kwargs)

    def __unicode__(self):
        return self.title