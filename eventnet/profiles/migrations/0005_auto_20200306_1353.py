# Generated by Django 2.2.11 on 2020-03-06 13:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0004_artist_slug'),
    ]

    operations = [
        migrations.AddField(
            model_name='artist',
            name='slug',
            field=models.SlugField(null=True, verbose_name='slug'),
        ),
    ]
