# -*- coding: utf-8 -*-
# Generated by Django 1.11.13 on 2018-06-21 23:24
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('media', '0008_auto_20180519_2336'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mediaimage',
            name='thumbnail',
            field=models.URLField(blank=True, verbose_name='Thumbnail of uploaded image'),
        ),
    ]
