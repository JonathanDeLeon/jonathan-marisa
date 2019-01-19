# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


# Create your models here.
class Person(models.Model):
    name = models.CharField(verbose_name="Name of person", max_length=30)
    phone = models.CharField(verbose_name="Phone number", max_length=10, blank=True, null=True)

    def __str__(self):
        return self.name


class Event(models.Model):
    type = models.CharField(verbose_name="Event type", max_length=32)
    attending = models.BooleanField(verbose_name="If group is attending", default=True)
    attendees = models.ManyToManyField(Person, verbose_name="list of attendees")
    number_attending = models.PositiveSmallIntegerField(verbose_name="number of attendants", default=0)

    def __str__(self):
        return self.type + " " + str(self.attending) + " " + str(self.number_attending)
