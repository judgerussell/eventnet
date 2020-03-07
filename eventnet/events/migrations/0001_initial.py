# Generated by Django 2.2.11 on 2020-03-06 10:59

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('profiles', '0002_auto_20200306_1045'),
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', models.SlugField(verbose_name='slug')),
                ('title', models.CharField(max_length=256, verbose_name='title')),
                ('description', models.TextField(verbose_name='description')),
                ('price', models.PositiveIntegerField(verbose_name='cost of entry')),
                ('date', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date and time')),
                ('age_restriction', models.CharField(choices=[('All ages', 'All ages'), ('16+', '16+'), ('18+', '18+'), ('21+', '21+')], default='All ages', max_length=8, verbose_name='age restriction')),
                ('artists', models.ManyToManyField(to='profiles.Artist', verbose_name='artists')),
                ('hosts', models.ManyToManyField(to='profiles.Profile', verbose_name='hosts')),
                ('venue', models.ForeignKey(on_delete='CASCADE', related_name='venue', to='profiles.Venue')),
            ],
        ),
    ]
