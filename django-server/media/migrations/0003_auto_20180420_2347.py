# -*- coding: utf-8 -*-
# Generated by Django 1.11.8 on 2018-04-20 23:47
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('media', '0002_auto_20180420_2344'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mediaimage',
            name='date_created',
            field=models.DateField(default=django.utils.timezone.now, verbose_name='Date image was created'),
        ),
    ]
