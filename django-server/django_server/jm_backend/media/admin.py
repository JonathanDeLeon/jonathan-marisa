# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from media.models import MediaImage, Album

# Register your models here.
admin.site.register(MediaImage)
admin.site.register(Album)
