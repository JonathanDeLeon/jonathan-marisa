# -*- coding: utf-8 -*-
# Generated by Django 1.11.13 on 2018-06-21 23:48
from __future__ import unicode_literals

from django.db import migrations
import cloudinary.uploader
import cloudinary.api

def cloudify_migration(apps, schema_editor):
    MediaImage = apps.get_model('media', 'MediaImage')
    for media in MediaImage.objects.all():
        arr = cloudinary.uploader.upload(
            media.image,
            public_id=str(media.uuid)
        )
        media.thumbnail = arr['secure_url']
        media.save()

class Migration(migrations.Migration):

    dependencies = [
        ('media', '0009_auto_20180621_2324'),
    ]

    operations = [
        migrations.RunPython(cloudify_migration)
    ]
