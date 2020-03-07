from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# Create your models here.

class User(AbstractUser):
	class Meta:
		db_table = 'auth_user'

	def __str__(self):
		return self.username
