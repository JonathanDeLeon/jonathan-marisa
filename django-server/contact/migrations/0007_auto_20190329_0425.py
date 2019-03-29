# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2019-03-29 04:25
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contact', '0006_auto_20190117_0650'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='meal',
            field=models.CharField(default='', max_length=32, verbose_name='Meal'),
        ),
        migrations.AddField(
            model_name='event',
            name='notes',
            field=models.CharField(default='', max_length=512, verbose_name='Wishes and notes'),
        ),
    ]
